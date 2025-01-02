import { combineReducers } from "redux";
import filters from "./filter";
import columns from "./columns";
import features from "./features";

const rootReducer = combineReducers({
  columns,
  filters,
  features,
});

export default rootReducer;
