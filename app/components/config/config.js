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
            var layoutConfig = {},
                config = {};

            this.loadConfig = function() {
                var promise = $q.defer();

                $http.get('components/config/config.json')
                    .success(function (c) {
                        config = c;
                        surveilConfig.setSurveilApiUrl(c.surveilApiUrl);
                        surveilConfig.setAuthUrl(c.surveilAuthUrl);
                        promise.resolve();
                    })
                    .error(function() {
                        promise.reject();
                    });

                return promise.promise;
            };

            this.getConfig = function () {
                return config;
            };

            this.getConfigData = function (templateName) {
                return layoutConfig.data[templateName];
            };

            this.readLayoutConfig = function () {
                return layoutConfig.data;
            };

            this.saveLayoutConfig = function(configuration) {
                layoutConfig.data = configuration;
                saveLayoutConfig();
            };

            this.setThemeAndSave = function (theme) {
               layoutConfig.data.banshoConfig.theme = theme;
               saveLayoutConfig();
            };

            this.getTheme = function () {
                var theme;

                if (layoutConfig.data) {
                    theme = layoutConfig.data.banshoConfig.theme;
                }

                return theme;
            };

            var saveLayoutConfig = function () {
                var responsePromise = $q.defer();

                console.log('layoutConfig ')
                console.log(JSON.stringify(layoutConfig))
                $http.post(surveilConfig.endpoint('appConfig'), JSON.stringify(layoutConfig.data))
                    .success(function () {
                        responsePromise.resolve();
                    })
                    .error(function () {
                        responsePromise.reject('Failed to send config to server');
                    });

                return responsePromise.promise;
            };

            this.fetchLayoutConfig = function (useStoredConfig) {
                var responsePromise = $q.defer();

                componentsConfig.load();

                $http.get(surveilConfig.endpoint('appConfig'))
                    .success(function (conf) {
                        if (!useStoredConfig || jQuery.isEmptyObject(conf))  {
                            $http.get('components/config/defaultLayoutConfig.json')
                                .success(function (conf) {
                                    layoutConfig.data = conf;

                                    $http.post(surveilConfig.endpoint('appConfig'), JSON.stringify(conf))
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
                            layoutConfig.data = conf;
                            responsePromise.resolve();
                        }
                    })
                    .error(function () {
                        responsePromise.reject('Failed to fetch config');
                    });

                    return responsePromise.promise;
                };
            }]);
