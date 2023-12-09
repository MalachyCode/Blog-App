#!/bin/bash

echo "Build script"

# add the commands here
rm -rf build
cd ../bloglist-frontend-redux/
npm run build
cp -r build ../bloglist-backend
cd ../bloglist-backend/