import React, { Component } from 'react';
import './assets/Rooms.css'
import Game from './Game'

class Rooms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numberOfRooms: [1],
            showGame: false,
            user: "",
        }
    }

    componentDidMount() {
        let { user } = this.props;
        this.setState({
            user: user,
        }) 
    }

    joinRoom = e => {
        let id = e.target.id;
        let { user } = this.props;
        let obj = {
            id: id,
            user: user
        }

        obj = JSON.stringify(obj);
        this.props.webSocket.send(obj);
        this.setState({
            showGame: true,
        })
    }

    render() {
        console.log(this.state.numberOfRooms)
        let { numberOfRooms, showGame } = this.state;
        let index = 1;
        return (
            <div>
                <table>
                    <tbody>
                        {!showGame && numberOfRooms.map((roomNum, i) => {
                            return (
                                <tr key={i} className="row">
                                    <td key={index}>
                                        <div id="One" onClick={this.joinRoom} className="Rooms">
                                            Room {index++}
                                        </div>
                                    </td>
                                    <td key={index}>
                                        <div id="Two" onClick={this.joinRoom} className="Rooms">
                                            Room {index++}
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                {showGame && <Game />}
            </div>
        );
    }
}

export default Rooms;