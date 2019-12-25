import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import 'react-notifications/lib/notifications.css';
import 'css/bootstrap.min.css';
import 'css/style.css';

import App from 'app';

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('root')
);
