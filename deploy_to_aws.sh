echo 'Starting to Deploy...'
ssh ubuntu@52.38.40.75 " sudo docker image prune -f 
        cd tictactoe_rails_react 
        sudo docker-compose down
        git fetch origin
        git reset --hard origin/develop  &&  echo 'You are doing well'
        sudo docker-compose build && sudo docker-compose up -d
        "
echo 'Deployment completed successfully'

# The above script:
# login to your EC2 server
# remove all the unused images 
# cd into the application directory
# shutdown the running containers 
# update the repository from github 
# reset the current git repository to the updated version
# build your docker image
# and start the image