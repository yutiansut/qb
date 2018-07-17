#!/bin/bash

set -e
set -o xtrace

SERVER=192.168.55.111
WEBDIR=/usr/share/nginx/html


scp -r ./dist.zip root@$SERVER:$WEBDIR

ssh root@$SERVER "sudo rm -rf $WEBDIR/index.html $WEBDIR/app $WEBDIR/static"
ssh root@$SERVER "sudo unzip -o $WEBDIR/dist.zip -d $WEBDIR/"

ssh root@$SERVER "sudo mv $WEBDIR/dist/* $WEBDIR/"
ssh root@$SERVER "sudo rm -rf $WEBDIR/dist"