import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import Login from './Login';
import SignUp from './SignUp';
import LogInSignUpStyle from "./assets/logSignUp.css"

class LogInSignUp extends Component {
    render() {
        return (
            <div className="logSignUp-div">
                <Tabs>
                    <TabList>
                        <Tab>Log In</Tab>
                        <Tab>Sign Up</Tab>
                    </TabList>
                    <TabPanel>
                        <Login webSocket={this.props.webSocket} />
                    </TabPanel>
                    <TabPanel>
                        <SignUp webSocket={this.props.webSocket} />
                    </TabPanel>
                </Tabs>
            </div>
        )
    }
}

export default LogInSignUp