import authReducer from './auth';
import desoReducer from './deso';
import ThemeOptions from "./ThemeOptions";
import { combineReducers } from 'redux';

const reducer = combineReducers({
  auth: authReducer,
  deso: desoReducer,
  ThemeOptions,
});

export default reducer;
