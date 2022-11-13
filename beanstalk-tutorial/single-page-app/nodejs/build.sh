#!/bin/bash

filesToAddIntoDist=('cron.yaml' 'index.html' 'EBSampleApp-Nodejs.iml' '.ebextensions')

for file in ${filesToAddIntoDist[@]}; do
  cp -r $file dist/$file
done

cd dist; zip -r  ../dist.zip .