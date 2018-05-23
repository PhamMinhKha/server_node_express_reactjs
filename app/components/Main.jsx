import React, { Component } from 'react';
import { connect } from 'react-redux';

class Main extends Component{
    constructor(props) {
        super(props);
        this.state = {
            Hot : 'nothing'
        }
    }
    componentDidUpdate(){
        console.log('====================================');
        console.log(this.state);
        console.log('====================================');
    }
    render(){
        return(
        <div>
        <h1>Day la main</h1>
        {this.props.children}
        </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return {Items: state}
}
export default connect(mapStateToProps, null)(Main);