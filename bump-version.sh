#!/bin/sh
set -e

cd /tmp
git clone git@github.com:cloudalion/nodalion.git
cd nodalion
npm version $1
git push --tags origin master
npm publish
cd /tmp
rm -rf nodalion
