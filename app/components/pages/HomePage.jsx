import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { StickyContainer, Sticky } from 'react-sticky';
import Post from './includes/Post.jsx';
import { handleScroll } from './script/viewport';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Container, Row, Col, Button } from 'reactstrap';
class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trang: 1,
            posts: [],
            hasMore: true
        }
    }
    componentDidMount() {
        window.addEventListener('scroll', handleScroll);
        axios.get('/loadMore/' + this.state.trang)
            .then((res) => {
                if (res.error) {
                    alert('Không lấy được giữ liệu vu lòng bấm F5!');
                }
                else {
                    this.setState({
                        posts: res.data.posts,
                        trang: res.data.trang,
                    });
                }
            });

    }
    loadMore(e) {
        axios(
            {
                method: 'get',
                url: '/loadMore/' + this.state.trang,
                timeout: 10000,
            })
            .then((res) => {
                let old_posts = this.state.posts;
                let new_posts = old_posts.concat(res.data.posts);
                if (res.data.posts.length === 0) {
                    this.setState({ hasMore: false })
                }
                else {
                    this.setState({
                        posts: new_posts,
                        trang: res.data.trang,
                    });
                }
            }).catch((err) => {
                console.log(err);
                if (err.code == 'ECONNABORTED') {
                    document.getElementById("loadMore").innerHTML('<Button className="btn btn-primary margin-left-right-5">Click Để Xem Thêm</Button>')
                }
            })
            ;
    }
    render() {
        return (
            <div className="main-content">
               <Container>
                <Row>
                    <Col  xs="0" sm="2"></Col>
                    <Col  xs="12" sm="6">
                    <InfiniteScroll
                        dataLength={this.state.posts.length} //This is important field to render the next data
                        pageStart={0}
                        next={this.loadMore.bind(this)}
                        hasMore={this.state.hasMore}
                        loader={<div className="fullWidth margin-top-bottom-5"><div className="loader center" id="loadMore" onClick={this.loadMore.bind(this)}></div></div>}
                        scrollThreshold={0.9}
                        style={{overflow:"none"}}
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                                <Button>Bạn Thật Tuyệt Vời! Đã xem hết ảnh luôn !!!</Button>
                            </p>
                        }>
                        {this.state.posts.map(item => <Post id={item._id} key={item._id} images={item.images} name={item.titles.vn} />)}
                    </InfiniteScroll>
                    </Col>
                    <Col  xs="12" sm="4">
                    </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return { items: state }
}

const mapDispatchToProps = dispatch => ({
    Dang_Nhap: (user) => dispatch({ type: 'DANG_NHAP', username: user }),
    Dang_xuat: () => dispatch({ type: 'DANG_XUAT', username: 'ok da dang xuat' })
})
export default connect(mapDispatchToProps, mapDispatchToProps)(HomePage);