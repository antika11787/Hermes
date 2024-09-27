import userReducer from "../redux/slices/userSlice";
import commonDataReducer from "../redux/slices/commonDataSlice";
import { combineReducers } from "redux";
const rootReducer = combineReducers({
  user: userReducer,
  commonData: commonDataReducer,
});

export default rootReducer;
