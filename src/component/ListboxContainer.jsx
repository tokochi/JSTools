/* eslint-disable react/no-unknown-property */
import { ListBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import { ContextMenuComponent } from "@syncfusion/ej2-react-navigations";
import { useState } from "react";
import { useStore } from "../contexts/Store";
import folder from "../data/icons/folder.png";
import PopupDialog from "./PopupDialog";

const ListboxContainer = () => {
  const data = useStore((state) => state.sidebarIcons).find((item) => item.name === useStore.getState().selectedItem.icon)?.listboxItems;
  const selectedItemClicked = useStore((state) => state.selectedItem.icon !== "");
  let listboxRef = {};
  const [type, setType] = useState("");
  const [editType, setEditType] = useState("");
  const listBoxTemplate = ({ path, name, type, clip,tooltip }) => {
    if (type === "clip")
      return (
        <div listitem-name={name} listitem-clip={clip} listitem-tooltip={tooltip} listitem-type={type} className="flex gap-2 items-center px-2">
      
          <img listitem-name={name} listitem-clip={clip} listitem-tooltip={tooltip} listitem-type={type} className="user-drag h-[20px]" src={path} alt={name} />
          <span
            listitem-name={name}
            listitem-clip={clip}
            listitem-tooltip={tooltip}
            listitem-type={type}
            onClick={() => {
              navigator.clipboard.writeText(clip);
            }}
            className=""
          >
            {name}
          </span>
        </div>
      );
    if (type === "folder")
      return (
        <div listitem-name={name} className="flex gap-2 items-center px-2">
          <img listitem-name={name} listitem-type={type} className="user-drag h-[20px]" src={folder} alt={name} />
          <span className="">{name}</span>
        </div>
      );
  };

  const menuItems = [
    {
      text: "Add Folder",
      iconCss: "e-icons e-folder-fill",
    },
    {
      text: "Add ClipBoard",
      iconCss: "e-icons e-code-view",
    },
    {
      text: "Edit",
      iconCss: "e-icons e-edit",
    },
    {
      text: "Remove",
      iconCss: "e-icons e-trash",
    },
  ];

  function droppingItem() {
    // useStore.getState().setSidebarIcons(listboxRef.getDataList());
  }
  function leftClickItem(args) {
    
    if (args.event.target.getAttribute("listitem-type") === "folder") {
    useStore.getState().setSelectedItem({
      name: args.event.target.getAttribute("listitem-name"),
      type: "folder",
    });
      setEditType("Folder");
    }
    if (args.event.target.getAttribute("listitem-type") === "clip") {
         useStore.getState().setSelectedItem({
           name: args.event.target.getAttribute("listitem-name"),
           clip: args.event.target.getAttribute("listitem-clip"),
           tooltip: args.event.target.getAttribute("listitem-tooltip"),
           type: "clip",
         });
      setEditType("Clip");
    }
  }
  // ********* contextMenu ************
  function rightClickItem(args) {
    useStore.setState({ dropdownOpen: false });
    if (args.event.target.getAttribute("listitem-type") === "folder") {
      useStore.getState().setSelectedItem({
        name: args.event.target.getAttribute("listitem-name"),
        type: "folder",
      });
      setEditType("Folder");
    }
    if (args.event.target.getAttribute("listitem-type") === "clip") {
      useStore.getState().setSelectedItem({
        name: args.event.target.getAttribute("listitem-name"),
        clip: args.event.target.getAttribute("listitem-clip"),
        tooltip: args.event.target.getAttribute("listitem-tooltip"),
        type: "clip",
      });
      setEditType("Clip");
    }
  }
  function contextMenuClick(args) {
    switch (args.item.text) {
      case "Add Folder":
        setType("Add Folder");
        useStore.setState({ dropdownOpen: true });
        break;
      case "Add ClipBoard":
        setType("Add ClipBoard");
        useStore.setState({ dropdownOpen: true });
        break;
      case "Edit":
        setType(`Edit ${editType}`);
        useStore.setState({ dropdownOpen: true });
        break;
      case "Remove":
        setType(`Remove ${editType}`);
        useStore.setState({ dropdownOpen: true });
        break;
    }
  }
  //  *********************************
  return (
    <>
      {selectedItemClicked && (
        <div>
          <div className="bg-[#2f3136] h-max  overflow-x-hidden" id="listbox-control">
            <ListBoxComponent
              ref={(g) => (listboxRef = g)}
              id="listbox"
              dataSource={data}
              fields={{ value: "name", text: "name" }}
              allowDragAndDrop
              itemTemplate={listBoxTemplate}
              change={leftClickItem}
              drop={droppingItem}
            />
          </div>
          <div id="contextmenu-listbox">
            <ContextMenuComponent target="#listbox-control" items={menuItems} beforeOpen={rightClickItem} select={contextMenuClick} animationSettings={{ duration: 500, effect: "FadeIn" }} />
          </div>
          <PopupDialog editType={type} />
        </div>
      )}
    </>
  );
};

export default ListboxContainer;
