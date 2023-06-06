import React, { Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';
import 'css/bootstrap.min.css';
import 'css/style.css';

import App from 'app';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Fragment>
    	<App />
		<ToastContainer theme="dark" position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick />
	</Fragment>
);
