This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
You can find the most recent version of the create-react-app guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Table of Contents

- [What is `snickerdoodle`?](#what-is-snickerdoodle)
- [Getting started](#getting-started)
- [Adding dependencies](#adding-dependencies)
- [Pushing your work](#pushing-your-work)
- [Deploying](#deploying)
- [Troubleshooting](#troubleshooting)

## What is snickerdoodle?

The snickerdoodle repository manages the Polymer web app and all of its code. It is written primarily within the React framework. 

## Getting started

It's easy to get started with snickerdoodle. Before you start, make sure you have [`npm`](https://www.npmjs.com/get-npm?utm_source=house&utm_medium=homepage&utm_campaign=free%20orgs&utm_term=Install%20npm) and [`sass`](http://sass-lang.com/install) installed.
* Download the snickerdoodle repository through git clone. 
* Run `npm install` to download all dependencies.
* Run `npm start` to start the development server. This will automatically open a browser window with the web app, or you can open `localhost:3000` in your favorite browser. It will also start watching for errors, warnings, etc. which will be displayed as both terminal output and logged to the browser.
* Run `sh sass-start` in a different terminal window/tab to start watching for style changes. Again, errors will be displayed as terminal output and logged to the browser.

## Adding dependencies

You found a great library that you want to use as you improve snickerdoodle. Let's pretend it's called `awesomelib` and it's available on npm:
* Run `npm install --save awesomelib`, or if `awesomelib` has more specific instructions for installing, use those.
* When you commit your work, make sure you commit `package.json` in the root directory as well, so other people can use this library. 


## Troubleshooting
### Help! Something is wrong with `node_modules`. 

Someone probably added a dependency and you don't have it. Run `npm install` to update your installed packages. If that doesn't work, remove the `node_modules` folder, and run `npm install` again. If that doesn't work, go through `package.json` and figure out which library is messed up. 

