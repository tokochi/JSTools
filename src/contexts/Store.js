/* eslint-disable no-unsafe-optional-chaining */
import { create } from "zustand";
const { ipcRenderer } = require("electron");
import add from "../data/icons/addcircle.png";
import Store from "electron-store";

const store = new Store();
if (store?.get("sidebarIcons")==null){store?.set("sidebarIcons",[{ name: "new", path: add, listboxItems: [{ type: "clip", tooltip: "tooltip", clip: "clip", name: "new", path: add }] }])} 
//store?.delete("sidebarIcons");
export const useStore = create((set, get) => ({
  sidebarIcons: store?.get("sidebarIcons") || [{ name: "new", path: add, listboxItems: [{ type: "clip", tooltip: "tooltip", clip: "clip", name: "new", path: add }] }],
  updateSidebarIcons: () => set(() => ({ sidebarIcons: store?.get("sidebarIcons") })),
  setSidebarIcons: (list) => store?.set("sidebarIcons", list),

  
  selectedItem: { name: "", icon: "", type: "", folder: "", path: "", clip: "", tooltip: "" },
  setSelectedclip: ({ name, type, clip, tooltip }) => set((state) => ({ selectedItem: { ...state.selectedItem, name, type, clip, tooltip } })),

  dropdownOpen: false,
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
