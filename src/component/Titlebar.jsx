import { useState, useEffect } from "react";
import plus from "../data/icons/plus.png"
import minus from "../data/icons/minus.png"
import reload from "../data/icons/restart.png"
import dev from "../data/icons/code.png"
const { ipcRenderer } = require("electron");
const { webFrame } = require("electron");

const Titlebar = () => {
  const [state, setstate] = useState(0);
  useEffect(() => {
    webFrame.setZoomLevel(state);
  }, [state]);
  
  return (
    <div className="w-full h-[30px] bg-[#202225] user-drag overflow-y-hidden shrink-0 flex gap-10 items-center">
      <span className="px-2 text-center text-xl text-gray-50 ">JS Tools</span>
      <div className="flex gap-5 items-center user-nodrag ">
        <img
          className="h-[15px] hover:scale-110 transition-all duration-300 select-none"
          onClick={() => {
            setstate(state - 0.1);
  
          }}
          src={minus}
          alt="zoomout"
        />
        <img
          className="h-[15px] hover:scale-110 transition-all duration-300 select-none"
          onClick={() => {
            setstate(0)
            location.reload;
            // ipcRenderer.send("reload");
          }}
          src={reload}
          alt="zoom"
        />
        <img
          className="h-[15px] hover:scale-110 transition-all duration-300 select-none"
          onClick={() => {
            setstate(state + 0.1);
          }}
          src={plus}
          alt="zoomin"
        />
        <img
          onClick={() => ipcRenderer.send("toolbar")}
          className="h-[15px] hover:scale-110 transition-all duration-300 select-none"
          src={dev}
          alt="dev"
        />
      </div>
    </div>
  );
}

export default Titlebar