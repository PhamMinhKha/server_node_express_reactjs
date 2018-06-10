import { combineReducers } from 'redux';
import Login from './Login.jsx';
import Logout from './Logout.jsx';
import Categories from './categoryReducers.jsx';
import HotPage from './HotPageReducer.jsx';

const appReducers = combineReducers({
    Login,
    DangXuat: Logout,
    Categories,
    HotPage
});

export default appReducers;