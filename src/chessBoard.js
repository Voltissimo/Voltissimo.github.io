import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './index.css';

const RANKS = ['8', '7', '6', '5', '4', '3', '2', '1'];
const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];


class ChessSquare extends Component {
    render() {
        let file = this.props.tileName[0], rank = parseFloat(this.props.tileName[1]);
        let color = (FILES.indexOf(file) + (rank - 1)) % 2 === 0 ? 'black' : 'white';
        return (
            <div className={`square ${color}`}>
                <div className={`piece ${this.props.piece ? this.props.piece : ''}`}/>
            </div>
        )
    }
}

ChessSquare.PropTypes = {
    tileName: PropTypes.string.isRequired,
    piece: PropTypes.string
};


class ChessBoard extends Component {
    render() {
        let rank_count = 0;
        let ranks = this.props.FEN.split(' ')[0].split('/').map((FEN_row) => {
            let rank = [];
            let file_count = 0;
            for (let char of FEN_row) {
                if (isNaN(parseFloat(char))) {  // a letter (a piece)
                    rank.push(<ChessSquare tileName={`${FILES[file_count]}${RANKS[rank_count]}`}
                                           piece={char}
                                           key={`${FILES[file_count]}${RANKS[rank_count]} ${char}`}/>);
                    file_count++;
                } else {  // a number (empty squares)
                    let empty_squares_count = parseFloat(char);
                    while (empty_squares_count >= 1) {
                        rank.push(<ChessSquare tileName={`${FILES[file_count]}${RANKS[rank_count]}`}
                                               key={`${FILES[file_count]}${RANKS[rank_count]} 1`}/>);
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
    FEN: PropTypes.string.isRequired
};

export default ChessBoard
