import authReducer from './auth';
import ThemeOptions from "./ThemeOptions";
import { combineReducers } from 'redux';

const reducer = combineReducers({
  auth: authReducer,
  ThemeOptions,
});

export default reducer;
