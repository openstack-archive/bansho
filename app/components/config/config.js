/*global jQuery */

'use strict';

angular.module('bansho.config', [])
    .service('themeManager', ['$rootScope', 'configManager',
            function ($rootScope, configManager) {
        // Constants for theme colors
        var THEMES = {
            DARK: "dark",
            LIGHT: "light",
            DEFAULT: "dark"
        };
        this.THEMES = THEMES;

        var setThemeClass = function (theme, saveConfig) {
            $rootScope.themeClass = 'color-scheme--' + theme;
            $rootScope.themeColor = theme;

            if (saveConfig) {
                configManager.setThemeAndSave(theme);
            }
        };

        /**
         * Set the application theme from configManager
         *
         * If configManager isn't loaded this will set default.
         */
        this.setTheme = function (theme) {
            if (theme) {
                setThemeClass(theme, false);
            } else {
                setThemeClass(THEMES.DEFAULT, false);
            }
        };

        this.switchTheme = function () {
            if ($rootScope.themeColor === THEMES.DARK) {
                setThemeClass(THEMES.LIGHT, true);
            } else {
                setThemeClass(THEMES.DARK, true);
            }
        };
    }])

    .service('componentsConfig', ['$http', function($http) {
        var componentsConfig;

        this.getFilter = function (name) {
            return componentsConfig.filters[name];
        };

        this.mergeFilters = function (filters) {
            var filter = {};

            angular.forEach(filters, function (f) {
                angular.forEach(f, function (endpointFilter, endpoint) {
                    if (!filter[endpoint]) {
                        filter[endpoint] = {};
                    }

                    angular.forEach(endpointFilter, function (constraint, constraintType) {
                        if (!filter[endpoint][constraintType]) {
                            filter[endpoint][constraintType] = {};
                        }

                        angular.forEach(constraint, function (value, key) {
                            filter[endpoint][constraintType][key] = value;
                        });
                    });
                });
            });

            return filter;
        };

        this.getInputSource = function (name) {
            return componentsConfig.inputSource[name];
        };

        this.load = function () {
            $http.get('components/config/componentsConfig.json')
                .success(function(config) {
                    componentsConfig = config;
                });
        };
    }])

    .service('configManager', ['$http', '$q', 'componentsConfig', 'surveilConfig',
        function ($http, $q, componentsConfig, surveilConfig) {
            var config = {},
                developmentConfig = {};

            this.loadDevelopmentConfig = function() {
                var promise = $q.defer();

                $http.get('components/config/developmentConfig.json')
                    .success(function (config) {
                        developmentConfig = config;
                        surveilConfig.setSurveilApiUrl(config.surveilApiUrl);
                        surveilConfig.setAuthUrl(config.surveilAuthUrl);
                        promise.resolve();
                    })
                    .error(function() {
                        promise.reject();
                    });

                return promise.promise;
            };

            this.getDevelopmentConfig = function () {
                return developmentConfig;
            };

            this.getConfigData = function (templateName) {
                return config.data[templateName];
            };

            this.readConfig = function () {
                return config.data;
            };

            this.saveConfig = function(configuration) {
                config.data = configuration;
                saveConfig();
            };

            this.setThemeAndSave = function (theme) {
               config.data.banshoConfig.theme = theme;
               saveConfig();
            };

            this.getTheme = function () {
                var theme;

                if (config.data) {
                    theme = config.data.banshoConfig.theme;
                }

                return theme;
            };

            var saveConfig = function () {
                var responsePromise = $q.defer();

                $http.post(surveilConfig.endpoint('config'), JSON.stringify(config.data))
                    .success(function () {
                        responsePromise.resolve();
                    })
                    .error(function () {
                        responsePromise.reject('Failed to send config to server');
                    });

                return responsePromise.promise;
            };

            this.fetchConfig = function (useStoredConfig) {
                var responsePromise = $q.defer();

                componentsConfig.load();

                $http.get(surveilConfig.endpoint('config'))
                    .success(function (conf) {
                        if (!useStoredConfig || jQuery.isEmptyObject(conf))  {
                            $http.get('components/config/config.json')
                                .success(function (conf) {
                                    config.data = conf;

                                    $http.post(surveilConfig.endpoint('config'), JSON.stringify(conf))
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
