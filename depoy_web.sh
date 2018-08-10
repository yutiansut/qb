#!/bin/bash

set -e
set -o xtrace

if [ -n "$1" ]; then
  SERVER=$1
else
  SERVER=192.168.55.111
fi
if [ -n "$2" ]; then
  WEBDIR=$2
else
  WEBDIR=/usr/share/nginx/html
fi

#zip ./dist dist.zip
scp -r ./dist.zip root@$SERVER:$WEBDIR

ssh root@$SERVER "sudo rm -rf $WEBDIR/index.html $WEBDIR/app $WEBDIR/static"
ssh root@$SERVER "sudo unzip -o $WEBDIR/dist.zip -d $WEBDIR/"

ssh root@$SERVER "sudo mv $WEBDIR/dist/* $WEBDIR/"
ssh root@$SERVER "sudo rm -rf $WEBDIR/dist"

rm -f dist.zip
rm -rf dist/
