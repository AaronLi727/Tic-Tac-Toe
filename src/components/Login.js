    
import React, { Component } from "react";
import axios from 'axios';
import LoginStyle from "./assets/login.css";
import Rooms from "./Rooms";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            username: '',
            password: ''
        }
    }

    updateUsername = e => {
        const username = e.target.value;
        this.setState({
            username: username,
        })
    }

    updatePassword = e => {
        const password = e.target.value;
        this.setState({
            password: password,
        })
    }

    logIn = e => {
        const login = e.target.value;
        this.setState({
            isLoggedIn: true,
        })
    }

    onLoginClicked = e => {
        e.preventDefault();
        e.stopPropagation();
        let { username, password } = this.state;
        let users = { username, password };

        axios.post('/login', users)
            .then(res => {
                console.log(res.data);
                let responseData = res.data;
                if(responseData == "IS_LOGGED_IN") {
                    // do something with logging in                
                    this.setState({
                        isLoggedIn: true,
                    })
                }
                else if(responseData == "NOT_LOGGED_IN") {
                    this.setState({
                        isLoggedIn: false,
                    })
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        let { isLoggedIn } = this.state;
        let ws = this.props.ws;
        return (
            <div>
                {!isLoggedIn && <div className="login-div">
                    <h1>Login</h1>
                    <form>
                        <div className="inputs">
                            <label>
                                <input type="text"
                                    name="username"
                                    placeholder="Username" onChange={this.updateUsername} />
                                <br></br>
                                <input type="password"
                                    name="password"
                                    placeholder="Password" onChange={this.updatePassword} />
                            </label>
                            <input
                                type="submit"
                                name="submit"
                                className="submit-button"
                                value="Log In" onClick={this.onLoginClicked} />
                        </div>
                    </form>
                </div>}
                {isLoggedIn && <Rooms webSocket={this.props.webSocket} user={this.state.username} />}
            </div>
        )
    }
}

export default Login