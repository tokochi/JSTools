import "./App.css"
import ListboxContainer from "./component/ListboxContainer";
import Sidebar from './component/Sidebar';
import Store from "electron-store";
// import { useStore } from "./contexts/Store";
function App() {
  
  const store = new Store();
  return (
    <div  className="flex relative">
      <Sidebar />
      <ListboxContainer />

    </div>
  );
}
        

export default App
