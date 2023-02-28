import { ListBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import { ContextMenuComponent } from "@syncfusion/ej2-react-navigations";
import { useStore } from "../contexts/Store";
import PopupDialog from "./PopupDialog";

const ToolbarItems = () => {
  const data = useStore((state) => state.toolbarItems);
  let listboxRef = {};
  const listBoxTemplate = ({ path, name, clip, id }) => {
    return (
      <div className='flex items-center m-[2px] border border-gray-800 active:bg-slate-600'>
        <img
          onContextMenu={(e) => {
            e.preventDefault(), leftClickItem(name, clip, id);
          }}
          onClick={() => {
            rightClickItem(name, clip, id);
            navigator.clipboard.writeText(clip);
          }}
          id={id}
          className='user-nodrag max-w-[60px] min-w-[5px] active:opacity-80'
          src={path}
          alt={name}
        />
      </div>
    );
  };
  const menuItems = [
    {
      text: "Add",
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
    useStore.getState().setToolbarItems(listboxRef.getDataList());
  }
  function leftClickItem(name, clip, id) {
    useStore.setState({
      selectedItem: { ...useStore.getState().selectedItem, idTool: id, name, clip, path: "", clipName: name, type: "clip" },
    });
  }
  // ********* contextMenu ************
  function rightClickItem(name, clip, id) {
    useStore.setState({
      selectedItem: { ...useStore.getState().selectedItem, idTool: id, name, clip, path: "", clipName: name, type: "clip" },
    });
  }
  function contextMenuClick(args) {
    
    switch (args.item.text) {
      case "Add":
        useStore.setState({ type: "Add Tool", dropdownOpen: true });
        break;
      case "Edit":
        useStore.setState({ type: "Edit Tool", dropdownOpen: true });
        break;
      case "Remove":
        useStore.setState({ type: "Remove Tool", dropdownOpen: true });
        break;
    }
  }
  //  *********************************

  return (
    <>
      <div className=" h-screen bg-[#202225] w-screen overflow-hidden ">
        <div className="text-slate-400 text-xl text-center user-drag cursor-wait">
          ⋮⋮⋮⋮⋮
        </div>
        <div className="" id="toolbar">
          <ListBoxComponent
            ref={(g) => (listboxRef = g)}
            id="listToolbar"
            dataSource={data || []}
            fields={{ value: "name", text: "name" }}
            allowDragAndDrop
            itemTemplate={listBoxTemplate}
            drop={droppingItem}
          />
        </div>
        <div id="contextmenu-toolbar">
          <ContextMenuComponent
            target="#toolbar"
            items={menuItems}
            select={contextMenuClick}
            animationSettings={{ duration: 500, effect: "FadeIn" }}
          />
        </div>
        <PopupDialog />
      </div>
    </>
  );
};

export default ToolbarItems;
