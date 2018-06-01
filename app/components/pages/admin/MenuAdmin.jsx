import React, {Component} from 'react';
import { NavItem } from 'reactstrap';
import { Link } from "react-router-dom";
class MenuAdmin extends Component{
    render(){
        return (
            <NavItem>
                <Link to={this.props.link} className="nav-link">{this.props.children}</Link>
            </NavItem>
        )
    }
}
export default MenuAdmin;