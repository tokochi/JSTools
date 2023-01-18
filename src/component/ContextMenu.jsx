import React from 'react'
import { ContextMenuComponent } from "@syncfusion/ej2-react-navigations";

const ContextMenu = () => {
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
   let values = [];
   function beforeOpen(args) {
     values = [];
     values.push(args.event.target.getAttribute("data-value"));
   }
   function selectFunction() {
    
   }
  return (
    <div id="contextmenu-control">
      <ContextMenuComponent target="#listbox-control" items={menuItems} beforeOpen={beforeOpen} select={selectFunction} animationSettings={{ duration: 500, effect: "FadeIn" }} />
    </div>
  );
}

export default ContextMenu