#objective: instructs application to start on VM 
#cd reliability-devops-group2
cd ../../var/www/html/
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node
npm install
node index.js &> /dev/null &

#npm install pm2 -g
#pm2 startOrReload ecosystem.config.json

