const init = {
    username: '',
    permission: null,
}
const Login = (state = init, action) => {
    switch(action.type){
        case 'DANG_NHAP':
            console.log(action.user)
            return action.user;
        default:
            return state;
    }
}

export default Login;