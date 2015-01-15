'use strict';

module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        project: {
            app: ['app'],
            assets: ['<%= project.app %>/assets'],
            css: ['<%= project.assets %>/sass/app.scss']
        },


        sass: {
            dev: {
                options: {
                    style: 'expanded',
                    compass: false
                },
                files: {
                    '<%= project.assets %>/css/app.css':'<%= project.css %>'
                }
            }
        },

        watch: {
            sass: {
                files: '<%= project.assets %>/sass/{,*/}*.{scss,sass}',
                tasks: ['sass:dev']
            }
        },

      jslint: { // configure the task

        client: {
          src: [
            'app/app.js',
            'app/**/*.js'
          ],
          exclude: [
            'app/bower_components/**/*.js',
            'app/assets/**/*'
          ],
          directives: { // example directives
            node: true,
            todo: true
          },
          options: {
            edition: 'latest', // specify an edition of jslint or use 'dir/mycustom-jslint.js' for own path
            junit: 'out/client-junit.xml', // write the output to a JUnit XML
            log: 'out/client-lint.log',
            jslintXml: 'out/client-jslint.xml',
            errorsOnly: true, // only display errors
            failOnError: false, // defaults to true
            checkstyle: 'out/client-checkstyle.xml' // write a checkstyle-XML
          }
        }
      }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jslint');

    grunt.registerTask('default', 'jslint');
    grunt.registerTask('default', [
        'watch'
    ]);

};
