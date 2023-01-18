/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useStore } from "../contexts/Store";
import Store from "electron-store";

export default function PopupDialog({ editType }) {
  const store = new Store();
  const { name, icon, type, folder, path, clip, tooltip } = useStore((state) => state.selectedItem);
  const dropdownOpen = useStore((state) => state.dropdownOpen);
  const [newIcon, setNewIcon] = useState(icon);
  const [newFolder, setNewFolder] = useState(folder);
  const [newClipName, setNewClipName] = useState(clip);
  const [newClip, setNewClip] = useState("");
  const [newTooltip, setNewTooltip] = useState("");
  const [newPath, setNewPath] = useState(null);
  useEffect(() => {
    setNewIcon(icon);
    setNewPath(path);
  }, [icon]);

  function addIcon() {
    useStore.setState({ dropdownOpen: false });
    store?.set("sidebarIcons", [...store?.get("sidebarIcons"), { name: newIcon, path: newPath,listboxItems:[] }]);
    useStore.getState().updateSidebarIcons();
  }
  function editIcon() {
    useStore.setState({ dropdownOpen: false });
    const newArray = store?.get("sidebarIcons").map((item) => (item.name === icon && newPath !== null ? {...item, name: newIcon, path: newPath } : item))
    store?.set("sidebarIcons", newArray);
    useStore.getState().updateSidebarIcons();
  }
  function removeIcon() {
    useStore.setState({ dropdownOpen: false });
        store?.set(
          "sidebarIcons",
          store?.get("sidebarIcons").filter((item) => item.name !== icon)
        );
    useStore.getState().updateSidebarIcons();
  }
  function addFolder() {
    useStore.setState({ dropdownOpen: false });
    const listboxItems = store?.get("sidebarIcons").find((icon) => icon.name === icon).listboxItems;
    listboxItems.push({ type: "folder", folder: "newFolder" });
     store?.set(
       "sidebarIcons",
       store?.get("sidebarIcons").map((icon) => (icon.name === icon ? { ...icon, listboxItems } : icon))
     );
    useStore.getState().addFolder({ icon });
  }
  function addClip() {
    useStore.setState({ dropdownOpen: false });
    useStore.getState().addClip({ icon });
  }
  function editFolder() {
    useStore.setState({ dropdownOpen: false });
    useStore.getState().editFolder({ icon });
  }
  function editClip() {
    useStore.setState({ dropdownOpen: false });
    useStore.getState().editFolder({ icon });
  }
  function removeFolder() {
    useStore.setState({ dropdownOpen: false });
    useStore.getState().removeFolder({ icon });
  }
  function removeClip() {
    useStore.setState({ dropdownOpen: false });
    useStore.getState().removeClip({ icon });
  }
  //********** Sidebar Icons ************* */
  if (editType === "Add Icon" && dropdownOpen)
    return (
      <div className="fixed top-[100px] left-[100px] right-0 z-50  w-[300px] p-4 overflow-x-hidden overflow-y-auto">
        <div className="relative w-full h-full max-w-2xl md:h-auto">
          <div className="relative bg-[#111827] rounded-lg shadow">
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Add Icon</h3>
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
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                onClick={() => addIcon()}
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  if (editType === "Edit Icon" && dropdownOpen)
    return (
      <div className="fixed top-[100px] left-[100px] right-0 z-50  w-[300px] p-4 overflow-x-hidden overflow-y-auto">
        <div className="relative w-full h-full max-w-2xl md:h-auto">
          <div className="relative bg-[#111827] rounded-lg shadow">
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Edit Icon</h3>
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
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                onClick={() => editIcon()}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  if (editType === "Remove Icon" && dropdownOpen)
    return (
      <div className="fixed top-[100px] left-[100px] right-0 z-50 w-[300px] p-4 overflow-x-hidden overflow-y-auto">
        <div className="relative w-full h-full max-w-md md:h-auto">
          <div className="relative bg-[#111827] rounded-lg shadow">
            <button
              onClick={() => useStore.setState({ dropdownOpen: false })}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-hide="popup-modal"
            >
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-6 text-center">
              <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this item?</h3>
              <button
                onClick={() => removeIcon()}
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                {"Yes, I'm sure"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  //********** ListBox Items 1 ************* */
  if (editType === "Add Folder" && dropdownOpen)
    return (
      <div className="fixed top-[100px] left-[100px] right-0 z-50  w-[300px] p-4 overflow-x-hidden overflow-y-auto">
        <div className="relative w-full h-full max-w-2xl md:h-auto">
          <div className="relative bg-[#111827] rounded-lg shadow">
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Add Folder</h3>
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
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                onClick={() => addFolder()}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  if (editType === "Add ClipBoard" && dropdownOpen)
    return (
      <div className="fixed top-[100px] left-[100px] right-0 z-50  w-[300px] p-4 overflow-x-hidden overflow-y-auto">
        <div className="relative w-full h-full max-w-2xl md:h-auto">
          <div className="relative bg-[#111827] rounded-lg shadow">
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Add ClipBoard</h3>
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
            </div>
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                onClick={() => addClip()}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  if (editType === "Edit Folder" && dropdownOpen)
    return (
      <div className="fixed top-[100px] left-[100px] right-0 z-50  w-[300px] p-4 overflow-x-hidden overflow-y-auto">
        <div className="relative w-full h-full max-w-2xl md:h-auto">
          <div className="relative bg-[#111827] rounded-lg shadow">
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Edit Folder</h3>
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
                    setNewIcon(e.target.value);
                  }}
                  required
                />
              </div>
            </div>
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                onClick={() => editFolder()}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  if (editType === "Edit Clip" && dropdownOpen)
    return (
      <div className="fixed top-[100px] left-[100px] right-0 z-50  w-[300px] p-4 overflow-x-hidden overflow-y-auto">
        <div className="relative w-full h-full max-w-2xl md:h-auto">
          <div className="relative bg-[#111827] rounded-lg shadow">
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Edit ClipBoard</h3>
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
            </div>
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                onClick={() => editClip()}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  if (editType === "Remove Folder" && dropdownOpen)
    return (
      <div className="fixed top-[100px] left-[100px] right-0 z-50 w-[300px] p-4 overflow-x-hidden overflow-y-auto">
        <div className="relative w-full h-full max-w-md md:h-auto">
          <div className="relative bg-[#111827] rounded-lg shadow">
            <button
              onClick={() => useStore.setState({ dropdownOpen: false })}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-hide="popup-modal"
            >
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-6 text-center">
              <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this folder?</h3>
              <button
                onClick={() => removeFolder()}
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                {"Yes, I'm sure"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  if (editType === "Remove Clip" && dropdownOpen)
    return (
      <div className="fixed top-[100px] left-[100px] right-0 z-50 w-[300px] p-4 overflow-x-hidden overflow-y-auto">
        <div className="relative w-full h-full max-w-md md:h-auto">
          <div className="relative bg-[#111827] rounded-lg shadow">
            <button
              onClick={() => useStore.setState({ dropdownOpen: false })}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-hide="popup-modal"
            >
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-6 text-center">
              <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this ClipBoard?</h3>
              <button
                onClick={() => removeClip()}
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                {"Yes, I'm sure"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}
