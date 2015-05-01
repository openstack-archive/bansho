'use strict';


angular.module('bansho.config', [])

    .service('configManager', ['$http', '$q', function ($http, $q) {
        var config = {};

        this.loadByTemplate = function (templateName, destination) {
            var viewsConfig = config.data;

            angular.forEach(viewsConfig, function (conf, view) {
                if (conf.template === templateName) {
                    destination[view] = conf;
                }
            });
        };

        this.readConfig = function () {
            return config.data;
        };

        this.fetchConfig = function () {
            var responsePromise = $q.defer();

            $http.get('surveil/v2/bansho/config')
                .success(function (conf) {
                    if (jQuery.isEmptyObject(conf))  {

                        $http.get('components/config/config.json')
                            .success(function (conf) {
                                config.data = conf;

                                $http.post('surveil/v2/bansho/config', JSON.stringify(conf))
                                    .success(function () {
                                        responsePromise.resolve();
                                    })
                                    .error(function () {
                                        responsePromise.reject('Failed to send config to server');
                                    });
                            })
                            .error(function () {
                                responsePromise.reject('Failed to fetch default config');
                            });
                    } else {
                        config.data = conf;
                        responsePromise.resolve();
                    }
                })
                .error(function () {
                    responsePromise.reject('Failed to fetch config');
                });

                return responsePromise.promise;
            };
        }]);
