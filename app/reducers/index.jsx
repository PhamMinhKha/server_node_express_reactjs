import { combineReducers } from 'redux';
import Login from './Login.jsx';
import Logout from './Logout.jsx';
import Categories from './categoryReducers.jsx';

const appReducers = combineReducers({
    Login,
    DangXuat: Logout,
    Categories
});

export default appReducers;