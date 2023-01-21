/* eslint-disable no-unsafe-optional-chaining */
import { create } from "zustand";
// const { ipcRenderer } = require("electron");
import add from "../data/icons/addcircle.png";
import Store from "electron-store";
import { v4 as uuidv4 } from "uuid";

const store = new Store();
if (store?.get("sidebarIcons")==null){store?.set("sidebarIcons", [{ id: uuidv4(), name: "new", path: add, listboxItems: [] }]);} 
if (store?.get("toolbarItems") == null) {
  store?.set("toolbarItems", [{ id: uuidv4(),type: "clip", name: "new", path: add}]);
} 
//store?.delete("toolbarItems");
export const useStore = create((set) => ({
  sidebarIcons: store?.get("sidebarIcons"),
  toolbarItems: store?.get("toolbarItems"),
  updateSidebarIcons: () => set(() => ({ sidebarIcons: store?.get("sidebarIcons") })),
  updateToolbarItems: () => set(() => ({ toolbarItems: store?.get("toolbarItems") })),
  setSidebarIcons: (list) => store?.set("sidebarIcons", list),
  setToolbarItems: (list) => store?.set("toolbarItems", list),
  setSidebarList: (list, idIcon) => {
    store?.set(
      "sidebarIcons",
      store?.get("sidebarIcons").map((icon) => (icon.id === idIcon ? { ...icon, listboxItems: list } : icon))
    );
  },
  setSidebarSubList: (list, idIcon) => {
    store?.set(
      "sidebarIcons",
      store?.get("sidebarIcons").map((icon) => (icon.id === idIcon ? { ...icon, listboxItems: list } : icon))
    );
  },
  selectedItem: {
    idIcon: "",
    idList: "",
    idSubList: "",
    idTool:"",
    name: "",
    icon: "",
    type: "",
    folder: "",
    path: "",
    clipName: "",
    clip: "",
    tooltip: "",
  },
  dropdownOpen: false,
  type: "",
}));

// Romove all isteners
// ipcRenderer.eventNames().forEach((n) => {
//   ipcRenderer.removeAllListeners(n);
// });
// Add new isteners

// ipcRenderer.on("productList:get", (e, res) => {
//   useStore.setState({ products: JSON.parse(res) });
// });
// ipcRenderer.on("providerList:get", (e, res) => {
//   useStore.setState({ providers: JSON.parse(res) });
// });
// ipcRenderer.on("customerList:get", (e, res) => {
//   useStore.setState({ customers: JSON.parse(res) });
// });
// ipcRenderer.on("vendingList:get", (e, res) => {
//   useStore.setState({ vendings: JSON.parse(res) });
// });
// ipcRenderer.on("buyingList:get", (e, res) => {
//   useStore.setState({ buyings: JSON.parse(res) });
// });
// ipcRenderer.on("depenseList:get", (e, res) => {
//   useStore.setState({ depenses: JSON.parse(res) });
// });
// ipcRenderer.on("notificationList:get", (e, res) => {
//   useStore.setState({ notifications: JSON.parse(res) });
// });
export const setClicked = () => useStore.getState().setClicked();
export const isClicked = () => useStore.getState().isClicked;
