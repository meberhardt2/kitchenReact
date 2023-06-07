This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Refactoring



This project relies on kitchenExpress to serve the react files and kitchenAPI for the database interactions

dev setup:
- ubuntu multipass to create a VM
- edit hosts file on dev machine to point dev.whatever.com to the VMs ip
- run npm start in the src folder
- run node kitchenapi in the api folder
- kitchenapi, install everything but sqlite3 and better-sqlite3, then install sqlite3, then better-sqlite3


prod setup:
- pm2 to run express
- this is set up to run behind a reverse proxy, none of the ports are priveleged

pm2
- to generate the startup script, pm2 startup. it provides the command root must run for it to start on boot
- make sure to run "pm2 save" when all the processes are running, then when it starts on boot it will also fire up those processes

not needed:
dump firewall rules in rc.local to direct lower system ports 80/443 to our higher non-root ports
iptables -A INPUT -i eth0 -p tcp --dport 80 -j ACCEPT
iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 2002
iptables -A INPUT -i eth0 -p tcp --dport 443 -j ACCEPT
iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 443 -j REDIRECT --to-port 2003

