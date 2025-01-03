import { combineReducers } from "redux";
import details from "./users";
import themeData from "./theme";
import devices from "./devices";
import device from "./device";
import table from "./table";
import devModeReducer from "./devMode";

const isDevEnvironment = process.env.NODE_ENV === "development";

const rootReducer = combineReducers({
  user: details,
  devices,
  device,
  table,
  theme: themeData,
  ...(isDevEnvironment && { devMode: devModeReducer }),
});

export default rootReducer;
