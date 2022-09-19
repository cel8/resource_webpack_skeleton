#!/bin/bash

curPath="$PWD"
prjName="$1"

if [ -z "$1" ]
then 
	echo "Run: deployPrjDir.sh project_name project_path"
	exit 1
else
	echo "Create the project name: $prjName"
fi

if [ -z "$2" ]
then
	echo "Empty project folder. Script choose current directory? Y/N"
	read varChoose
	if [ "$varChoose" = "Y" ] || [ "$varChoose" = "y" ]
	then
		dstPath="."
	else
		exit 1
	fi
else
	dstPath="$2"
fi

# Build the directory path
dstPath+="/$prjName/"

# Build project path and create folder
if [ ! -d "$dstPath" ]
then
	echo "Creating the destination path: $dstPath"
	mkdir -p "$dstPath"
else
	echo "Project already exists."
	echo "WARN do you want delete it? Are you really sure? Y/N"
	read varDelete
	if [ "$varDelete" = "Y" ] || [ "$varDelete" = "y" ]
	then
		rm -fR "$dstPath"
		mkdir -p "$dstPath"
	else
		exit 1
	fi
fi
echo "Project folder $dstPath"

# Initialize git
cd "$dstPath"
git init
touch .gitignore

# Add to gitignore
echo "jsconfig.json" >> .gitignore
echo "node_modules" >> .gitignore
echo "dist" >> .gitignore

# Create README
touch README.md
echo "# $prjName" >> README.md
echo "%%description%% part of <a href=\"src-page-link\">The Odin Project assignment</a>." >> README.md
echo "" >> README.md
echo "Learning:" >> README.md
echo "- %%learn%%" >> README.md
echo "" >> README.md
echo "Live demo <a href=\"dst-page-link\">here</a>." >> README.md

# Copy common resources
cp "$HOME/repos/web/resWebPrj/jsconfig.json" .
cp "$HOME/repos/web/resWebPrj/webpack.config.js" .
cp -R "$HOME/repos/web/resWebPrj/src" .
cp -R "$HOME/repos/web/resWebPrj/dist" .

# Initialize NPM
npm init -y

# Change package.json content
sed -i 's/"main":.*\.js",/"private": true,/g' package.json
sed -i 's/exit 1"/exit 1",\n    "watch": "webpack --watch",\n    "build": "webpack"/g' package.json

# Install packages
npm install --save-dev webpack webpack-cli clean-webpack-plugin css-loader style-loader html-webpack-plugin lodash file-loader

# Return to current folder
cd "$curDir"
