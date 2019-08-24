
##### cli to scaffold projects


```bash
npm init @iosio/project
# or
npx @iosio/create-project
# or
npm install -g @iosio/create-project
create-project
```

inspired by:

https://github.com/dkundel/create-project

https://www.twilio.com/blog/how-to-build-a-cli-with-node-js



cd ~/projects/node-redis    # go into the package directory
npm link                    # creates global link
cd ~/projects/node-bloggy   # go into some other package directory.
npm link redis              # link-install the package

see also:

https://medium.com/@ali.dev/how-to-publish-a-js-library-to-npm-with-rollup-typescript-8b51ede8f562

https://github.com/ReactTraining/history/blob/master/rollup.config.js

