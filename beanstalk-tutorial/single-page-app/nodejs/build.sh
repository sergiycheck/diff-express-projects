#!/bin/bash

filesToAddIntoDist=('cron.yaml' 'index.html' 'EBSampleApp-Nodejs.iml')

for file in ${filesToAddIntoDist[@]}; do
  cp ./$file dist/$file
done

cd dist; zip ../dist.zip *.*