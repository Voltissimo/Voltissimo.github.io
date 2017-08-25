import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './index.css';
import './piece_images.css';

const RANKS = ['8', '7', '6', '5', '4', '3', '2', '1'];
const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];


class ChessSquare extends Component {
    render() {
        let file = this.props.tileName[0], rank = parseFloat(this.props.tileName[1]);
        let tileColor = (FILES.indexOf(file) + (rank - 1)) % 2 === 0 ? 'dark' : 'light';
        let squareClasses = [
            'square', this.props.piece, tileColor, this.props.tileStyle,
            this.props.legalMoveHighlight ? 'legalMoveHighlight' : ''
        ].filter(n => true).join(' ');

        return (
            <div className={squareClasses}
                 onClick={(e) => this.props.onSelectCallBack(this.props.tileName)}>
            </div>
        )
    }
}

ChessSquare.PropTypes = {
    tileName: PropTypes.string.isRequired,
    piece: PropTypes.string,
    tileStyle: PropTypes.string,
    legalMoveHighlight: PropTypes.bool.isRequired,
    onSelectCallBack: PropTypes.func.isRequired
};


class ChessBoard extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            selectedSquare: null
        };
    }

    onSelectSquareHandle(selectedSquare) {
        if (this.state.selectedSquare === null) {
            if (selectedSquare in this.props.legalMoves) {  // `in` works for objects
                this.setState({
                    selectedSquare: selectedSquare
                })
            }  // otherwise this.state.selectedSquare remains null
        } else {
            if (this.props.legalMoves[this.state.selectedSquare].includes(selectedSquare)) {  // but not for arrays
                // MAKE THE MOVE
                /*
                alert(`Made move ${this.state.selectedSquare} -> ${selectedSquare}`);
                */
                this.props.onMoveMadeHandle(this.props.FEN, this.state.selectedSquare, selectedSquare);
                this.setState({
                    selectedSquare: null
                })
            } else {
                if (selectedSquare in this.props.legalMoves) {  // change the piece to move
                    this.setState({
                        selectedSquare: selectedSquare
                    })
                } else {
                    this.setState({
                        selectedSquare: null
                    })
                }
            }
        }
    }

    getTileStyle(tileName) {
        return tileName === this.state.selectedSquare ? 'selected' : ''
    }

    render() {
        let legalMovesHighlight = this.state.selectedSquare !== null ?
            this.props.legalMoves[this.state.selectedSquare] : [];
        let rank_count = 0;
        let ranks = this.props.FEN.split(' ')[0].split('/').map((FEN_row) => {
            let rank = [];
            let file_count = 0;
            for (let char of FEN_row) {
                if (isNaN(parseFloat(char))) {  // a letter (a piece)
                    let tileName = `${FILES[file_count]}${RANKS[rank_count]}`;
                    rank.push(<ChessSquare tileName={tileName}
                                           piece={char}
                                           tileStyle={this.getTileStyle(tileName)}
                                           onSelectCallBack={this.onSelectSquareHandle.bind(this)}
                                           legalMoveHighlight={legalMovesHighlight.includes(tileName)}
                                           key={`${FILES[file_count]}${RANKS[rank_count]} ${char} ${this.state.selectedSquare}`}
                    />);
                    file_count++;
                } else {  // a number (empty squares)
                    let empty_squares_count = parseFloat(char);
                    while (empty_squares_count >= 1) {
                        let tileName = `${FILES[file_count]}${RANKS[rank_count]}`;
                        rank.push(<ChessSquare tileName={tileName}
                                               tileStyle={this.getTileStyle(tileName)}
                                               onSelectCallBack={this.onSelectSquareHandle.bind(this)}
                                               legalMoveHighlight={legalMovesHighlight.includes(tileName)}
                                               key={`${FILES[file_count]}${RANKS[rank_count]} ${char} ${this.state.selectedSquare}`}
                        />);
                        empty_squares_count--;
                        file_count++;
                    }
                }
            }
            rank_count++;
            return <div className="row" key={rank_count + FEN_row}>{rank}</div>
        });
        return (
            <div id="board">{ranks}</div>
        )
    }
}

ChessBoard.propTypes = {
    FEN: PropTypes.string.isRequired,
    legalMoves: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
    highlightedSquares: PropTypes.arrayOf(PropTypes.string),
    highlighted2Squares: PropTypes.arrayOf(PropTypes.string),
    onMoveMadeHandle: PropTypes.func,
};

export default ChessBoard
