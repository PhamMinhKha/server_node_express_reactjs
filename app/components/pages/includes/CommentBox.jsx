import React, { Component } from 'react';
import IconUp from 'react-icons/lib/io/arrow-up-a';
import IconDown from 'react-icons/lib/io/arrow-down-a';
import IconChat from 'react-icons/lib/io/chatbox-working';
import IconMore from 'react-icons/lib/io/android-more-horizontal';
import IconFacebook from 'react-icons/lib/io/social-facebook';
import IconGoogle from 'react-icons/lib/io/social-googleplus';
import IconEmoji from 'react-icons/lib/md/sentiment-satisfied';
import IconCamera from 'react-icons/lib/md/camera-alt';
import IconInfo from 'react-icons/lib/md/info';
import { Link } from 'react-router-dom';

class CommentBox extends Component {
    render() {
        return (
            <div>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className="nav-link active" href="#">Nóng</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Mới</a>
                    </li>
                </ul>
                <div className="comment-box first">
                    <p className="text-danger">{this.state.error ? <IconInfo className="text-danger" style={{ height: 25, width: 25, marginTop: "-5" }} /> : ''} {this.state.error}</p>
                    <div className="avatar">
                        <div className="image-container">
                            <a href="https://9gag.com/u/phamminhkhatc" target="_blank">
                                <img src="https://accounts-cdn.9gag.com/media/avatar/23546188_100_1.jpg" />
                            </a>
                        </div>
                    </div>
                    <div className="payload">
                        <div className="textarea-container">
                            <div>
                                <textarea value={this.state.textarea} onChange={(e) => this.onKeyDown(e)} placeholder="Write comments..." className="post-text-area focus">
                                </textarea>
                                {this.state.loadingUpload ? (<div id="uploadImgComment" className="holder_uploading_image_comment">
                                    {uploadHolder}
                                </div>) : ""}
                                {this.state.loadingUpload !== false && this.state.loadingUpload !== true ? <a onClick={() => this.setState({ loadingUpload: false })}>b</a> : ''}
                            </div>
                        </div>
                        <div className="action">
                            <div className="pull-left">
                                <a href="http://memeful.com" className="cmnt-reaction" target="_blank"><IconEmoji className="iconEmoji" /></a>
                                <a href="javascript:void(0)" onClick={() => this.showFileUpload()} className="cmnt-reaction cmnt-image"><IconCamera className="iconEmoji" /></a>
                                <input type="file" name="blob" ref={this.fileUpload} onChange={this.handleFileUpload.bind(this)} id="blob" style={{ display: "none" }} />
                            </div>
                            <div className="pull-right">
                                <p className="word-count pull-left cmnt-reaction">
                                    <span>{this.state.charCount}</span>
                                </p>
                                <a href="javascript:void(0);" className="cmnt-btn size-30 submit-comment">Post</a>
                            </div>
                        </div>
                    </div>
                    <div className="clearfix">
                    </div>
                </div>
            </div>
        )
    }
}
export default CommentBox;