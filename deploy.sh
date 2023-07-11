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

# navigate to Web Portfolio folder
cd /c/repos/'Web Portfolio'

# stage all changes
git add .

# commit
git commit -m 'deploy'

# push changes to gh-pages
git push origin gh-pages

# switch back to main
git checkout main