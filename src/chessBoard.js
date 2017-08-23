import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './index.css';

const RANKS = ['8', '7', '6', '5', '4', '3', '2', '1'];
const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];


function pieceNameToUrl(pieceName) {
    switch (pieceName) {
        case 'p':
            return "https://upload.wikimedia.org/wikipedia/commons/c/cd/Chess_pdt60.png";
        case 'P':
            return "https://upload.wikimedia.org/wikipedia/commons/0/04/Chess_plt60.png";
        case 'b':
            return "https://upload.wikimedia.org/wikipedia/commons/8/81/Chess_bdt60.png";
        case 'B':
            return "https://upload.wikimedia.org/wikipedia/commons/9/9b/Chess_blt60.png";
        case 'n':
            return "https://upload.wikimedia.org/wikipedia/commons/f/f1/Chess_ndt60.png";
        case 'N':
            return "https://upload.wikimedia.org/wikipedia/commons/2/28/Chess_nlt60.png";
        case 'r':
            return "https://upload.wikimedia.org/wikipedia/commons/a/a0/Chess_rdt60.png";
        case 'R':
            return "https://upload.wikimedia.org/wikipedia/commons/5/5c/Chess_rlt60.png";
        case 'q':
            return "https://upload.wikimedia.org/wikipedia/commons/a/af/Chess_qdt60.png";
        case 'Q':
            return "https://upload.wikimedia.org/wikipedia/commons/4/49/Chess_qlt60.png";
        case 'k':
            return "https://upload.wikimedia.org/wikipedia/commons/e/e3/Chess_kdt60.png";
        case 'K':
            return "https://upload.wikimedia.org/wikipedia/commons/3/3b/Chess_klt60.png";
        default:
            return;
    }
}

class ChessSquare extends Component {
    render() {
        let file = this.props.tileName[0], rank = parseFloat(this.props.tileName[1]);
        let color = (FILES.indexOf(file) + (rank - 1)) % 2 === 0 ? 'saddlebrown' : 'wheat';
        return (
            <div className="square"
                 style={{backgroundColor: color, backgroundImage: `url(${pieceNameToUrl(this.props.piece)})`}}
                 onClick={(e) => this.props.onSelectCallBack(this.props.tileName)}>
                <div className={this.props.tileStyle + ' innerSquare'}/>
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
