import { combineReducers } from 'redux';
import Login from './Login.jsx';
import Logout from './Logout.jsx';

const appReducers = combineReducers({
    Login,
    DangXuat: Logout
});

export default appReducers;