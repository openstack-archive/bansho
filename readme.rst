================
Adagios FrontEnd
================



Installation
============

::

    sudo apt-get install npm nodejs-legacy ruby
    git clone https://github.com/titilambert/adagios-frontend.git
    cd adagios-frontend
    npm install
    npm install grunt-cli
    gem install sass


Dev
===

To watch for sass files change and auto-refresh css run :

::

    grunt

To compile css files run :

::

    grunt sass

If you wish to develop in a docker container, here is how to proceed (assuming
you already have docker installed) :

::

    sed -i "s/localhost/0.0.0.0/" package.json
    make build
    make run
    curl http://localhost/app


Coding style
===========

This project conforms to JSLint coding style (http://github.com/douglascrockford/JSLint).
Run the linter as follows:

::

    grunt jslint

Tests
=====

AngularJS comes with Karma which is an automatic unit test runner.
While running, Karma automatically executes the tests when any js file changes.
To launch Karma :

::

    npm test

Launch
======

::

    npm start


Now, go on http://127.0.0.1:8000

Contributing
============

To contribute to this project, please fork the repo. Then do your commits (branch as you will)
and then open a pull-request to this repo's master branch.

::

    <fork this repo on github>
    git clone your-repo/adagios-frontend
    git checkout -b dev-new-feature-xx
    git commit ...
    git push origin dev-new-feature-xx
    <You can now open your pull-request to this repo's master>

Good practices before opening a pull request:

    - Run tests with `npm test`
    - Lint your .js files with `grunt jslint`
    - Make sure your directives are prefixed with `adg`
    - Make sure your controllers are suffixed with `Ctrl`
    - Resolve merge conflicts locally

