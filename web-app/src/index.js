import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import App from './App';
import './styled';
import '!style-loader!css-loader!react-big-calendar/lib/css/react-big-calendar.css';
import '!style-loader!css-loader!react-datepicker/dist/react-datepicker.css';
import '!style-loader!css-loader!react-day-picker/lib/style.css';
import '!style-loader!css-loader!react-table/react-table.css';

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('app'));
