import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

import MainLayout from './components/MainLayout';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={MainLayout} />
  </Router>,
  document.getElementById('app'),
);
