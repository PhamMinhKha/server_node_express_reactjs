import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button, Nav, NavItem } from 'reactstrap';
class Menu extends Component {
    render() {
        return (
            <div>
                <p>List Based</p>
                <Nav>
                    <NavItem>
                        <Link to="/login">Đăng nhập</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/">Trang chủ</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/Trend">Another Link</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="New">Disabled Link</Link>
                    </NavItem>
                </Nav>
                <hr />
            </div>
        )
    }
}
export default Menu;