import { combineReducers } from "redux";
import filters from "./filter";
import columns from "./columns";

const rootReducer = combineReducers({
  columns,
  filters,
});

export default rootReducer;
