/* eslint-disable react/no-unknown-property */
import { ListBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import { ContextMenuComponent } from "@syncfusion/ej2-react-navigations";
import { useStore } from "../contexts/Store";
import folder from "../data/icons/folder.png";
import PopupDialog from "./PopupDialog";

const Listbox = () => {
  const selectedItem = useStore((state) => state.selectedItem);
  const data = useStore((state) => state.sidebarIcons)?.find((item) => item.id === selectedItem.idIcon)?.listboxItems || [];
  const selectedItemClicked = useStore((state) => state.selectedItem.icon !== "");
  let listboxRef = {};

  const listBoxTemplate = ({ path, name, type, clip, tooltip, id}) => {
    return (
      <div
        onContextMenu={(e) => {
          e.preventDefault(), leftClickItem(name, type, clip, tooltip, id);
        }}
        onClick={() => {
          rightClickItem(name, type, clip, tooltip, id);
        }}
        className="flex gap-2 items-center px-2"
      >
        <img
          onContextMenu={(e) => {
            e.preventDefault(), leftClickItem(name, type, clip, tooltip, id);
          }}
          onClick={() => {
            rightClickItem(name, type, clip, tooltip, id);
          }}
          id={id}
          className="user-drag h-[20px]"
          src={type === "folder" ? folder : path}
          alt={name}
        />
        <span
          onContextMenu={(e) => {
            e.preventDefault(), leftClickItem(name, type, clip, tooltip, id);
          }}
          onClick={() => {
            rightClickItem(name, type, clip, tooltip, id);
            navigator.clipboard.writeText(clip);
          }}
          className=""
        >
          {name}
        </span>
      </div>
    );
  };

  const menuItems = [
    {
      text: "Add folder",
      iconCss: "e-icons e-folder-fill",
    },
    {
      text: "Add clipBoard",
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
   useStore.getState().setSidebarList(listboxRef.getDataList(), selectedItem.idIcon);
  }
  function leftClickItem(name, type, clip, tooltip, id) {
    if (type === "folder") {
      useStore.setState({ selectedItem: { ...useStore.getState().selectedItem, idList: id, isSub: true, name, folder: name, type } });
    //  console.log(useStore.getState().selectedItem);
    }
    if (type === "clip") {
      useStore.setState({ selectedItem: { ...useStore.getState().selectedItem,isSub:false, idList: id, name, clip, clipName: name, tooltip, type } });
    
    }
  }
  // ********* contextMenu ************
  function rightClickItem(name, type, clip, tooltip, id) {
    if (type === "folder") {
      useStore.setState({ selectedItem: { ...useStore.getState().selectedItem, idList: id,isSub: true, name, folder: name, type } });
    }
    if (type === "clip") {
      useStore.setState({ selectedItem: { ...useStore.getState().selectedItem, idList: id, isSub: false, name, clipName: name, clip, tooltip, type } });
    }
  }
  function contextMenuClick(args) {
    switch (args.item.text) {
      case "Add folder":
        useStore.setState({ dropdownOpen: true, type: "Add Folder" });
        break;
      case "Add clipBoard":
        useStore.setState({ dropdownOpen: true, type: "Add ClipBoard" });
        break;
      case "Edit":
        if (useStore.getState().selectedItem.type === "folder") {
          useStore.setState({ type: "Edit Folder", dropdownOpen: true });
        }
        if (useStore.getState().selectedItem.type === "clip") {
          useStore.setState({ type: "Edit ClipBoard", dropdownOpen: true });
        }
        break;
      case "Remove":
        if (useStore.getState().selectedItem.type === "folder") {
          useStore.setState({ type: "Remove Folder", dropdownOpen: true });
        }
        if (useStore.getState().selectedItem.type === "clip") {
          useStore.setState({ type: "Remove ClipBoard", dropdownOpen: true });
        }
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
              drop={droppingItem}
            />
          </div>
          <div id="contextmenu-listbox">
            <ContextMenuComponent target="#listbox-control" items={menuItems} select={contextMenuClick} animationSettings={{ duration: 500, effect: "FadeIn" }} />
          </div>
          <PopupDialog />
        </div>
      )}
    </>
  );
};

export default Listbox;
