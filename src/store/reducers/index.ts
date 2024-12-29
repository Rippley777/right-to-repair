import { combineReducers } from "redux";
import details from "./users";
import themeData from "./theme";
import devices from "./devices";
import device from "./device";

const rootReducer = combineReducers({
  user: details,
  devices: devices,
  device: device,
  theme: themeData,
});

export default rootReducer;
