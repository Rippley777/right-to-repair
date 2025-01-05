import { combineReducers } from "redux";
import filters from "./filter";
import columns from "./columns";
import features from "./features";
import subfilters from "./subfilters";

const rootReducer = combineReducers({
  columns,
  features,
  filters,
  subfilters,
});

export default rootReducer;
