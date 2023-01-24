/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useStore } from "../contexts/Store";
import Store from "electron-store";
import { v4 as uuidv4 } from "uuid";

export default function PopupDialog() {
  const store = new Store();
  const dropdownOpen = useStore((state) => state.dropdownOpen);
  const editType = useStore((state) => state.type);
  const { idIcon, idList, idSubList, idTool, icon, folder, path, clip, clipName, tooltip } = useStore((state) => state.selectedItem);
  const listboxItems = useStore((state) => state.sidebarIcons)?.find((item) => item.id === idIcon)?.listboxItems;
  const listSubBoxItems = useStore((state) => state.sidebarIcons);
  const [newIcon, setNewIcon] = useState("");
  const [newFolder, setNewFolder] = useState("");
  const [newClipName, setNewClipName] = useState("");
  const [newClip, setNewClip] = useState("");
  const [newTooltip, setNewTooltip] = useState("");
  const [newPath, setNewPath] = useState(null);
  useEffect(() => {
    setNewIcon(icon);
    setNewPath(path);
    setNewFolder(folder);
    setNewClipName(clipName);
    setNewClip(clip);
    setNewTooltip(tooltip);
  }, [idIcon, idList, idSubList, idTool]);
  // *********** CRUD functions ************
  function addIcon() {
    useStore.setState({ dropdownOpen: false });
    store?.set("sidebarIcons", [...store?.get("sidebarIcons"), { id: uuidv4(), name: newIcon, path: newPath, listboxItems: [] }]);
    useStore.getState().updateSidebarIcons();
  }
  function editIcon() {
    useStore.setState({ dropdownOpen: false });
    const newArray = store
      ?.get("sidebarIcons")
      .map((item) => (item.id === idIcon && newPath !== null ? { ...item, name: newIcon, path: newPath } : item));
    store?.set("sidebarIcons", newArray);
    useStore.getState().updateSidebarIcons();
  }
  function removeIcon() {
    useStore.setState({ dropdownOpen: false });
    store?.set(
      "sidebarIcons",
      store?.get("sidebarIcons").filter((item) => item.id !== idIcon)
    );
    useStore.getState().updateSidebarIcons();
  }
  function addFolder() {
    useStore.setState({ dropdownOpen: false });
    const listboxItem = store?.get("sidebarIcons").find((icons) => icons.id === idIcon).listboxItems;
    listboxItem.push({ id: uuidv4(), type: "folder", name: newFolder, subList: [] });
    store?.set(
      "sidebarIcons",
      store?.get("sidebarIcons").map((icons) => (icons.id === idIcon ? { ...icons, listboxItems: listboxItem } : icons))
    );
    useStore.getState().updateSidebarIcons();
  }
  function editFolder() {
    useStore.setState({ dropdownOpen: false });
    const listboxItem = listboxItems.map((item) => (item.id === idList && item.type === "folder" ? { ...item, name: newFolder } : item));
    const newArray = store?.get("sidebarIcons").map((item) => (item.id === idIcon ? { ...item, listboxItems: [...listboxItem] } : item));
    store?.set("sidebarIcons", newArray);
    useStore.getState().updateSidebarIcons();
  }
  function addClip() {
    useStore.setState({ dropdownOpen: false });
    if (editType === "Add ClipBoard") {
      const listboxItem = store?.get("sidebarIcons").find((icons) => icons.id === idIcon).listboxItems;
      listboxItem.push({ id: uuidv4(), type: "clip", name: newClipName, clip: newClip, tooltip: newTooltip, path: newPath });
      store?.set(
        "sidebarIcons",
        store?.get("sidebarIcons").map((icons) => (icons.id === idIcon ? { ...icons, listboxItems: listboxItem } : icons))
      );
      useStore.getState().updateSidebarIcons();
    }
    if (editType === "Add Sub ClipBoard") {
      const listSubBoxItem = store
        ?.get("sidebarIcons")
        ?.find((item) => item.id === idIcon)
        ?.listboxItems?.find((folder) => folder.id === idList)?.subList;
      listSubBoxItem.push({ id: uuidv4(), type: "clip", name: newClipName, clip: newClip, tooltip: newTooltip, path: newPath });
      store?.set(
        "sidebarIcons",
        store?.get("sidebarIcons").map((icons) =>
          icons.id === idIcon
            ? {
                ...icons,
                listboxItems: icons.listboxItems.map((folder) => (folder.id === idList ? { ...folder, subList: listSubBoxItem } : folder)),
              }
            : icons
        )
      );
      useStore.getState().updateSidebarIcons();
    }
    if (editType === "Add Tool") {
      store?.set("toolbarItems", [...store?.get("toolbarItems"), { id: uuidv4(), type: "clip", name: newClipName, clip: newClip, path: newPath }]);
      useStore.getState().updateToolbarItems();
    }
  }
  function editClip() {
    useStore.setState({ dropdownOpen: false });
    if (editType === "Edit Sub ClipBoard") {
      const listSubboxItem = listSubBoxItems.map((clip) =>
        clip.id === idSubList ? { ...clip, name: newClipName, clip: newClip, tooltip: newTooltip } : clip
      );
      const newArray = store
        ?.get("sidebarIcons")
        .map((icons) =>
          icons.id === idIcon
            ? { ...icons, listboxItems: icons.listboxItems.map((folder) => (folder.id === idList ? { ...folder, subList: listSubboxItem } : folder)) }
            : icons
        );
      store?.set("sidebarIcons", newArray);
    }
    if (editType === "Edit ClipBoard") {
      const listboxItem = listboxItems.map((item) =>
        item.id === idList && item.type === "clip" ? { ...item, name: newClipName, clip: newClip, tooltip: newTooltip } : item
      );
      const newArray = store?.get("sidebarIcons").map((item) => (item.id === idIcon ? { ...item, listboxItems: [...listboxItem] } : item));
      store?.set("sidebarIcons", newArray);
    }
    if (editType === "Edit Tool") {
      const newArray = store
        ?.get("toolbarItems")
        .map((tool) => (tool.id === idTool && newPath !== null ? { ...tool, name: newClipName, clip: newClip, path: newPath } : tool));
      store?.set("toolbarItems", newArray);
      useStore.getState().updateToolbarItems();

    }
    useStore.getState().updateSidebarIcons();
  }
  function removeFolder() {
    useStore.setState({ dropdownOpen: false });
    if (editType === "Remove Sub ClipBoard") {
      const listSubboxItem = listSubBoxItems.filter((clip) => clip.id !== idSubList);
      const newArray = store
        ?.get("sidebarIcons")
        .map((icons) =>
          icons.id === idIcon
            ? { ...icons, listboxItems: icons.listboxItems.map((folder) => (folder.id === idList ? { ...folder, subList: listSubboxItem } : folder)) }
            : icons
        );
      store?.set("sidebarIcons", newArray);
      useStore.getState().updateSidebarIcons();
    }
    if (editType === "Remove ClipBoard") {
      const listboxItem = listboxItems.filter((item) => item.id !== idList);
      const newArray = store?.get("sidebarIcons").map((item) => (item.id === idIcon ? { ...item, listboxItems: [...listboxItem] } : item));
      store?.set("sidebarIcons", newArray);
      useStore.getState().updateSidebarIcons();
    }
    if (editType === "Remove Tool") {
      store?.set(
        "toolbarItems",
        store?.get("toolbarItems").filter((tool) => tool.id !== idTool)
      );
      useStore.getState().updateToolbarItems();
    }
  }
  return (
    <div className={`${!dropdownOpen && "hidden"}`}>
      <div className=" h-screen w-screen  fixed top-0 left-0">
        <div id="element" className="fixed top-[100px] left-[100px] right-0 z-50  w-[300px] p-4 overflow-x-hidden overflow-y-auto">
          {/* ******************** Header ****************************** */}
          <div className="relative w-full h-full max-w-2xl md:h-auto">
            <div className="relative bg-[#111827] rounded-lg shadow">
              <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{editType}</h3>
                <button
                  onClick={() => useStore.setState({ dropdownOpen: false })}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="defaultModal"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* ******************** Body ****************************** */}
              {editType === "Add Icon" && (
                <div className="flex flex-col  p-4 gap-2">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Icon name</label>
                    <input
                      type="text"
                      id="first_name"
                      className="bg-gray-50 border  text-sm rounded-lg  block w-full p-1.5 dark:bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-slate-500 focus:border-slate-500"
                      placeholder="Javascript"
                      onChange={(e) => {
                        setNewIcon(e.target.value);
                      }}
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">
                      Upload Image
                    </label>
                    <input
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      id="file_input"
                      type="file"
                      accept="image/*"
                      required
                      onChange={(e) => {
                        setNewPath(e.target.files[0].path);
                      }}
                    />
                  </div>
                </div>
              )}
              {editType === "Edit Icon" && (
                <div className="flex flex-col  p-4 gap-2">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Icon name</label>
                    <input
                      type="text"
                      id="first_name"
                      className="bg-gray-50 border  text-sm rounded-lg  block w-full p-1.5 dark:bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-slate-500 focus:border-slate-500"
                      placeholder="Javascript"
                      value={newIcon}
                      onChange={(e) => {
                        setNewIcon(e.target.value);
                      }}
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">
                      Upload Image
                    </label>
                    <input
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      id="file_input"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        setNewPath(e.target.files[0].path);
                      }}
                    />
                  </div>
                </div>
              )}
              {editType === "Add Folder" && (
                <div className="flex flex-col  p-4 gap-2">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Folder name</label>
                    <input
                      type="text"
                      id="first_name"
                      className="bg-gray-50 border  text-sm rounded-lg  block w-full p-1.5 dark:bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-slate-500 focus:border-slate-500"
                      placeholder="Loop"
                      onChange={(e) => {
                        setNewFolder(e.target.value);
                      }}
                      required
                    />
                  </div>
                </div>
              )}
              {(editType === "Add ClipBoard" || editType === "Add Sub ClipBoard" || editType === "Add Tool") && (
                <div className="flex flex-col  p-4 gap-2">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ClipBoard Name</label>
                    <input
                      type="text"
                      id="first_name"
                      className="bg-gray-50 border  text-sm rounded-lg  block w-full p-1.5 dark:bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-slate-500 focus:border-slate-500"
                      placeholder="Javascript"
                      onChange={(e) => {
                        setNewClipName(e.target.value);
                      }}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-white">
                      ClipBoard
                    </label>
                    <textarea
                      id="message"
                      rows="2"
                      onChange={(e) => {
                        setNewClip(e.target.value);
                      }}
                      className="block p-1.5 w-full text-sm  rounded-lg border  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Write your clipboard here..."
                    ></textarea>
                  </div>
                  {(editType === "Add ClipBoard" || editType === "Add Sub ClipBoard") && (
                    <div>
                      <label htmlFor="message" className="block mb-2 text-sm font-medium text-white">
                        Tooltip
                      </label>
                      <textarea
                        id="message"
                        rows="3"
                        onChange={(e) => {
                          setNewTooltip(e.target.value);
                        }}
                        className="block p-1.5 w-full text-sm  rounded-lg border  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Write your Tooltip here..."
                      ></textarea>
                    </div>
                  )}
                  {editType === "Add Tool" && (
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">
                        Upload Image
                      </label>
                      <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="file_input"
                        type="file"
                        accept="image/*"
                        required
                        onChange={(e) => {
                          setNewPath(e.target.files[0].path);
                        }}
                      />
                    </div>
                  )}
                </div>
              )}
              {editType === "Edit Folder" && (
                <div className="flex flex-col  p-4 gap-2">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Folder name</label>
                    <input
                      type="text"
                      id="first_name"
                      className="bg-gray-50 border  text-sm rounded-lg  block w-full p-1.5 dark:bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-slate-500 focus:border-slate-500"
                      placeholder="Javascript"
                      value={newFolder}
                      onChange={(e) => {
                        setNewFolder(e.target.value);
                      }}
                      required
                    />
                  </div>
                </div>
              )}
              {(editType === "Edit ClipBoard" || editType === "Edit Sub ClipBoard" || editType === "Edit Tool") && (
                <div className="flex flex-col  p-4 gap-2">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ClipBoard Name</label>
                    <input
                      type="text"
                      id="first_name"
                      className="bg-gray-50 border  text-sm rounded-lg  block w-full p-1.5 dark:bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-slate-500 focus:border-slate-500"
                      placeholder="Javascript"
                      value={newClipName}
                      onChange={(e) => {
                        setNewClipName(e.target.value);
                      }}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-white">
                      ClipBoard
                    </label>
                    <textarea
                      id="message"
                      rows="2"
                      value={newClip}
                      onChange={(e) => {
                        setNewClip(e.target.value);
                      }}
                      className="block p-1.5 w-full text-sm  rounded-lg border  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Write your clipboard here..."
                    ></textarea>
                  </div>
                  {(editType === "Edit ClipBoard" || editType === "Edit Sub ClipBoard") && (
                    <div>
                      <label htmlFor="message" className="block mb-2 text-sm font-medium text-white">
                        Tooltip
                      </label>
                      <textarea
                        id="message"
                        rows="3"
                        value={newTooltip}
                        onChange={(e) => {
                          setNewTooltip(e.target.value);
                        }}
                        className="block p-1.5 w-full text-sm  rounded-lg border  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Write your Tooltip here..."
                      ></textarea>
                    </div>
                  )}
                  {editType === "Edit Tool" && (
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">
                        Upload Image
                      </label>
                      <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="file_input"
                        type="file"
                        accept="image/*"
                        required
                        onChange={(e) => {
                          setNewPath(e.target.files[0].path);
                        }}
                      />
                    </div>
                  )}
                </div>
              )}
              {/* ******************** Footer ****************************** */}
              {editType.startsWith("Remove") ? (
                <div className="p-6 text-center">
                  <svg
                    aria-hidden="true"
                    className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this item?</h3>
                  <button
                    onClick={() => {
                      switch (editType) {
                        case "Remove Icon":
                          removeIcon();
                          break;
                        case "Remove Folder":
                          removeFolder();
                          break;
                        case "Remove ClipBoard":
                          removeFolder();
                          break;
                        case "Remove Tool":
                          removeFolder();
                          break;
                      }
                    }}
                    type="button"
                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                  >
                    {"Yes, I'm sure"}
                  </button>
                </div>
              ) : (
                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    onClick={() => {
                      switch (editType) {
                        case "Add Icon":
                          addIcon();
                          break;
                        case "Edit Icon":
                          editIcon();
                          break;
                        case "Add Folder":
                          addFolder();
                          break;
                        case "Add ClipBoard":
                          addClip();
                          break;
                        case "Add Sub ClipBoard":
                          addClip();
                          break;
                        case "Add Tool":
                          addClip();
                          break;
                        case "Edit Folder":
                          editFolder();
                          break;
                        case "Edit ClipBoard":
                          editClip();
                          break;
                        case "Edit Sub ClipBoard":
                          editClip();
                          break;
                        case "Edit Tool":
                          editClip();
                          break;
                      }
                    }}
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
