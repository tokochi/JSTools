/* eslint-disable react/no-unknown-property */
import { ListBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import { ContextMenuComponent } from "@syncfusion/ej2-react-navigations";
import { useStore } from "../contexts/Store";
import PopupDialog from "./PopupDialog";

const Sidebar = () => {
  const data = useStore((state) => state.sidebarIcons);
  const selectedItem = useStore((state) => state.selectedItem);
  let listboxRef = {};
  const listBoxTemplate = ({ path, name, id,type }) => {
    return (
      <div className="flex flex-col items-center ">
        <img
          onContextMenu={(e) => {
            e.preventDefault(), leftClickItem(name, id, path, type);
          }}
          onClick={() => {
            rightClickItem(name, id, path, type);
          }}
          className="user-nodrag hover:scale-110 h-[45px] my-1 transition-all duration-300"
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
  function leftClickItem(name, id, path, type) {
    useStore.setState({ selectedItem: { ...selectedItem, idList: "", folder: "", idIcon: id, icon: name, path, type } });
  }
  // ********* contextMenu ************
  function rightClickItem(name, id, path, type) {
    useStore.setState({ selectedItem: { ...selectedItem, idList: "", folder: "",  idIcon: id, icon: name, path, type } });
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
    <div id="imgExample" className=" h-[calc(100vh_-_30px)] pl-1 bg-[#202225] w-[65px] overflow-y-scroll overflow-x-hidden shrink-0">
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
