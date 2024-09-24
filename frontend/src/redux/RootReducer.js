import userReducer from "../redux/slices/userSlice";
import { combineReducers } from "redux";
const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
