#objective: instructs application to start on VM 
#cd reliability-devops-group2
cd ../../var/www/html/
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node
#npm install
#npm start &> /dev/null &

npm install pm2 
npm install
pm2 startOrReload ecosystem.config.json

