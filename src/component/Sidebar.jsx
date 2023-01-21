/* eslint-disable react/no-unknown-property */
import { ListBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import { ContextMenuComponent } from "@syncfusion/ej2-react-navigations";
import { useStore } from "../contexts/Store";
import PopupDialog from "./PopupDialog";

const Sidebar = () => {
  const data = useStore((state) => state.sidebarIcons);
  let listboxRef = {};
  const listBoxTemplate = ({ path, name, id }) => {
    return (
      <div className="flex flex-col items-center px-2 ">
        <img
          onContextMenu={(e) => {
            e.preventDefault(), leftClickItem(name, id, path);
          }}
          onClick={() => {
            rightClickItem(name, id, path);
          }}
          className=".user-nodrag hover:scale-110  h-[45px] my-1 transition-all duration-300"
          src={path}
          alt={name}
        />
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
  function leftClickItem(name, id, path) {
    useStore.setState({ selectedItem: { ...useStore.getState().selectedItem, idIcon: id, isSub: false, icon: name, path, type: "icon" } });
  }
  // ********* contextMenu ************
  function rightClickItem(name, id, path) {
    useStore.setState({ selectedItem: { ...useStore.getState().selectedItem, idIcon: id, isSub: false, icon: name, path, type: "icon" } });
  }
  function contextMenuClick(args) {
    switch (args.item.text) {
      case "Add Icon":
        useStore.setState({ type: "Add Icon", dropdownOpen: true });
        break;
      case "Edit":
        useStore.setState({ type: "Edit Icon", dropdownOpen: true });
        break;
      case "Remove":
        useStore.setState({ type: "Remove Icon", dropdownOpen: true });
        break;
    }
  }
  //  *********************************
  return (
    <div className=" h-[calc(100vh_-_30px)] bg-[#202225] w-[60px] overflow-x-hidden shrink-0">
      <div className="" id="listbox-sidebar">
        <ListBoxComponent
          ref={(g) => (listboxRef = g)}
          id="listboxsidebar"
          dataSource={data || []}
          fields={{ value: "name", text: "name" }}
          allowDragAndDrop
          itemTemplate={listBoxTemplate}
          drop={droppingItem}
        />
      </div>
      <div id="contextmenu-sidebar">
        <ContextMenuComponent
          target="#listbox-sidebar"
          items={menuItems}
          select={contextMenuClick}
          animationSettings={{ duration: 500, effect: "FadeIn" }}
        />
      </div>
      <PopupDialog />
    </div>
  );
};

export default Sidebar;
