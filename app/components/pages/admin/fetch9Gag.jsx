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

class fetch9Gag extends Component {
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
    }

    componentDidMount() {
        axios.post('/fetch9Gag',
            {
                trang: this.state.trang,
                viTri: this.state.viTri
            })
            .then((res) => {
                this.setState({
                    posts: res.data,
                    last_post_id: `${res.data[res.data.length - 1].id},${res.data[res.data.length - 2].id},${res.data[res.data.length - 3].id}`
                });
            });

    }
    htmlRender() {
        return (<h5>ok</h5>)
    }
    loadMore(e) {
        console.log(e)
        axios.defaults.headers.get['Content-Type'] = 'application/json; charset=utf-8';
        if (e === 1)
            axios.post('/fetch9Gag',
                {
                    trang: this.state.trang,
                    viTri: this.state.viTri
                })
                .then((res) => {
                    this.setState({
                        posts: res.data,
                        last_post_id: `${res.data[res.data.length - 1].id},${res.data[res.data.length - 2].id},${res.data[res.data.length - 3].id}`
                    });
                });
        else
            axios(
                {
                    method: 'get',
                    url: '/fetch9Gag/loadMore/' + this.state.last_post_id,
                })
                .then((res) => {
                    let old_posts = this.state.posts;
                    let new_posts = old_posts.concat(res.data.data.posts);
                    this.setState({
                        posts: new_posts,
                        last_post_id: `${res.data.data.posts[res.data.data.posts.length - 1].id},${res.data.data.posts[res.data.data.posts.length - 2].id},${res.data.data.posts[res.data.data.posts.length - 3].id}`
                    })
                });
    }
    luuAnh(item, e) {
        e.preventDefault(); // Let's stop this event.
        e.stopPropagation(); // Really this time.
        // const name = ReactDOM.findDOMNode(this.refs.aoNLg5e_5b1373348ef25b0bfa05ab43)
        console.log(item)
        var video = null;
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
        console.log(video);
        axios.post('/luuAnh', {
            'title': item.title[0],
            'newTitle': item.newTitle,
            'categories': item.categories,
            'image': {url: item.images.image460.webpUrl,
                        height: item.images.image460.height,
                        width: item.images.image460.width},
            'video': video
        })
            .then((res) => {

            });

    }
    render() {
        var data = this.state.posts;
        var Html = null;
        var categories = this.props.state.Categories;
        const loader = <div className="loader">Loading ...</div>;
        if (data !== null) {
            Html = data.map((item, index) => {
                if(categories !== null){
                    var MangCategories = categories.map((i, stt) => {
                        item["categories"] = [];
                        return (
                            <span key={stt}><Input  ref={item.id + '_' + i._id} id={item.id + '_' + i._id} onChange={(e) => {item["categories"].push(i._id); console.log(item)}}  addon type="checkbox" aria-label="Checkbox for following text input" />{i.categoryName}</span>
                        )
                    })}
                if (item.type === "Animated") {
                    var img = (
                        <video width="320" height="240" controls>
                            <source src={item.images.image460sv.url} type="video/mp4" />
                            Your browser does not support the video tag.
                    </video>
                    )
                } else {
                    var img = (<CardImg top width="100%" src={item.images.image460.url} alt={item.title} />)
                }
                return (
                    <form key={item.id + index} onSubmit={(e) => { this.luuAnh(item, e) }}>
                    <Card className="margin-top-bottom-5">
                        <h3 className="margin-top-bottom-5">{ ReactHtmlParser(item.title) }</h3>
                        {img}
                        <CardBody>
                            <input type="text" onChange={(e) => {item.title = ReactHtmlParser(item.title); item.newTitle = e.target.value }} />
                            <CardSubtitle>Test</CardSubtitle>
                                {MangCategories}
                            <Button >Button</Button>
                        </CardBody>
                    </Card>
                    </form>
                )
            })
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
                            loader={<h4 onClick={this.loadMore.bind(this)}>Loading...</h4>}
                            scrollThreshold={0.5}
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

export default connect(mapStateToProps, null)(fetch9Gag);