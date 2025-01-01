import { combineReducers } from "redux";
import filters from "./filter";

const rootReducer = combineReducers({
  filters,
});

export default rootReducer;
