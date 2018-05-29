import React, { Component } from 'react';
import { Link } from "react-router-dom";
import * as Material from 'react-icons/lib/md'
import { Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { connect } from 'react-redux';
import axios from 'axios';
class navBar extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }
    render() {
        let isLogin = this.props.items.Login;
        return (
            <div>
            <Navbar color="light" light expand="md">
              <NavbarBrand href="/">TéGhé.Fun</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="" navbar>
                  <NavItem>
                    <Link className="nav-link" to="/">Trang Chủ</Link>
                  </NavItem>
                  <NavItem>
                    <NavLink href="https://github.com/reactstrap/reactstrap">Xu Hướng</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="https://github.com/reactstrap/reactstrap">Mới</NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink href="/components/"> <InputGroup>
        <InputGroupAddon addonType="prepend"><Material.MdSearch style={{width:30, height: 30}}/></InputGroupAddon>
        <Input placeholder="username" />
      </InputGroup> </NavLink>
                  </NavItem>
                  <NavItem>
                    {(!isLogin) ? (<Link className ="nav-link" to="/login">Login</Link>): (<Link className ="nav-link" to="/profile">{isLogin}</Link>)}
                  </NavItem>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Options
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>
                        Option 1
                      </DropdownItem>
                      <DropdownItem>
                        Option 2
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>
                        Reset
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
              </Collapse>
            </Navbar>
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
export default connect(mapStateToProps, mapDispatchToProps)(navBar);