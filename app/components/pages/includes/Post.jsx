import React, { Component } from 'react'

class Post extends Component {
    render() {
        var images = this.props.images;
        var img = '';
        if(images.video === null) {
            img = <img src={'/' + images.image.url} alt={this.props.name} />
        }
        else {
            img = (
                <video loop className="post-content video center" preload="none" poster={images.image.url} controls>
                    <source src={images.video.url} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>)
        }
        return (<article id={this.props.id}>
            <a href="">
                <h3>{this.props.name}</h3>
            </a>
            <div className="post-container">
                {img}
            </div>
            <p className="post-meta"><a href="/gag/azXRvbx" data-evt="PostList,TapPost,Hot,,Point" data-entry-id="azXRvbx" data-position="1" target="_blank" className="point badge-evt">
                1,565 points
    </a> ·
    <a href="/gag/azXRvbx#comment" data-evt="PostList,TapPost,Hot,,CommentCountText" data-entry-id="azXRvbx" data-position="1" target="_blank" className="comment badge-evt">
                    33 comments
    </a></p>
            <div className="post-control">

            </div>
        </article>)
    }
}
export default Post;