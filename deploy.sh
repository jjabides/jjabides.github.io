#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# stage 'dist' folder
git add dist -f

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git commit -m 'deploy'

# deploy to subtree 'gh-pages'
git subtree push --prefix dist origin gh-pages

cd -