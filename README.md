This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This project relies on kitchenExpress to serve the react files and kitchenAPI for the database interactions

dev setup:
- ubuntu multipass to create a VM
- edit hosts file to point dev.whatever.com to the VMs ip
- add HOST=0.0.0.0 to the .env file so react dev server can be access remotely (outside the vm)
- ssl can be toggled on and off in the .env. when requesting access to the camera, it only works on https by browser decree
- after running build, move files in the www folder to the express directory on prod and/or the express directory in the VM
- api on prod can be updated with git
- express on prod can be updated with git

prod setup:
- pm2 to run express and the node api
- run both express and node api on higher ports to run as a non-root, only root can bind to lower ports
- use the firewall to port forward port 80 and 443 to our higher ports that we bind the servers to. keeps possible exploits as running as non-root
- express and node both use letsencrypt


to run a secure dev server, for now:
HTTPS=true in .env
