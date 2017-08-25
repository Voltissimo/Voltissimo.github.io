import 'whatwg-fetch';
import React, {Component} from 'react';
/*import PropTypes from 'prop-types';*/
import ChessBoard from "./chessBoard";
import './index.css';

const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const boardProcessorUrl = "https://deliboarate.herokuapp.com/position";


export default class ChessApp extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            history: [],
            currentBoardIndex: -1,
        }
    }

    componentDidMount() {
        fetch(proxyUrl + boardProcessorUrl + "?fen=startpos", {
            method: "GET"
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    history: this.state.history.concat(data),  // this.state.history is an empty list though
                    currentBoardIndex: 0
                });
            })
            .catch((e) => alert(e))
    }

    makeMove(currentFEN, currentSquare, destinationSquare) {
        fetch(proxyUrl + boardProcessorUrl + `?fen=${currentFEN}&m=${currentSquare}${destinationSquare}`, {method: "GET"})
            .then(response => response.json())
            .then(data => this.setState({
                history: this.state.history.concat(data),
                currentBoardIndex: this.state.currentBoardIndex + 1
            }))
    }

    render() {
        let currentBoard = this.state.history[this.state.currentBoardIndex];
        console.log(currentBoard);
        if (currentBoard === undefined) {
            currentBoard = {fen: "8/8/8/8/8/8/8/8", moves: {}};
        }
        return (
            <div id="app_wrapper">
                <ChessBoard FEN={currentBoard["fen"]} legalMoves={currentBoard["moves"]} onMoveMadeHandle={this.makeMove.bind(this)}/>
                <RightPanel/>
            </div>)
    }
}


// Display like lichess: top right => history, bottom right => captured pieces
// ahem not sure lichess does it that way
// TODO do this
class RightPanel extends Component {
    render() {
        return (
            <div id="right_panel">
                <MoveHistory/>
                <CapturedPieces/>
            </div>
        )
    }
}


class MoveHistory extends Component {
    constructor() {
        super();
        this.state = {
            moves: {
                white: [],
                black: []
            }
        }
    }

    /*onMoveMade(moveString, side) {
        this.state.moves[side].push(moveString);  // STATE SHOULD BE TREATED AS *IMMUTABLE*
    }*/

    render() {
        return (
            <div id="move_history_panel">
                Move history panel
            </div>
        )
    }
}


class CapturedPieces extends Component {
    constructor() {
        super();
        this.state = {
            capturedPieces: []
        }
    }

    /*onPieceCapture(pieceLetter) {
        this.state.capturedPieces.push(pieceLetter);  // IMMUTABLE.
    }*/

    render() {
        return (
            <div id="captured_pieces_panel">
                Captured pieces !
            </div>
        )
    }
}

