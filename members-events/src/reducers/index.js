import { combineReducers } from "redux";
import { members } from "./members";
import { events } from "./events";

const rootReducer = combineReducers({
  members,
  events
});

export default rootReducer;
