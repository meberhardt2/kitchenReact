This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This project relies on kitchenExpress to serve the react files and kitchenAPI for the database interactions

Express looks for files in the build folder, changing soon

to run a secure dev server, for now:
node_modules/react-dev-utils/webpackHotDevClient.js, line 62:
protocol: window.location.protocol === 'https:' ? 'wss' : 'ws',
