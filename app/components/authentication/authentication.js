/* global alert */
'use strict';

angular.module('bansho.authentication', [])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'components/authentication/authentication.html'
        });
    }])

    .controller('LoginController', ['$scope', '$rootScope', '$location', 'authService', 'configManager', 'themeManager', function ($scope, $rootScope, $location, authService, configManager, themeManager) {
        themeManager.setTheme(themeManager.THEMES.DEFAULT);
        $rootScope.isAuthenticated = false;

        var login = function (credentials) {
            authService.login(credentials);
        };

        $scope.credentials = {
            'auth': {
                'tenantName': '',
                'passwordCredentials': {
                    'username': '',
                    'password': ''
                }
            }
        };

        $scope.login = function() {
            login($scope.credentials);
        };

        configManager.loadConfig().then(function () {
            var devConfig = configManager.getConfig();

            if (devConfig.env === 'development') {
                login({
                    'auth': {
                        'tenantName': '',
                        'passwordCredentials': {
                            'username': devConfig.username,
                            'password': devConfig.password
                        }
                    }
                });
            } else if (authService.isAuthenticated()) {
                login($scope.credentials);
            }

        }, function () {
        // Development config failed
        });

    }])

    .factory('authService', [ '$http', '$location', '$rootScope', 'session', 'configManager', 'themeManager', 'surveilConfig',
             function ($http, $location, $rootScope, session, configManager, themeManager, surveilConfig) {
        var authService = {};

        authService.login = function (credentials) {
            return $http
                .post(surveilConfig.getAuthUrl() + '/tokens/', credentials)
                .success(function (data) {
                    $rootScope.isAuthenticated = true;

                    session.create(data.access.token.id, data.access.token.expires);
                    $http.defaults.headers.common['X-Auth-Token'] = session.sessionId;

                    configManager.fetchLayoutConfig(configManager.getConfig().useStoredConfig).then(function () {
                            themeManager.setTheme(configManager.getTheme());
                            $location.path('/view');
                        }, function (message) {
                            throw new Error(message);
                        });

                })
                .error(function () {
                    alert('Login failed!');
                    $location.path('/login');
                });
        };

        authService.isAuthenticated = function () {
            return !!session.isUserConnected();
        };

        authService.logout = function () {
            $rootScope.isAuthenticated = false;
            session.destroy();
            $location.path('/login');
        };

        authService.switchTheme = function () {
            themeManager.switchTheme();
        };

        return authService;
    }])

    .service('session', ['$cookies', function ($cookies) {
        this.isUserConnected = function () {
            return $cookies.connected === 'true';
        };

        this.create = function (sessionId, expirationTime) {
            this.sessionId = sessionId;
            this.expirationTime = expirationTime;
            $cookies.connected = 'true';
        };

        this.destroy = function () {
            this.sessionId = null;
            this.expirationTime = null;
            $cookies.connected = 'false';
        };
    }]);
