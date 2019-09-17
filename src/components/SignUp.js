import React, { Component } from 'react'
import LoginStyle from './assets/login.css'
import axios from 'axios'
import Login from './Login'

//register
class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            create_username: '',
            create_password: '',
            verify_password: '',
        }
    }
    updateUsername = e => {
        console.log(this.state);
        const username = e.target.value;
        this.setState({
            create_username: username, 
        })
    }
    updatePassword = e => {
        console.log(this.state);
        const password = e.target.value;
        this.setState({
            create_password: password, 
        })
        console.log(this.state);
    }
    updatePasswordMatch = e => {
        console.log(this.state);
        const passwordMatch= e.target.value;
        this.setState({
            verify_password: passwordMatch, 
        })
    }
    onSubmitClicked = e => {
        //Check for all the values if entered
        if (this.state.create_username.length > 0 && this.state.create_password.length > 0 && this.state.create_password === this.state.verify_password) {
            var users = {
                "Create_Username": this.state.create_username,
                "Create_Password": this.state.create_password,
                "Verify_Password": this.state.verify_password,
            }
            console.log("Line 46");
            axios.post("/register", users)
                .then((res) => {
                    let data = res.data;                    
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        else {
            console.log("Incorrect username or password");
        }
    }

    render() {
        return (
            <div>
                <div className="login-div">
                    <h1>Sign Up</h1>
                    <form>
                        <div className="inputs">
                            <label>
                                <input type="text"
                                    name="username"
                                    placeholder="Create_Username" onChange={this.updateUsername} />

                                <br></br>
                                <input type="password"
                                    name="password"
                                    placeholder="Create_Password" onChange={this.updatePassword} />
                                <br></br>
                                <input type="password"
                                    name="verify_password"
                                    placeholder="Verify_Password" onChange={this.updatePasswordMatch} />
                            </label>
                            <input type="submit"
                                name="submit"
                                className="submit-button"
                                value="Sign Up" onClick={this.onSubmitClicked} />
                        </div>
                    </form>
                </div>
            </div>

        )
    }
}

export default SignUp
