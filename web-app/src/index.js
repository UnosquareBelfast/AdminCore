import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styled';
import '!style-loader!css-loader!react-big-calendar/lib/css/react-big-calendar.css';
import '!style-loader!css-loader!react-datepicker/dist/react-datepicker.css';
import '!style-loader!css-loader!react-day-picker/lib/style.css';

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
