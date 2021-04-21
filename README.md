This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This project relies on kitchenExpress to serve the react files and kitchenAPI for the database interactions

dev setup:
- ubuntu multipass to create a VM
- edit hosts file on dev machine to point dev.whatever.com to the VMs ip
- add HOST=0.0.0.0 to the .env file so react dev server can be access remotely (outside the vm)
- ssl can be toggled on and off in the .env. when requesting access to the camera, it only works on https by browser decree
- after running build, move files in the www folder to the express directory
- api on prod can be updated with git
- express on prod can be updated with git

prod setup:
- pm2 to run express and the node api
- run both express and node api on higher ports to run as a non-root, only root can bind to lower ports
- use the firewall to port forward port 80 and 443 to our higher ports that we bind the servers to. keeps possible exploits as running as non-root
- express and node both use letsencrypt

pm2
- to generate the startup script, pm2 startup. it provides the command root must run for it to start on boot
- make sure to run "pm2 save" when all the processes are running, then when it starts on boot it will also fire up those processes

dump firewall rules in rc.local to direct lower system ports 80/443 to our higher non-root ports
iptables -A INPUT -i eth0 -p tcp --dport 80 -j ACCEPT
iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 2002
iptables -A INPUT -i eth0 -p tcp --dport 443 -j ACCEPT
iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 443 -j REDIRECT --to-port 2003

