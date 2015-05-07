======
Bansho
======

* Bug tracker: https://launchpad.net/bansho
* Open Gerrit changesets: https://review.openstack.org/#/q/status:open+bansho,n,z
* Surveil: https://github.com/stackforge/surveil

Production
==========


::

    sudo apt-get install docker.io
    git clone https://github.com/savoirfairelinux/bansho
    cd bansho
    make build
    make production


You can alternatively forge a Docker command to select your port.


Development
===========

Clone project :

::

    git clone https://github.com/savoirfairelinux/bansho
    cd bansho


Install development dependencies :

::

    sudo apt-get install npm nodejs-legacy ruby docker.io
    npm install grunt-cli
    npm install
    gem install sass
    make build


Start the Docker container (be sure to have a surveil container available at this link: https://github.com/stackforge/surveil )

::

    make daemon


Bansho supports only surveil.
To select the proper backend and compile sass for surveil run :

::

    grunt development:surveil


If you wish to develop in a docker container, here is how to proceed (assuming
you already have docker installed) :

::

    curl http://localhost:8888/


To only compile sass files to css run :

::

    grunt sass


Coding style
============

This project conforms to JSLint coding style (http://github.com/douglascrockford/JSLint).
Run the linter as follows:

::

    grunt jshint

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


Now, go on http://127.0.0.1:8000/app/

Contributing
============

To contribute to this project, please fork the repo. Then do your commits (branch as you will)
and then open a pull-request to this repo's master branch.

::

    <fork this repo on github>
    git clone your-repo/bansho
    git checkout -b dev-new-feature-xx
    git commit ...
    git push origin dev-new-feature-xx
    <You can now open your pull-request to this repo's master>

Good practices before opening a pull request:

    - Run tests with `npm test`
    - Lint your .js files with `grunt jslint`
    - Make sure your directives are prefixed with `bansho`
    - Make sure your controllers are suffixed with `Ctrl`
    - Resolve merge conflicts locally

