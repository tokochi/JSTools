/* eslint-disable react/no-unknown-property */
import { useState } from "react";
import { ListBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import { ContextMenuComponent } from "@syncfusion/ej2-react-navigations";
import { useStore } from "../contexts/Store";
import PopupDialog from "./PopupDialog";

const Sidebar = () => {
  const data = useStore((state) => state.sidebarIcons);
  let listboxRef = {};
  //const setSelectedItem = useStore((state) => state.setSelectedItem);
  // console.log(useStore.getState().selectedItem);
  const [type, setType] = useState("");
  const listBoxTemplate = ({ path, name }) => {
    return (
      <div icon-value={name} icon-path={path} className="flex flex-col items-center px-2">
        <img icon-value={name} icon-path={path} className="user-drag   h-[45px] my-1" src={path} alt={name} />
      </div>
    );
  };

  const menuItems = [
    {
      text: "Add Icon",
      iconCss: "e-icons e-plus-small",
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
  // ********* ListBox ************
  function droppingItem() {
    useStore.getState().setSidebarIcons(listboxRef.getDataList());
  }

  function leftClickItem(args) {
    console.log(useStore.getState().selectedItem);
    useStore.setState({
      selectedItem: {
        ...useStore.getState().selectedItem,
        icon: args.event.target.getAttribute("icon-value"),
        path: args.event.target.getAttribute("icon-path"),
        type: "icon",
      },
    });
  }
  // ********* contextMenu ************
  function contextMenuClick(args) {
    switch (args.item.text) {
      case "Add Icon":
        setType("Add Icon");
        useStore.setState({ dropdownOpen: true });
        break;
      case "Edit":
        setType("Edit Icon");
        useStore.setState({ dropdownOpen: true });
        break;
      case "Remove":
        setType("Remove Icon");
        useStore.setState({ dropdownOpen: true });
        break;
    }
  }
  function rightClickItem(args) {
    useStore.setState({ dropdownOpen: false });
    useStore.setState({
      selectedItem: {
        ...useStore.getState().selectedItem,
        icon: args.event.target.getAttribute("icon-value"),
        path: args.event.target.getAttribute("icon-path"),
        type: "icon",
      },
    });
  }
  //  *********************************

  return (
    <div
      className=" h-screen bg-[#202225] w-[70px] overflow-x-hidden px-1"
    >
      <div className="" id="listbox-sidebar">
        <ListBoxComponent
          ref={(g) => (listboxRef = g)}
          id="listboxsidebar"
          dataSource={data || []}
          fields={{ value: "name", text: "name" }}
          allowDragAndDrop
          itemTemplate={listBoxTemplate}
          change={leftClickItem}
          drop={droppingItem}
        />
      </div>
      <div id="contextmenu-sidebar">
        <ContextMenuComponent target="#listbox-sidebar" items={menuItems} beforeOpen={rightClickItem} select={contextMenuClick} animationSettings={{ duration: 500, effect: "FadeIn" }} />
      </div>
      <PopupDialog editType={type} />
    </div>
  );
};

export default Sidebar;
