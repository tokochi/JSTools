import "./App.css"
import Listbox from "./component/Listbox";
import Sidebar from './component/Sidebar';
import SubListBox from "./component/SubListBox";
import Titlebar from "./component/Titlebar";



function App() {
  return (
    <>
      <Titlebar />
      <div className="flex relative">
        <Sidebar />
        <Listbox />
        <SubListBox />
      </div>
    </>
  );
}
        

export default App

