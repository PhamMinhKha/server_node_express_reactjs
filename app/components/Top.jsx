import React, { Component } from 'react';
import { connect } from 'react-redux';

class Top extends Component{
    constructor(props) {
        super(props);
        this.state = {
            Hot : 'nothing'
        }
    }
    render(){
        return(
        <div>
        <h1>Day la Top</h1>
        {this.props.children}
        </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return {Items: state}
}
export default connect(mapStateToProps, null)(Top);