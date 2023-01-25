/* eslint-disable no-unsafe-optional-chaining */
import { create } from "zustand";
import add from "../data/icons/addcircle.png";
import Store from "electron-store";
import { v4 as uuidv4 } from "uuid";

// ***** intialization Store *******************
const store = new Store();
if (store?.get("sidebarIcons") == null) {
  const idIcon = uuidv4();
  const idList = uuidv4();
  store?.set("sidebarIcons", [{ id: idIcon, name: "", path: add, type: "icon" }]);
  store?.set("listboxItems", [{ id: idList, idIcon, name: "",tooltip:"",clip:"", path: add, type: "clip" }]);
  store?.set("subListboxItems", [{ id: uuidv4(), idList, name: "", tooltip: "", clip: "", path: add, type: "clip" }]);
} 
if (store?.get("toolbarItems") == null) {
  store?.set("toolbarItems", [{ id: uuidv4(),type: "clip", name: "new", path: add}]);
} 
export const useStore = create((set) => ({
  sidebarIcons: store?.get("sidebarIcons"),
  listboxItems: store?.get("listboxItems"),
  subListboxItems: store?.get("subListboxItems"),
  toolbarItems: store?.get("toolbarItems"),
  updateSidebarIcons: () => set(() => ({ sidebarIcons: store?.get("sidebarIcons") })),
  updateListboxItems: () => set(() => ({ listboxItems: store?.get("listboxItems") })),
  updateSubListboxItems: () => set(() => ({ subListboxItems: store?.get("subListboxItems") })),
  updateToolbarItems: () => set(() => ({ toolbarItems: store?.get("toolbarItems") })),
  setSidebarIcons: (list) => store?.set("sidebarIcons", list),
  setListboxItems: (list) => store?.set("listboxItems", list),
  setSubListboxItems: (list) => store?.set("subListboxItems", list),
  setToolbarItems: (list) => store?.set("toolbarItems", list),
  selectedItem: {
    idIcon: "",
    idList: "",
    idSubList: "",
    idTool: "",
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
