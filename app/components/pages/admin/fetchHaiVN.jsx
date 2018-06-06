import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
    Container, Row, Col, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Input, Form
} from 'reactstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import {connect} from 'react-redux';
import ReactHtmlParser from 'react-html-parser';

import {handleScroll} from './../script/viewport';

class fetchHaiVN extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            trang: 1,
            viTri: 0,
            last_post_id: '',
            hasMoreItems: true,
            nextHref: null,
            categories: null,
        }
        // this.isOnScreen = this.isOnScreen.bind(this);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', handleScroll);
    }
    componentDidMount() {
        window.addEventListener('scroll', handleScroll);
        axios.post('/fetchHaiVN',
            {
                trang: this.state.trang,
                viTri: this.state.viTri
            })
            .then((res) => {
                this.setState({
                     posts: res.data.posts,
                     trang: res.data.trang,
                });
            });

    }
    loadMore(e) {
        console.log(e)
        axios.defaults.headers.get['Content-Type'] = 'application/json; charset=utf-8';
        if (e === 1)
            axios.post('/fetchHaiVN',
                {
                    trang: this.state.trang,
                    viTri: this.state.viTri
                })
                .then((res) => {
                    this.setState({
                        posts: res.data.posts,
                        trang: res.data.trang,
                   });
                });
        else
            axios(
                {
                    method: 'get',
                    url: '/fetchHaiVN/loadMore/' + this.state.trang,
                    timeout: 10000,
                })
                .then((res) => {
                    let old_posts = this.state.posts;
                    let new_posts = old_posts.concat(res.data.posts);
                    this.setState({
                        posts: new_posts,
                        trang: res.data.trang,
                   });
                });
    }
    luuAnh(item, e) {
        e.preventDefault(); // Let's stop this event.
        e.stopPropagation(); // Really this time.
        var video = null;
        var nsfw = 0;
        item.title = ReactHtmlParser(item.title);
        if(item.categories.indexOf("5b13e8318ef25b0bfa05c104") !== -1)
        {
            nsfw = 1;
        }
        if(item.categories.indexOf("5b1373438ef25b0bfa05ab50") !== -1)
            {
                video =  {
                    url: item.images.image460sv.h265Url,
                    duration: item.images.image460sv.duration,
                    hasAudio: item.images.image460sv.hasAudio,
                    height: item.images.image460sv.height,
                    width: item.images.image460sv.width
                }
            }
        axios.post('/luuAnh', {
            'id': item.id,
            'sourceUrl': 'https://9gag.com/gag/'+item.id,
            'title': item.title[0],
            'newTitle': item.newTitle,
            'categories': item.categories,
            'image': {url: item.images.image460.webpUrl,
                        height: item.images.image460.height,
                        width: item.images.image460.width},
            'video': video,
            'nsfw': nsfw,
            'upVote': 1000,
            'status': 'Hot'
        })
            .then((res) => {
                if(res.data.error)
                {
                    alert(res.data.error)
                }else
                console.log(res)
            });

    }
    render() {
        var data = this.state.posts;
        console.log(data);
        var Html = null;
        var categories = this.props.state.Categories;
        const loader = <div className="loader">Loading ...</div>;
        if (data !== null) {
            Html = data.map((item, index) => {
                if(item){
                if(categories !== null){
                    var MangCategories = categories.map((i, stt) => {
                        item["categories"] = [];
                       
                        return (
                            <label key={stt} className="btn btn-primary margin-left-right-5"><Input  ref={item.id + '_' + i._id} id={item.id + '_' + i._id} onChange={(e) => {item["categories"].push(i._id); console.log(item)}}  addon type="checkbox" aria-label="Checkbox for following text input"/>{i.categoryName}</label>
                        )
                    })}
               
                    var img = (<CardImg className="post-content center" top width="100%" src={item.src} alt={item.title} />)
                return (
                    <form key={item.id + index} onSubmit={(e) => { this.luuAnh(item, e) }}>
                  
                    <Card className="margin-top-bottom-5">
                        <h3 className="margin-top-bottom-5">{ ReactHtmlParser(item.title) }</h3>
                        {img}
                        <CardBody>
                            <h4>Nhập tựa đề mới</h4>
                            <input type="text" className="form-control margin-top-bottom-5" onChange={(e) => { item.newTitle = e.target.value }} />
                                {MangCategories}
                            <Button className="margin-top-bottom-5">Đăng Lên Trang Chủ</Button>
                        </CardBody>
                    </Card>
                    
                    </form>
                )
            }})
        }
        return (
            <Container>
                <Row>
                    <Col xs="12" sm="8" lg="8">
                        <InfiniteScroll
                            dataLength={this.state.posts.length} //This is important field to render the next data
                            pageStart={0}
                            next={this.loadMore.bind(this)}
                            hasMore={true}
                            loader={<div className="fullWidth margin-top-bottom-5"><div className="loader center" onClick={this.loadMore.bind(this)}></div></div>}
                            scrollThreshold={0.9}
                            endMessage={
                                <p style={{ textAlign: 'center' }}>
                                    <b>Yay! You have seen it all</b>
                                </p>
                            }>
                            {Html}
                        </InfiniteScroll>
                    </Col>
                    <Col xs="12" sm="4" lg="4">
                        {/* {BatTu} */}
                    </Col>
                </Row>
            </Container>
        )
    }
}
const mapStateToProps = state => {
    return {
        'state' : state
    }
}

export default connect(mapStateToProps, null)(fetchHaiVN);