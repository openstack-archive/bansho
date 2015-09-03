angular.module('bansho.config')
    .service('configManager', ['$http', '$q', 'componentsConfig', 'surveilApiConfig',
        function ($http, $q, componentsConfig, surveilApiConfig) {
            var layoutConfig = {},
                config = {};

            this.loadConfig = function() {
                var promise = $q.defer();

                $http.get('components/config/config.json')
                    .success(function (c) {
                        config = c;
                        surveilApiConfig.setSurveilApiUrl(c.surveilApiUrl);
                        surveilApiConfig.setAuthUrl(c.surveilAuthUrl);
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

            this.setSizeAndSave = function (size) {
                layoutConfig.data.banshoConfig.size = size;
                saveLayoutConfig();
            };

            this.setThemeAndSave = function (theme) {
                layoutConfig.data.banshoConfig.theme = theme;
                saveLayoutConfig();
            };

            this.getSize = function () {
                var size;

                if (layoutConfig.data) {
                    size = layoutConfig.data.banshoConfig.size;
                }

                return size;
            };

            this.getTheme = function () {
                var theme;

                if (layoutConfig.data) {
                    theme = layoutConfig.data.banshoConfig.theme;
                }
                return theme;
            };

            this.getPagingSize = function () {
                var pagingSize;

                if (layoutConfig.data) {
                    pagingSize = layoutConfig.data.banshoConfig.pagingSize;
                }
                return pagingSize;
            };

            var saveLayoutConfig = function () {
                var responsePromise = $q.defer();

                $http.post(surveilApiConfig.endpoint('appConfig'), JSON.stringify(layoutConfig.data))
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

                $http.get(surveilApiConfig.endpoint('appConfig'))
                    .success(function (conf) {
                        if (!useStoredConfig || jQuery.isEmptyObject(conf))  {
                            $http.get('components/config/defaultLayoutConfig.json')
                                .success(function (conf) {
                                    layoutConfig.data = conf;

                                    $http.post(surveilApiConfig.endpoint('appConfig'), JSON.stringify(conf))
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
        }]
    );
