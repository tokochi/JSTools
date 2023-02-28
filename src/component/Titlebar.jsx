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
    <div className='w-full h-[30px] bg-[#202225] user-drag overflow-y-hidden shrink-0 flex gap-10 items-center'>
      <span className='px-2 text-center text-xl text-gray-50 '>JS Tools</span>
      <div className='flex gap-5 items-center user-nodrag '>
        <button
          onClick={() => {
            setstate(state - 0.1);
          }}
        >
          <img className='h-[15px] hover:scale-110 transition-all duration-300 select-none' src={minus} alt='zoomout' />
        </button>
        <button
          onClick={() => {
            setstate(0);
            location.reload;
            // ipcRenderer.send("reload");
          }}
        >
          <img
            className='h-[15px] hover:scale-110 transition-all duration-300 select-none'
            onClick={() => {
              setstate(0);
              location.reload;
              // ipcRenderer.send("reload");
            }}
            src={reload}
            alt='zoom'
          />
        </button>
        <button
          onClick={() => {
            setstate(state + 0.1);
          }}
        >
          <img className='h-[15px] hover:scale-110 transition-all duration-300 select-none' src={plus} alt='zoomin' />
        </button>
        <button onClick={() => ipcRenderer.send("toolbar")}>
          <img className='h-[15px] hover:scale-110 transition-all duration-300 select-none' src={dev} alt='dev' />
        </button>
        {/* <button onClick={() => useStore.setState({ tooltipVisible: !tooltipVisible })}>
          <svg className='h-[15px] hover:scale-110 transition-all duration-300 select-none' viewBox='0 0 48 48'>
            <path
              d='M36.5,6h-25C8.467,6,6,8.468,6,11.5v22c0,3.032,2.467,5.5,5.5,5.5h6.478l5.007,4.604C23.271,43.868,23.636,44,24,44c0.361,0,0.723-0.13,1.009-0.39L30.08,39h6.42c3.033,0,5.5-2.468,5.5-5.5v-22C42,8.468,39.533,6,36.5,6z M25.5,31.5c0,0.828-0.671,1.5-1.5,1.5s-1.5-0.672-1.5-1.5v-10c0-0.828,0.671-1.5,1.5-1.5s1.5,0.672,1.5,1.5V31.5z M24,17c-1.105,0-2-0.895-2-2c0-1.105,0.895-2,2-2s2,0.895,2,2C26,16.105,25.105,17,24,17z'
              fill={`${tooltipVisible ?"#dfdfdf" :"#6f6f72" }`}
            />
          </svg>
        </button> */}
      </div>
    </div>
  );
}

export default Titlebar