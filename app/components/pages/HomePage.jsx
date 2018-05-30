import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
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
        // e.preventDefault();
        axios.post('/HomePage', this.state)
        .then((res) => {
            if(res.data === true){
                this.props.Dang_Nhap(this.state.txtUserName)
            }
        });
    }
    render() {
        return (
            <div>
                <h1>this is homepage</h1>
                <form method="post" action="/HomePage">
                {/* <input type="text" name="txtUserName" autoComplete="off" value={this.state.txtUserName} className="form-control" onChange={this.onChange.bind(this)} />
                <input type="text" name="txtPassWord" autoComplete="off" value={this.state.txtPassWord} className="form-control" onChange={this.onChange.bind(this)} /> */}
                <input type="text" name="username" autoComplete="off" value={this.state.txtUserName} className="form-control" onChange={this.onChange.bind(this)} />
                <input type="text" name="password" autoComplete="off" value={this.state.txtPassWord} className="form-control" onChange={this.onChange.bind(this)} />
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
export default connect(mapDispatchToProps, mapDispatchToProps)(HomePage);