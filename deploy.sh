#!/bin/bash

TARGET_BRANCH="gh-pages"

# Pull requests shouldn't try to deploy, just skip
if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
    echo "Skipping."
    exit 0
fi

# Get the deploy key
ENCRYPTED_KEY_VAR="encrypted_${ENCRYPTION_LABEL}_key"
ENCRYPTED_IV_VAR="encrypted_${ENCRYPTION_LABEL}_iv"
ENCRYPTED_KEY=${!ENCRYPTED_KEY_VAR}
ENCRYPTED_IV=${!ENCRYPTED_IV_VAR}
openssl aes-256-cbc -K $ENCRYPTED_KEY -iv $ENCRYPTED_IV -in deploy_key.enc -out deploy_key -d
chmod 600 deploy_key
eval `ssh-agent -s`
ssh-add deploy_key

# Build information
REPO=`git config remote.origin.url`
SSH_REPO=${REPO/https:\/\/github.com\//git@github.com:}
SHA=`git rev-parse --verify HEAD`

# Build
jekyll build

cd _site

sed -i "s|\/fonts|../fonts|g" css/*.css

for html in $(find . -name "*html")
do
    sed -i "s|/css|$(echo $html | sed "s|[^/\\.]\{1,\}/|../|g;s|/[^/]*$||")/css|" $html
done

font-spider --debug --no-backup $(find . -name "*html")

cd ..

mv _site out

# Init git dir
git clone --depth=1 --branch=$TARGET_BRANCH $REPO orig

if [ $? -eq 0 ];then
    cd out
    mv ../orig/.git .git
else
    cd out
    git init
    git checkout --orphan $TARGET_BRANCH
    git remote add repo $REPO
fi

# Config git
git config user.name "Travis CI"
git config user.email "$COMMIT_AUTHOR_EMAIL"

# Add all
git add .
git commit -m "Deploy to GitHub Pages: ${SHA}"

# Push it
git push $SSH_REPO $TARGET_BRANCH -f
