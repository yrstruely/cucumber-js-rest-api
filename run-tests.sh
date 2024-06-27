#!/bin/bash

PORT=3000

# Function to run a command and check its exit status
run_command() {
    echo "Running: $1"
    eval $1 &
    pid=$!
    echo "Command PID: $pid"
    wait $pid
    if [ $? -ne 0 ]; then
        echo "Error: Command failed: $1"
        exit 1
    fi
    echo "Command succeeded: $1"
}

# Function to check if a port is in use
check_port() {
    port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null; then
        echo "Port $port is already in use."
        return 0
    else
        echo "Port $port is free."
        return 1
    fi
}

# Change directory to test/bdd
cd test/bdd

# Check if port is in use
if check_port $PORT; then
    # If port is in use, find the process and stop it (example with SIGTERM)
    echo "Stopping process using port $PORT"
    lsof -ti :$PORT | xargs kill -SIGTERM
    sleep 2 # Wait for the process to stop gracefully (adjust as needed)
fi

# Command: npm install
run_command "npm install"

# Command: npm run server
run_command "npm run server"
sleep 2 # Wait for the server to start

# Command: npm run test
run_command "npm run test"

echo "Test cases running."

# Tidy up the server
check_port $PORT
echo "Stopping process using port $PORT"
lsof -ti :$PORT | xargs kill -SIGTERM

# Change back to original directory
cd -
