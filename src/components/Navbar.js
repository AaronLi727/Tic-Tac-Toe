import React, {Component} from "react"

class Navbar extends Component{
    render(){
        return(
            <div className="navbar-div">
                <nav>
                    <ul>
                        <li><a href="">Home</a></li>
                        <li><a href="">Game</a></li>
                        <li><a href="">Sign Up</a></li>
                        <li><a href="">Sign In</a></li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default Navbar