import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ChessBoard from "./chessBoard";
import './index.css';



export default class ChessApp extends Component {
    render() {
        return (
            <div id="app_wrapper">
                <ChessBoard FEN={this.props.FEN}/>
                <RightPanel/>
            </div>
        )
    }
}

ChessApp.PropTypes = {
    FEN: PropTypes.string
};


// Display like lichess: top right => history, bottom right => captured pieces
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

    onMoveMade(moveString, side) {
        this.state.moves[side].push(moveString);
    }

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

    onPieceCapture(pieceLetter) {
        this.state.capturedPieces.push(pieceLetter);
    }

    render() {
        return (
            <div id="captured_pieces_panel">
                Captured pieces !
            </div>
        )
    }
}

