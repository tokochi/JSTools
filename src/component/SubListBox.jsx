/* eslint-disable react/no-unknown-property */
import { ListBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import { ContextMenuComponent } from "@syncfusion/ej2-react-navigations";
import { useStore } from "../contexts/Store";
import folder from "../data/icons/folder.png";
import PopupDialog from "./PopupDialog";

const SubListBox = () => {
  const selectedItem = useStore((state) => state.selectedItem);
  const data =
    useStore((state) => state.sidebarIcons)
      ?.find((item) => item.id === selectedItem.idIcon)
      ?.listboxItems?.find((folder) => folder.id === selectedItem.idList)?.subList || [];
  const selectedItemClicked = selectedItem.isSub===true;
  let listboxRef = {};

  const listBoxTemplate = ({ path, name, type, clip, tooltip, id }) => {
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
          src={path}
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
    useStore.getState().setSidebarSubList(listboxRef.getDataList(), selectedItem.idIcon, selectedItem.idList);
  }
  function leftClickItem(name, type, clip, tooltip, id) {
      useStore.setState({ selectedItem: { ...useStore.getState().selectedItem, idSubList: id,isSub:true, name, clip, clipName: name, tooltip, type } });
  }
  // ********* contextMenu ************
  function rightClickItem(name, type, clip, tooltip, id) {
useStore.setState({ selectedItem: { ...useStore.getState().selectedItem, idSubList: id, isSub: true, name, clip, clipName: name, tooltip, type } });
  }
  function contextMenuClick(args) {
    console.log(useStore.getState().selectedItem);
    switch (args.item.text) {
      case "Add clipBoard":
        useStore.setState({ dropdownOpen: true, type: "Add Sub ClipBoard" });
        break;
      case "Edit":
          useStore.setState({ type: "Edit Sub ClipBoard", dropdownOpen: true });
        break;
      case "Remove":
          useStore.setState({ type: "Remove Sub ClipBoard", dropdownOpen: true });
        break;
    }
  }
  //  *********************************
  return (
    <>
      {selectedItemClicked && (
        <div>
          <div className="bg-[#2f3136] h-max  overflow-x-hidden" id="listbox2-control">
            <ListBoxComponent
              ref={(g) => (listboxRef = g)}
              id="sublistbox"
              dataSource={data}
              fields={{ value: "name", text: "name" }}
              allowDragAndDrop
              itemTemplate={listBoxTemplate}
              drop={droppingItem}
            />
          </div>
          <div id="contextmenu-listbox">
            <ContextMenuComponent target="#listbox2-control" items={menuItems} select={contextMenuClick} animationSettings={{ duration: 500, effect: "FadeIn" }} />
          </div>
          <PopupDialog />
        </div>
      )}
    </>
  );
};

export default SubListBox;
