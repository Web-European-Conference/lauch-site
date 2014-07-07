# Setup #

The site is built on top of [NodeJs](http://nodejs.org/) and the application requires some packages from the [NPM](https://www.npmjs.org/).

First think to do is install the right packages:

```
# Install grunt and bower
$ npm install -g grunt-cli

$ cd src
$ npm install

$ cd ..
$ cd grunt

# Install packages
$ npm install
```

# Credentials #

This website uses Mailchimp for the newsletter and also send emails using node and gmail (in my case, but is configurable).

To get it work is important to rename the file ```_credentials.js``` to ```credentials.js``` in src/config, change the value with your credentials and you done.

## Watch & serve ##

```
cd grunt
$ grunt
```
is not necessary Start and Stop the web server, Nodemon will monitoring all src folder (*.js)

