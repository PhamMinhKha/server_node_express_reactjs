import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button, Nav, NavItem } from 'reactstrap';
import { connect } from 'react-redux';
import axios from 'axios';
class Menu extends Component {
    componentWillMount(){
        axios.post('/checklogin', this.state)
        .then((res) => {
            if(res.data === true){
                this.props.Dang_Nhap('Đăng nhập thành công')
            }
        });
    }
    render() {
        let isLogin = this.props.items.Login;
        return (
            <div>
                <p>List Based</p>
                <Nav>
                    <NavItem>
                    { (!isLogin) ? (<Link to="/login">Đăng nhập</Link>): (<Link to="/login">Đăng xuất</Link>)}
                    </NavItem>
                    <NavItem>
                        <Link to="/">Trang chủ</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/Trend">Another Link</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/New">New Link</Link>
                    </NavItem>
                </Nav>
                <hr />
            </div>
        )
    }
}
const mapStateToProps = state =>{
    return {items : state }
}
const mapDispatchToProps = dispatch => ({
    Dang_Nhap: (user) => dispatch({type:'DANG_NHAP', username:user}),
})
export default connect(mapStateToProps, mapDispatchToProps)(Menu);