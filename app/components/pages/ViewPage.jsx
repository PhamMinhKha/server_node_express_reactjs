import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import axios, {post} from 'axios';
import IconUp from 'react-icons/lib/io/arrow-up-a';
import IconDown from 'react-icons/lib/io/arrow-down-a';
import IconChat from 'react-icons/lib/io/chatbox-working';
import IconMore from 'react-icons/lib/io/android-more-horizontal';
import IconFacebook from 'react-icons/lib/io/social-facebook';
import IconGoogle from 'react-icons/lib/io/social-googleplus';
import IconEmoji from 'react-icons/lib/md/sentiment-satisfied';
import IconCamera from 'react-icons/lib/md/camera-alt';
import IconInfo from 'react-icons/lib/md/info';

import { Link, withRouter } from 'react-router-dom';
import ContentLoader, { Code } from 'react-content-loader';
import { Container, Row, Col, Button } from 'reactstrap';
import ultis from './script/ultis';

class ViewPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {
                _id: null,
                titles: { vn: null },
                images: null,
                video: null
            },
            error: null,
            loadingUpload: false,
            charCount: 1000,
            textarea: '',
        }
        this.fileUpload = React.createRef();
        axios.get('/view/' + this.props.match.params.slug)
            .then((res) => {
                if (res.error) {
                    alert('Không lấy được giữ liệu vu lòng bấm F5!');
                }
                else {
                    this.setState({
                        post: res.data
                    });
                }
            });

    }

    // componentDidMount() {
    //     axios.get('/view/' + this.props.match.params.slug)
    //         .then((res) => {
    //             if (res.error) {
    //                 alert('Không lấy được giữ liệu vu lòng bấm F5!');
    //             }
    //             else {
    //                 console.log(res);
    //                 this.setState({
    //                     post: res.data
    //                 });
    //                 console.log(this.state.post)
    //             }
    //         });

    // }
    showFileUpload() {
        this.fileUpload.current.click();
      }
    handleFileUpload(e) {
        var file =e.target.files[0];
        if(!file){
            return console.log('Không chọ file');
        }
        this.setState({
            loadingUpload: true
        })
        const url = '/upload/comment';
        const formData = new FormData();
        formData.append('file',file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        formData.append('slug',this.props.match.params.slug);
        post(url, formData,config)
        .then(res => {
            if(res.data.error)
            {
                this.setState({
                    error: res.data.error
                })
                document.getElementById('blob').value = null;
                this.setState({
                    loadingUpload: false
                })
            }
            if(res.data.success)
            {
                this.setState({
                    loadingUpload: res.data.success
                })
            }
        })
      }
    onKeyDown(e){
        var check = 1000 - e.target.value.length;
        if(check >= 0){
        this.setState({
            textarea: e.target.value,
            charCount: 1000 - e.target.value.length
        })}
    }
    PostComment(){
        post('/submitComment',{
            image: this.state.loadingUpload,
            content: this.state.textarea
        }, (err, res) => {
            if(err){
                this.setState({
                    error: err
                })
            }
            else {
                console.log(res)
            }
        })
    }
    render() {
        var post = this.state.post;
        var images = post.images;
        var img = null;
        if (images && images.video === null) {
            img = <img className="post-content center" src={'/' + images.image.url} alt={post.titles.vn} />
        }
        else if (images) {
            img = (
                <video autoPlay poster={'/' + images.image.url} loop className="post-content video center" preload="auto" controls>
                    <source src={'/' + images.video.url} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )
        }
        var loadingHolder = (
            <ContentLoader height={30}>
                {/* Pure SVG */}
                <rect x="0" y="30" rx="0" ry="0" width="500" height="30" />
            </ContentLoader>
        );
        var loadingHolderImg = (
            <ContentLoader height={500} width={500}>
                {/* Pure SVG */}
                <rect x="0" y="0" rx="0" ry="0" width="500" height="500" />
            </ContentLoader>
        )
        var uploadHolder = '';
        if (this.state.loadingUpload === true ) 
            {
             uploadHolder = (<div className="loader center loading"></div>) 
            }
            else if(this.state.loadingUpload === false){
                uploadHolder = ''
            }
            else{
                let ext = ultis.getFileExtension(this.state.loadingUpload);
                if(ext === "mp4")
                {
                    uploadHolder = ( <video autoPlay loop className="comment_img" preload="auto">
                    <source src={'/tmp/' + this.state.loadingUpload} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>)
                }else
                uploadHolder = (<img src={'/tmp/' + this.state.loadingUpload} className="comment_img" />)
            }

        return (
            <div className="main-content">
                <Container>
                    <Row>
                        <Col xs="0" sm="2"></Col>
                        <Col xs="12" sm="6">
                            <article >
                                <h3>{post.titles.vn ? post.titles.vn : loadingHolder}</h3>
                                <div className="post-container">
                                    {img ? img : loadingHolderImg}
                                </div>
                                <p className="post-meta">
                                    <a href="/gag/azXRvbx" data-evt="PostList,TapPost,Hot,,Point" data-entry-id="azXRvbx" data-position="1" target="_blank" className="point badge-evt">
                                        1,565 points
                </a> ·
                <a href="/gag/azXRvbx#comment" data-evt="PostList,TapPost,Hot,,CommentCountText" data-entry-id="azXRvbx" data-position="1" target="_blank" className="comment badge-evt">
                                        33 comments
                 </a>
                                    <a className="comment badge-evt pull-right">Tố giác</a>
                                </p>
                                <div className="post-control">
                                    <ul className="group-control-post pull-left" style={{ marginTop: 5 }}>
                                        <li className="btn-control"><a href="javascript:void(0);" rel="nofollow" onClick={() => console.log('up')}><IconUp style={{ height: 30, width: 30 }} /></a></li>
                                        <li className="btn-control"><a href="javascript:void(0);" rel="nofollow"><IconDown style={{ height: 30, width: 30 }} /></a></li>
                                        <li className="btn-control"><a href="javascript:void(0);" rel="nofollow"><IconChat style={{ height: 30, width: 30 }} /></a></li>
                                        <li className="btn-control"><a href="javascript:void(0);" rel="nofollow"><IconMore style={{ height: 30, width: 30 }} /></a></li>
                                    </ul>
                                    <ul className="group-control-post pull-right">
                                        <li><a href="http://www.facebook.com/sharer.php?u=https://simplesharebuttons.com" rel="nofollow" className=" post-afterbar-a facebook">
                                            <IconFacebook style={{ height: 30, width: 30 }} /> <span className="d-none d-sm-block">Facebook</span>
                                        </a></li>
                                    </ul>
                                </div>
                                <div className="clearfix margin-top-bottom-5 ">
                                    <hr />
                                </div>
                                <ul className="nav nav-tabs">
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#">Nóng</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Mới</a>
                                    </li>
                                </ul>
                                <div>
                                    <div className="comment-box first">
                                        <p className="text-danger">{this.state.error ? <IconInfo className="text-danger" style={{height:25, width:25, marginTop:"-5"}}/>: ''} {this.state.error}</p>
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
                                                    </div>): ""}
                                                    {/* {this.state.loadingUpload !== false && this.state.loadingUpload !== true ? <a onClick={() => this.setState({loadingUpload: false})}>b</a>: ''} */}
                                                </div>
                                            </div>
                                            <div className="action">
                                                <div className="pull-left">
                                                    <a href="http://memeful.com" className="cmnt-reaction" target="_blank"><IconEmoji className="iconEmoji"/></a>
                                                        <a href="javascript:void(0)" onClick={()=>this.showFileUpload()} className="cmnt-reaction cmnt-image"><IconCamera className="iconEmoji" /></a>
                                                        <input type="file" name="blob" ref={this.fileUpload} onChange={this.handleFileUpload.bind(this)}  id="blob" style={{display:"none"}} />
                                                </div>
                                                <div className="pull-right">
                                                    <p className="word-count pull-left cmnt-reaction">
                                                        <span>{this.state.charCount}</span>
                                                    </p>
                                                    <a href="javascript:void(0);" onClick={() => this.PostComment()} className="cmnt-btn size-30 submit-comment">Post</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="clearfix">
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </Col>
                    </Row>
                </Container>
                {(this.props.history.action === "PUSH")? <a id="fixed_btn" onClick={() => {this.props.history.goBack()}}>Trờ về</a> : ''}
            </div>
        )
    }
}
export default ViewPage;