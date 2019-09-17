import React, { Component } from 'react';
import '../App.css';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            turn: "X",
            gameEnd: false,
            board: Array(9).fill(""),
            winner: "",
            draw: 0,
            xScore: 0,
            oScore: 0

        }
    }

    clicked(e) {
        console.log(e.target)
        if (this.state.gameEnd) {
            return;
        }
        if (this.state.board[e.target.dataset.square] == "") {
            this.state.board[e.target.dataset.square] = this.state.turn;
            e.target.innerText = this.state.turn;

            this.setState({
                turn: this.state.turn == "X" ? "O" : "X",
                board: this.state.board,
            })
            const ws = new WebSocket('ws://localhost:6969/ws');
            
            ws.onmessage = (message) => {
              const data = JSON.parse(message.data);
              const newMessages = this.state.messages.slice(); // copy 
              newMessages.push(data.message);
              this.setState({
                messages: newMessages,
              });
              console.log(data);
            };
        
            ws.onclose = () => {
              console.log('socket closed :(');
            };
            console.log(this.state.board)
            console.log(this.state.board[e.target.dataset.square])
            console.log(e.target.dataset.square)
            this.state.draw++;
            //this.Winner();
        }

        console.log(this.state.draw)
        var result = this.Winner();
        if (result == "X") {
            this.setState({
                gameEnd: true,
                winner: "X",
                line: "X won",
            });
            this.state.xScore++
        }
        else if (result == "O") {
            this.setState({
                gameEnd: true,
                winner: "O",
                line: "O won",
            });
            this.state.oScore++
        }
        else if (result == "draw") {
            this.setState({
                gameEnd: true,
                winner: "draw",
                line: "Draw"
            });
        }
    }

    Winner() {
        let moves = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7],
        [2, 5, 8], [0, 4, 8], [2, 4, 6]];

        for (let i = 0; i < moves.length; i++) {
            const [a, b, c] = moves[i];
            if (this.state.board[a] && this.state.board[a] == this.state.board[b] && this.state.board[a] == this.state.board[c] && this.state.board[b] == this.state.board[c])
                return this.state.board[a];
        }

        if (this.state.draw == 9) {
            return "draw";
        }
    }

    resetClick() {
        //var clear = this.clicked()
        //clear = this.state.board[target.dataset.square]
        //need to set state for board[e.target.dataset.square] to null
        if (this.state.gameEnd == true) {
            document.getElementById("rbox1").innerHTML = "";
            document.getElementById("rbox2").innerHTML = "";
            document.getElementById("rbox3").innerHTML = "";
            document.getElementById("r2box1").innerHTML = "";
            document.getElementById("r2box2").innerHTML = "";
            document.getElementById("r2box3").innerHTML = "";
            document.getElementById("r3box1").innerHTML = "";
            document.getElementById("r3box2").innerHTML = "";
            document.getElementById("r3box3").innerHTML = "";

            this.setState({
                board: Array(9).fill(""),
                turn: "X",
                gameEnd: false,
                winner: "",
                line: "",
                draw: 0
            })

            console.log(this.state.board)
        }
    }


    render() {
        let status;
        if (!this.state.gameEnd) {
            status = "Next player: " + (this.state.turn != "X" ? "O" : "X");
        }
        return (
            <div className="TicTacToe App">
                <header className="App-header">
                    <div id="heading_text" className=" heading-text">
                        <h1 id="heading_content"> Tic Tac Toe</h1>
                    </div>
                    <div className="status">{status}</div>
                    <div id="end">{this.state.line}</div>
                    <div className="container">
                        <div id="board" onClick={(e) => this.clicked(e)}>
                            <div id="row1" className="row">
                                <div id="rbox1" className="row-box" data-square="0"></div>
                                <div id="rbox2" className="row-box" data-square="1"></div>
                                <div id="rbox3" className="row-box" data-square="2"></div>
                            </div>
                            <div id="row2" className="row">
                                <div id="r2box1" className="row-box" data-square="3"></div>
                                <div id="r2box2" className="row-box" data-square="4"></div>
                                <div id="r2box3" className="row-box" data-square="5"></div>
                            </div>
                            <div id="row3" className="row">
                                <div id="r3box1" className="row-box" data-square="6"></div>
                                <div id="r3box2" className="row-box" data-square="7"></div>
                                <div id="r3box3" className="row-box" data-square="8"></div>
                            </div>

                        </div>
                    </div>
                    <div id="xScore"> {"player X: " + this.state.xScore}</div>
                    <div id="oScore">{"player O: " + this.state.oScore} </div>
                    <div className="reset" id="board" onClick={() => { this.resetClick() }}>Reset
                    </div>
                </header>
            </div>
        );
    }
}

export default Game;