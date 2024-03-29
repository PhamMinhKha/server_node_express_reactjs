import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, withRouter } from "react-router-dom";
import { Container, Row, Col, Input, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap';
import qs from 'qs';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            message: ''
        }
    }
    onChange(e) {
        let control = e.target.name;
        this.setState(...this.state, {
            [control]: e.target.value
        })
        console.log(this.state);
    }
    onSubmit(e) {
        e.preventDefault();
        var bodyFormData = new FormData();
        bodyFormData.append('username', this.state.username);
        // bodyFormData.set('password', this.state.password);
        const data = this.state;
        const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(this.state),
        url: '/login',
        // config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
        };
        axios(options).then((data)=>{
            var {message, username, quyen_hang, token, id, avatar} = data.data.detail;
            if(message === true){
                let user = {username, permission: quyen_hang, id, avatar};
                this.props.Dang_Nhap(user);
                localStorage.setItem('Login', token);
                this.props.history.push('/');
            }
            else this.setState({
                message
            })

        });
    }
    componentDidMount = () =>{
        document.title = "Đăng nhập"
        console.log(this.props)
    }
    render() {
        return (
            <Container>
                <Row >
                    <Col sm="5" className="div-center">
                    <div>
                    <Card>
                        <CardBody>
                        <h1>Đăng Nhập</h1>
                        <form method="post" action="/login">
                            <span style={{color:"red"}}> {this.state.message} </span>
                            <input type="text" name="username" autoComplete="off" value={this.state.txtUserName} className="form-control margin-top-bottom-5" onChange={this.onChange.bind(this)} />
                            <input type="password" name="password" autoComplete="off" value={this.state.txtPassWord} className="form-control margin-top-bottom-5" onChange={this.onChange.bind(this)} />
                            <Button color="success" onClick={this.onSubmit.bind(this)}>Đăng Nhập</Button>
                            <Link className="pull-right" to="/register"> Đăng Ký Tài Khoản Mới </Link>
                            <a className="pull-right" href="/auth/facebook"> Đăng Nhập Facebook </a>
                        </form>
                        <CardSubtitle className="margin-top-bottom-5">Bạn đăng nhập không thành công?</CardSubtitle>
                        <Link to="/forgotpassword">Bấm vào đây để lấy lại mật khẩu</Link>
                        
                        </CardBody>
                    </Card>
                        
                        
                    </div></Col>
                </Row>
            </Container>

        )
    }
}
const mapStateToProps = state => {
    return { items: state }
}

const mapDispatchToProps = dispatch => ({
    Dang_Nhap: (user) => dispatch({ type: 'DANG_NHAP', user: user }),
    Dang_xuat: () => dispatch({ type: 'DANG_XUAT', username: 'ok da dang xuat' })
})
export default withRouter(connect(mapDispatchToProps, mapDispatchToProps)(LoginPage));