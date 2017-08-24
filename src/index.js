import React from 'react';
import ReactDOM from 'react-dom';
import ChessApp from './chessApp';
import registerServiceWorker from './registerServiceWorker';



ReactDOM.render(
    <ChessApp FEN="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"/>,
    document.getElementById('root')
);
registerServiceWorker();
