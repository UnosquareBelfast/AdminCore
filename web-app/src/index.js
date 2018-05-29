import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styled';
import '!style-loader!css-loader!react-big-calendar/lib/css/react-big-calendar.css';

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
