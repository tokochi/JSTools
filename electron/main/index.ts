import { app, BrowserWindow, shell, ipcMain, webFrame } from "electron";
import { release } from 'node:os'
import { join } from 'node:path'
import Store from "electron-store";


process.env.DIST_ELECTRON = join(__dirname, '../')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST_ELECTRON, '../public')
  : process.env.DIST
const urlToolbar = `${process.env.VITE_DEV_SERVER_URL}/toolbar.html`;
Store.initRenderer();
// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow | null = null
let ToolbarWindow: BrowserWindow | null = null;
// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.js')
const url = process.env.VITE_DEV_SERVER_URL
const indexHtml = join(process.env.DIST, 'index.html')
const indexToolbar = join(process.env.DIST, "toolbar.html");

async function createWindow() {
  win = new BrowserWindow({
    title: "JSTools",
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: "#202225",
      symbolColor: "#74b1be",
      height: 30,
    },
    icon: join(process.env.PUBLIC, "favicon.ico"),
    webPreferences: {
      preload,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) { // electron-vite-vue#298
    win.loadURL(url)
  } else {
    win.loadFile(indexHtml)
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})


function createToolbarWindow() {
  ToolbarWindow = new BrowserWindow({
    width: 30,
    height: 500,
    title: "JS Toolbar",
    alwaysOnTop: true,
    titleBarStyle: "hidden",
    icon: join(process.env.PUBLIC, "favicon.ico"),
    backgroundColor: "#3c3c3c",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
  });

  if (app.isPackaged) {
ToolbarWindow.loadFile(indexToolbar);
  } else {
    ToolbarWindow.loadURL(urlToolbar);
   // ToolbarWindow.webContents.openDevTools();
  }
}

ipcMain.on("toolbar", (event, data) => {
  createToolbarWindow();
});
