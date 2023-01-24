import React from 'react';
import ReactDOM from "react-dom/client";
import './index.css';
import { registerLicense } from "@syncfusion/ej2-base";
import ToolbarItems from './component/ToolbarItems';
registerLicense("ORg4AjUWIQA/Gnt2VVhkQlFadVdJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxQdkRiX39edXJWRmNYWUc=");
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
 <ToolbarItems/>
  </React.StrictMode>
);
