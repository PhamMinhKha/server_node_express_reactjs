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
import MenuAdmin from './pages/admin/MenuAdmin.jsx';
import axios from 'axios';
class navBar extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }
      componentDidMount = () => {
        const props = this.props;
        axios.post('/checklogin')
        .then(function (response) {
          if(response.data !== false)
          {
            console.log(response.data.data.ten);
            let user = {username: response.data.data.ten, permission: response.data.data.quyen_hang};
            props.Dang_Nhap(user);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }
    render() {
        // let isLogin = this.props.items.Login;
        let isLogin = (this.props.items.Login.username !== "") ?  this.props.items.Login.username : null  ;
        let menuAdmin = [{link: '/fetch9Gag', name: '9Gag'},{link: '/fetchHaivn', name: 'HaiVN'}];
        // let quyen_hang = (isLogin && this.props.items.Login.quyen_hang) ? this.props.items.Login.quyen_hang : 0;
        // let isLogin = null;
        return (
            <div>
            <Navbar color="dark" dark expand="md">
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
                   {(isLogin && this.props.items.Login.permission === 1) ? 
                   menuAdmin.map((item, index) =>{
                    return <MenuAdmin key={index} link={item.link}>{item.name}</MenuAdmin>
                   })
                    : ''}
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
                  {(isLogin) ? 
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
                        <NavLink href="/logout" style={{color:"gray"}}>Thoát</NavLink>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
    : ''}
                </Nav>
              </Collapse>
            </Navbar>
          </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return {items : state }
    // return {items : null}
}
const mapDispatchToProps = dispatch => ({
    Dang_Nhap: (user) => dispatch({type:'DANG_NHAP', user:user}),
})
export default connect(mapStateToProps, mapDispatchToProps)(navBar);
// export default navBar;