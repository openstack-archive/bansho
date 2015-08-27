======
Bansho
======

Web Interface for Surveil

* Bug tracker: https://launchpad.net/bansho
* Open Gerrit changesets: https://review.openstack.org/#/q/status:open+bansho,n,z
* Surveil: https://github.com/stackforge/surveil

.. image:: https://github.com/stackforge/surveil-specs/raw/master/bansho.png
      :alt: Bansho interface picture


Launch Bansho
=============

To launch Bansho do the following:

::

    git clone https://github.com/stackforge/bansho
    cd bansho
    sudo apt-get install docker.io
    make build


Start a Surveil and Grafana docker container (available at this link: https://github.com/stackforge/surveil).


Production
--------------

::

    make build
    make production


Make production will production will start container and run the production task (this could take up to 3 minutes).
Once everything ready you will be able to test minified files at http://localhost:8888.


Development
-----------

Install development dependencies locally:

::

    sudo apt-get install npm nodejs-legacy ruby docker.io
    npm install -g grunt-cli
    npm install
    gem install sass


Run the target daemon to start the container and serve Bansho at http://localhost:8888.

::

    make daemon


This will start a Bansho container and run the Grunt development task.
The Grunt task will compile Sass on change, watch all your files and refresh your browser on save.


Coding style
============

This project conforms to some of the JSHint coding style (http://jshint.com/about/). JSHint warnings are also shown in the Grunt development task:

::

    grunt jshint


Naming conventions
------------------

 - Camel case
 - custom_directives are prefixed with `bansho`
 - Controllers are suffixed with `Ctrl`


Tests
=====

To run test execute :

::

    npm test


Contributing
============

To contribute to this project, please refer to the Surveil developer documentation.

Good practices before pushing into Gerrit:

    - Lint your files with `grunt jslint`
    - Test in production

