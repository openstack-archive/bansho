================
Adagios FrontEnd
================



Installation
============

::

    sudo apt-get install npm nodejs-legacy
    git clone https://github.com/titilambert/adagios-frontend.git
    cd adagios-frontend
    npm install


Dev
===

Auto-refresh css files

::

    npm install grunt-cli
    grunt


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
