import 'whatwg-fetch';
import React, {Component} from 'react';
/*import PropTypes from 'prop-types';*/
import ChessBoard from "./chessBoard";
import './index.css';


export default class ChessApp extends Component {
    // TODO this.state to track game progress (right now it's only startpos)
    render() {
        // TODO (find a way to) fetch the data from heroku server
        const fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
        const legalMoves = {
            a2: [
                "a3",
                "a4"
            ],
            b1: [
                "c3",
                "a3"
            ],
            b2: [
                "b3",
                "b4"
            ],
            c2: [
                "c3",
                "c4"
            ],
            d2: [
                "d3",
                "d4"
            ],
            e2: [
                "e3",
                "e4"
            ],
            f2: [
                "f3",
                "f4"
            ],
            g1: [
                "h3",
                "f3"
            ],
            g2: [
                "g3",
                "g4"
            ],
            h2: [
                "h3",
                "h4"
            ]
        };
        return (
            <div id="app_wrapper">
                <ChessBoard FEN={fen} legalMoves={legalMoves}/>
                <RightPanel/>
            </div>)
        /*return fetch("deliboarate.herokuapp.com/position?fen=startpos")
            .then(response => response.json())
            .then(json => {
                let chessBoard = JSON.parse(json);
                return (
                    <div id="app_wrapper">
                        <ChessBoard FEN={chessBoard["fen"]} legalMoves={chessBoard["moves"]}/>
                        <RightPanel/>
                    </div>
                )
            }).catch(e => console.log('failed', e))*/
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

