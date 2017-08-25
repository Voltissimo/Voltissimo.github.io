import React from 'react';
import ReactDOM from 'react-dom';
import ChessApp from './chessApp';
import registerServiceWorker from './registerServiceWorker';



ReactDOM.render(
    <ChessApp/>,
    document.getElementById('root')
);
registerServiceWorker();
