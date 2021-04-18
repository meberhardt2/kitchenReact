This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This project relies on kitchenExpress to serve the react files and kitchenAPI for the database interactions

dev setup:
- ubuntu multipass to create a VM
- edit hosts file to point dev.whatever.com to the VMs ip
- use HOST=0.0.0.0 npm run start in the VM to be able to access the react dev server outside VM
- after running build, move files in the www folder to the express directory on prod and/or the express directory in the VM
- api on prod can be updated with git
- express on prod can be updated with git

prod setup:
- pm2 to run express and the node api
- run both express and node api on higher ports to run as a non-root, only root can bind to lower ports
- use the firewall to port forward port 80 and 443 to our higher ports that we bind the servers to. keeps possible exploits as running as non-root
- express and node both use letsencrypt


to run a secure dev server, for now:
node_modules/react-dev-utils/webpackHotDevClient.js, line 62:
protocol: window.location.protocol === 'https:' ? 'wss' : 'ws',
