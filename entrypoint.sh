#!/bin/sh

# Source the environment variables for API
if [ -f /usr/src/app/api.env ]; then
    export $(cat /usr/src/app/api.env | xargs)
fi

# Source the environment variables for tasks-app
if [ -f /usr/src/app/tasks-app.env ]; then
    export $(cat /usr/src/app/tasks-app.env | xargs)
fi

# Start the API
cd /usr/src/app/api
bun run start &

# Start the tasks-app
cd /usr/src/app/tasks-app
bun run start &

# Wait for all background processes to finish
wait

