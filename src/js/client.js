import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import MainLayout from './components/MainLayout.jsx';

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={MainLayout}>
		</Route>
	</Router>,
	document.getElementById("app")
	)