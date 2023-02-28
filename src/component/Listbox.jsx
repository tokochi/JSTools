import { ListBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import { ContextMenuComponent } from "@syncfusion/ej2-react-navigations";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useStore } from "../contexts/Store";
import folder from "../data/icons/folder.png";
import PopupDialog from "./PopupDialog";

const Listbox = () => {
  const selectedItem = useStore((state) => state.selectedItem);
  const data = useStore((state) => state.listboxItems)?.filter((item) => item.idIcon === selectedItem.idIcon) || [];
  const selectedItemClicked = useStore((state) => state.selectedItem.idIcon !== "");
  let listboxRef = {};

  const listBoxTemplate = ({ path, name, type, clip, tooltip, id }) => {
    return (
      <>
        {type === "clip" && tooltip.length > 0 ? (
          <TooltipComponent
            content={tooltip}
            width='800'
            animation={{
              open: { effect: "ZoomIn", duration: 200 },
              close: { effect: "ZoomOut", duration: 0 },
            }}
            position='RightCenter'
          >
            <div
              onContextMenu={(e) => {
                e.preventDefault(), leftClickItem(name, type, clip, tooltip, id);
              }}
              onClick={() => {
                rightClickItem(name, type, clip, tooltip, id);
              }}
              className='flex active:bg-green-600  hover:bg-slate-700 gap-2 items-center px-2  transition-colors ease'
            >
              <img
                onContextMenu={(e) => {
                  e.preventDefault(), leftClickItem(name, type, clip, tooltip, id);
                }}
                onClick={() => {
                  rightClickItem(name, type, clip, tooltip, id);
                }}
                id={id}
                className='user-nodrag  h-[20px]'
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
                className='text-base  capitalize'
              >
                {name}
              </span>
            </div>
          </TooltipComponent>
        ) : (
          <div
            onContextMenu={(e) => {
              e.preventDefault(), leftClickItem(name, type, clip, tooltip, id);
            }}
            onClick={() => {
              rightClickItem(name, type, clip, tooltip, id);
            }}
            className='flex gap-2 items-center px-2 py-[1px] hover:bg-slate-700'
          >
            <img
              onContextMenu={(e) => {
                e.preventDefault(), leftClickItem(name, type, clip, tooltip, id);
              }}
              onClick={() => {
                rightClickItem(name, type, clip, tooltip, id);
              }}
              id={id}
              className='.user-nodrag h-[20px]'
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
              className='text-base capitalize'
            >
              {name}
            </span>
          </div>
        )}
      </>
    );
  };
  // ********* Drag & Drop  ************
  function droppingItem() {
    useStore.getState().setListboxItems(listboxRef.getDataList());
  }
  function leftClickItem(name, type, clip, tooltip, id) {
    if (type === "folder") {
      useStore.setState({ selectedItem: { ...useStore.getState().selectedItem, idList: id, name, folder: name, type } });
    }
    if (type === "clip") {
      navigator.clipboard.writeText(clip);
      useStore.setState({
        selectedItem: { ...useStore.getState().selectedItem, idList: id, folder: "", name, clip, clipName: name, tooltip, type },
      });
    }
  }
  // ********* contextMenu ************
  function rightClickItem(name, type, clip, tooltip, id) {
    if (type === "folder") {
      useStore.setState({ selectedItem: { ...useStore.getState().selectedItem, idList: id, name, folder: name, type } });
    }
    if (type === "clip") {
      useStore.setState({
        selectedItem: { ...useStore.getState().selectedItem, idList: id, folder: "", name, clipName: name, clip, tooltip, type },
      });
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
  //  *********************************
  return (
    <div className='shrink-0'>
      {selectedItemClicked && (
        <div>
          <div className='bg-[#2f3136] max-h-[calc(100vh_-_30px)]  overflow-y-scroll overflow-x-hidden' id='listbox-control'>
            <ListBoxComponent
              ref={(g) => (listboxRef = g)}
              id='listbox'
              dataSource={data}
              fields={{ value: "name", text: "name" }}
              allowDragAndDrop
              itemTemplate={listBoxTemplate}
              drop={droppingItem}
            />
          </div>
          <div id='contextmenu-listbox'>
            <ContextMenuComponent
              target='#listbox-control'
              items={menuItems}
              select={contextMenuClick}
              animationSettings={{ duration: 500, effect: "FadeIn" }}
            />
          </div>
          <PopupDialog />
        </div>
      )}
    </div>
  );
};

export default Listbox;
