import React, { Component } from 'react';
import axios from 'axios';
import {
    Container, Row, Col, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

class fetch9Gag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: null,
            trang: 1,
            viTri: 0,
            last_post_id: ''
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
                    posts: res
                })
            });
    }
    htmlRender() {
        return (<h5>ok</h5>)
    }
    luuAnh(item, e) {
        e.preventDefault(); // Let's stop this event.
        e.stopPropagation(); // Really this time.
        console.log(item);
        axios.post('/luuAnh', {
            'title': item.title,
            'newTitle': item.newTitle,
            'img': item.img
        })
            .then((res) => {

            });

    }
    render() {
        var data = this.state.posts;
        var Html = null;
        if (data !== null) {
            data = data.data;
            Html = data.map((item, index) => {
                return (
                    <Card key={index} className="margin-top-bottom-5">
                        <h3 className="margin-top-bottom-5">{item.title}</h3>
                        <CardImg top width="100%" src={item.images.image460.url} alt={item.title} />
                        <CardBody>
                            <input type="text"  onChange={(e)=>{item.newTitle = e.target.value}} />
                            <CardSubtitle>Card subtitle</CardSubtitle>
                            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                            <Button onClick={(e) => { this.luuAnh(item, e) }}>Button</Button>
                        </CardBody>
                    </Card>

                )
            })
        }
        return (
            <Container>
                <Row>
                    <Col xs="12" sm="8" lg="8">
                        <div id="posts">
                            {Html}
                        </div>
                    </Col>
                    <Col xs="12" sm="4" lg="4">Side bar</Col>
                </Row>
            </Container>
        )
    }
}
export default fetch9Gag;