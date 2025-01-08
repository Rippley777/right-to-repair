import { combineReducers } from "redux";
import filters from "./filter";
import columns from "./columns";
import features from "./features";
import pages from "./pages";
import subfilters from "./subfilters";

const rootReducer = combineReducers({
  columns,
  features,
  filters,
  pages,
  subfilters,
});

export default rootReducer;
