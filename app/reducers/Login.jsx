const Login = (state = null, action) => {
    switch(action.type){
        case 'DANG_NHAP':
            return action.username;
        default:
            return state;
    }
}

export default Login;