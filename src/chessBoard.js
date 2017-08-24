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
            'square', this.props.piece, tileColor, this.props.tileStyle
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
    onSelectCallBack: PropTypes.func.isRequired
};


class ChessBoard extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            selectedSquare: null
        }
    }

    onSelectSquareHandle(selectedSquare) {
        this.setState({
            selectedSquare: selectedSquare
        })
    }

    getTileStyle(tileName) {
        return tileName === this.state.selectedSquare ? 'selected' : ''
    }

    render() {
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
    highlightedSquares: PropTypes.arrayOf(PropTypes.string),
    highlighted2Squares: PropTypes.arrayOf(PropTypes.string)
};

export default ChessBoard
