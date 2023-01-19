import "./App.css"
import Listbox from "./component/Listbox";
import Sidebar from './component/Sidebar';
import SubListBox from "./component/SubListBox";

function App() {
  return (
    <div  className="flex relative">
      <Sidebar />
      <Listbox />
      <SubListBox />
    </div>
  );
}
        

export default App
