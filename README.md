# Setup #

The site is built on top of [NodeJs](http://nodejs.org/) and the application requires some packages from the [NPM](https://www.npmjs.org/).

First think to do is install the right packages:

```
# Install grunt and bower
$ npm install -g grunt-cli bower

# Install packages
$ npm install
```

## Watch & serve ##

```
cd grunt
$ grunt
```
is not necessary Start and Stop the web server, Nodemon will monitoring all src folder (*.js)