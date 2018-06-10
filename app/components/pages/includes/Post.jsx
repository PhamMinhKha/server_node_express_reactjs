import React, { Component } from 'react';
import IconUp from 'react-icons/lib/io/arrow-up-a';
import IconDown from 'react-icons/lib/io/arrow-down-a';
import IconChat from 'react-icons/lib/io/chatbox-working';
import IconMore from 'react-icons/lib/io/android-more-horizontal';
import IconFacebook from 'react-icons/lib/io/social-facebook';
import IconGoogle from 'react-icons/lib/io/social-googleplus';
import {Link} from 'react-router-dom';

class Post extends Component {
    render() {
        var images = this.props.images;
        var img = '';
        if (images.video === null) {
            img = <img className="post-content center" src={'/' + images.image.url} alt={this.props.name} />
        }
        else {
            img = (
                <video loop className="post-content video center" preload="auto" poster={images.image.url} controls>
                    <source src={images.video.url} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>)
        }
        return (<article id={this.props.id}>
            <Link to={'v/'+this.props.slug}>
                <h3>{this.props.name}</h3>
            </Link>
            <div className="post-container">
                {img}
            </div>
            <p className="post-meta">
                <a href="/gag/azXRvbx" data-evt="PostList,TapPost,Hot,,Point" data-entry-id="azXRvbx" data-position="1" target="_blank" className="point badge-evt">
                1,565 points
                </a> ·
                <a href="/gag/azXRvbx#comment" data-evt="PostList,TapPost,Hot,,CommentCountText" data-entry-id="azXRvbx" data-position="1" target="_blank" className="comment badge-evt">
                    33 comments
                 </a>
            </p>
            <div className="post-control">
                <ul className="group-control-post pull-left" style={{marginTop: 5}}>
                    <li className="btn-control"><a href="javascript:void(0);" rel="nofollow" onClick={() => console.log('up')}><IconUp style={{height:30, width:30}}/></a></li>
                    <li className="btn-control"><a href="javascript:void(0);" rel="nofollow"><IconDown style={{height:30, width:30}}/></a></li>
                    <li className="btn-control"><a href="javascript:void(0);" rel="nofollow"><IconChat style={{height:30, width:30}}/></a></li>
                    <li className="btn-control"><a href="javascript:void(0);" rel="nofollow"><IconMore style={{height:30, width:30}}/></a></li>
                </ul>
                <ul className="group-control-post pull-right">
                    <li><a href="http://www.facebook.com/sharer.php?u=https://simplesharebuttons.com" rel="nofollow" className=" post-afterbar-a facebook">
                    <IconFacebook style={{height:30, width:30}}/> <span className="d-none d-sm-block">Facebook</span>
        </a></li>
                </ul>
            </div>
            <div className="clearfix margin-top-bottom-5 ">
                <hr/>
            </div>
        </article>)
    }
}
export default Post;