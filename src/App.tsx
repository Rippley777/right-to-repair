import { BrowserRouter } from "react-router-dom";
import Workspace from "./features/explorer/Explorer";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Workspace />
    </BrowserRouter>
  );
}
