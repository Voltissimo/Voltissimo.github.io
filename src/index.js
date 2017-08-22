import React from 'react';
import ReactDOM from 'react-dom';
import ChessBoard from './chessBoard';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ChessBoard FEN="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"/>, document.getElementById('root'));
registerServiceWorker();
