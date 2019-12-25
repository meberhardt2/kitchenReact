import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';
import 'css/bootstrap.min.css';
import 'css/style.css';

import App from 'app';

toast.configure({
	autoClose: 3000,
	draggable: false,
	hideProgressBar: true
});

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('root')
);
