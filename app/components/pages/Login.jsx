import React, { Component } from 'react';
import { connect } from 'react-redux';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txtUserName: '',
            txtPassWord: ''
        }
    }
    onChange(e) {
        let control = e.target.name;
        this.setState(...this.state,{
            [control] : e.target.value
        })
        console.log(this.state);
    }
    onSubmit(e){
        console.log('====================================');
        console.log(this.props.items);
        console.log('====================================');
        this.props.Dang_Nhap(this.state.txtUserName);
        this.props.Dang_xuat('ok');
    }
    render() {
        return (
            <div>
                <h1>this is login</h1>
                <form method="post" action="/login">
                <input type="text" name="txtUserName" value={this.state.txtUserName} className="form-control" onChange={this.onChange.bind(this)} />
                <input type="text" name="txtPassWord" value={this.state.txtPassWord} className="form-control" onChange={this.onChange.bind(this)} />
                <input type="submit" value="Đăng nhập" onClick={this.onSubmit.bind(this)}/>
                </form>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {items : state }
}

const mapDispatchToProps = dispatch => ({
    Dang_Nhap: (user) => dispatch({type:'DANG_NHAP', username:user}),
    Dang_xuat: () =>dispatch({type: 'DANG_XUAT', username: 'ok da dang xuat'})
})
export default connect(mapDispatchToProps, mapDispatchToProps)(Login);