#!/bin/bash

if [ "$1" == "production" ]; then
	folder=dev
else
	folder=`echo $LOGNAME`
fi

DEPLOYDIR=/home/$folder/dist-irbio
APP_NAME=irbio
WORKDIR=/home/$folder/repo/irbio

grunt build --force &>> build.log
if [[ $? -eq $zero ]]; then	
	rm -rf $DEPLOYDIR/*
	pm2 stop $APP_NAME 
	cp -r $WORKDIR/dist/* $DEPLOYDIR/
	ln -s $DEPLOYDIR/public $DEPLOYDIR/client
	rm -rf $DEPLOYDIR/client/assets
	cp -r $WORKDIR/client/assets/ $DEPLOYDIR/client/
	ln -s $WORKDIR/node_modules $DEPLOYDIR/node_modules
	NODE_ENV=production pm2 start $DEPLOYDIR/server/app.js --name $APP_NAME
else
	echo "Error en grunt build"
	exit
fi
