import { combineReducers } from "redux";
import details from "./users";
import themeData from "./theme";
import devices from "./devices";
import device from "./device";
import table from "./table";

const rootReducer = combineReducers({
  user: details,
  devices,
  device,
  table,
  theme: themeData,
});

export default rootReducer;
