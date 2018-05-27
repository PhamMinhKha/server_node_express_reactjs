import React, { Component } from 'react';
import axios from 'axios';

class NewPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            posts : null
        }
    }
    
    componentDidMount(){
        axios.post('/New')
        .then((res) => {
            this.setState({
                posts: res
            })
        });
    }
    htmlRender()
    {
        return (<h5>ok</h5>)
    }
    luuAnh(item, e){
        e.preventDefault(); // Let's stop this event.
        e.stopPropagation(); // Really this time.
        axios.post('/luuAnh',{
            'title' : item.title,
            'img' : item.img
        })
        .then((res) => {
          
        });
        
    }
    render(){
        var data = this.state.posts;
        var Html = null;
        if(data !== null){
            console.log(data.data);
            data = data.data;
            Html =  data.map((item, index) => {
            return  (
                <div key={index}>
                    <h3>{item.title}</h3>
                    <div>
                        <img src={item.img} />
                        <button onClick={(e) => { this.luuAnh(item, e)}}>
                        Lưu
                       </button>
                    </div>
                </div>
            )
        })
        }
        return(
            <div>
        <h1>Day la NewPage </h1>
           <div id="posts">
            {Html}
           </div>
        </div>
        )
    }
}
export default NewPage;