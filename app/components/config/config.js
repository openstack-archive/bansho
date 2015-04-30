'use strict';


function AdagiosConfig(data) {
    this.data = data;
}

angular.module('bansho.config', [])

    .provider('readConfig', function ReadConfigProvider() {

        var data = {};

        this.loadJSON = function (value) {
            data = value;
        };

        this.$get = [function () {
            return new AdagiosConfig(data);
        }];
    })

    .service('configManager', ['readConfig', function (readConfig) {

        this.loadByTemplate = function (templateName, destination) {
            var viewsConfig = readConfig.data;

            angular.forEach(viewsConfig, function (config, view) {
                if (config.template === templateName) {
                    destination[view] = config;
                }
            });
        }
    }]);
