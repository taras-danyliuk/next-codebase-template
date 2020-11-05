#!/bin/bash

# Functions ==============================================

# return 1 if global command line program installed, else 0
# example
# echo "node: $(program_is_installed node)"
program_is_installed () {
  # set to 1 initially
  local return_=1
  # set to 0 if not found
  type $1 >/dev/null 2>&1 || { local return_=0; }
  # return value
  echo "$return_"
}

# return 1 if local npm package is installed at ./node_modules, else 0
# example
# echo "gruntacular : $(npm_package_is_installed gruntacular)"
npm_package_is_installed () {
  # set to 1 initially
  local return_=1
  # set to 0 if not found
  ls node_modules | grep $1 >/dev/null 2>&1 || { local return_=0; }
  # return value
  echo "$return_"
}

# display a message in red with a cross by it
# example
# echo echo_fail "No"
echo_fail () {
  # echo first argument in red
  printf "\e[31m✘ ${1}"
  # reset colours back to normal
  printf "\033\e[0m"
}

# display a message in green with a tick by it
# example
# echo echo_fail "Yes"
echo_pass () {
  # echo first argument in green
  printf "\e[32m✔ ${1}"
  # reset colours back to normal
  printf "\033\e[0m"
}

# echo pass or fail
# example
# echo echo_if 1 "Passed"
# echo echo_if 0 "Failed"
echo_if () {
  if [ $1 == 1 ]; then
    echo_pass $2
  else
    echo_fail $2
  fi
}

echo "node    $(echo_if $(program_is_installed node))"
echo "npm    $(echo_if $(program_is_installed npm))"

# Check if npx is available
if [ ! "$(program_is_installed node)" == 1 ]; then
    echo "npx is not available"
    exit 1
fi


echo "";
echo "";


# Ask for choices
PRNAME="";
ADMIN=false;
UIKIT="";
SSR=false;
CODESPLITTING=false;

# Project name
while true; do
    read -p "What is the name of your project: " pr_name

    if [ "$pr_name" = "" ]; then
        echo "you need to provide project title"
    else
        PRNAME=$pr_name;
        break;
    fi
done

# Admin Panel
#while true; do
#    read -p "1. Do you want to add Admin Panel? " yn
#    case $yn in
#        [Yy]* ) ADMIN=true; break;;
#        [Nn]* ) break;;
#        * ) echo "Please answer yes or no.";;
#    esac
#done

# UI KIT Library
#while true; do
#    read -p "2. Do you want to add UI KIT? " yn
#    case $yn in
#        [Yy]* )
#            echo "Choose UI KIT for project (enter option number)."
#            select option in "Antd" "MaterialUI" "Evergreen" "Bootstrap"; do
#                case $option in
#                    Antd ) UIKIT="Antd"; break;;
#                    MaterialUI ) UIKIT="MaterialUI"; break;;
#                    Evergreen ) UIKIT="Evergreen"; break;;
#                    Bootstrap ) UIKIT="Bootstrap"; break;;
#                esac
#            done
#            break;;
#        [Nn]* ) break;;
#        * ) echo "Please answer yes or no.";;
#    esac
#done

# SSR
#while true; do
#    read -p "1. Do you want to add Server Side Rendering? " yn
#    case $yn in
#        [Yy]* ) SSR=true; break;;
#        [Nn]* ) break;;
#        * ) echo "Please answer yes or no.";;
#    esac
#done

# Code splitting
#while true; do
#    read -p "4. Do you want to add Code Splitting? " yn
#    case $yn in
#        [Yy]* ) CODESPLITTING=true; break;;
#        [Nn]* ) break;;
#        * ) echo "Please answer yes or no.";;
#    esac
#done


echo "";
echo "Project Name:      $PRNAME";
#echo "ADMIN:            $ADMIN"
#echo "UIKIT:            $UIKIT";
echo "SSR:               $SSR";
#echo "CODE SPLITTING:   $CODESPLITTING";
echo "";
echo "";



##########################################################################################
##########################################################################################
##########################################################################################


# Create project with name
printf "$PRNAME\n" | npx create-next-app
cd "$PRNAME"

rm -rf public
rm README.md


##########################
####### CORE PART ########
##########################
curl -L https://github.com/taras-danyliuk/next-codebase-template/archive/master.zip | tar zx

# Clean up
rm -rf pages
rm -rf public
rm -rf styles
rm README.md

# Copy files
cp next-codebase-template-master/README.md README.md
cp next-codebase-template-master/tsconfig.json tsconfig.json

# Copy folders
cp -rf next-codebase-template-master/assets assets
cp -rf next-codebase-template-master/components components
cp -rf next-codebase-template-master/helpers helpers
cp -rf next-codebase-template-master/pages pages
cp -rf next-codebase-template-master/public public
cp -rf next-codebase-template-master/services services

# Install additional packages
packages=$(<next-codebase-template-master/packages.txt)
npm i --save $packages

packages_dev=$(<next-codebase-template-master/packages-dev.txt)
npm i --save $packages_dev

## Split and modify package.json
#node react-structure-template-master/modifyPackage.js#

# Remove downloaded sources
rm -rf react-structure-template-master


##########################
#### CONDITIONAL PARTS ###
##########################
## SSR SECTION
#if [ "$SSR" = true ]; then
#    curl -L https://github.com/taras-danyliuk/react-structure-template/archive/ssr.zip | tar zx
#
#    cp -rf react-structure-template-ssr/ssr ssr
#    cp -rf react-structure-template-ssr/src/* src
#
#    # Add reducer to root reducer
#    node react-structure-template-ssr/modifyRootReducer.js
#
#    # Add script to package.json
#    node react-structure-template-ssr/modifyPackage.js
#
#    packages=$(<react-structure-template-ssr/packages.txt)
#    npm i --save $packages
#
#    rm -rf react-structure-template-ssr
#fi
#
#echo ".idea/" >> .gitignore
#echo "eslint-report.json" >> .gitignore
#
#
#########################
#### ADD NPM PACKAGES ###
#########################
#
#npm install --save node-sass react-router-dom react-redux redux redux-saga prop-types react-hook-form axios universal-cookie
#npm install --save-dev copy-webpack-plugin redux-devtools-extension enzyme enzyme-adapter-react-16 redux-saga-test-plan @coax/eslint-config-fe-react faker
#npm install
#
#
## Initialize custom hooks
#git config --local core.hooksPath ./custom-git-hook
#
#git add .
#git commit -n -q -m "Initial commit from React Project Setup"
