#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# switch to gh-pages
git checkout gh-pages

# navigate to dist folder
cd ../dist

# copy all files and place into Web Portfolio gh-pages branch
cp * -r /c/repos/'Web Portfolio'

cd /c/repos/'Web Portfolio'

git add .

git commit -m 'deploy'

git push origin gh-pages

cd -