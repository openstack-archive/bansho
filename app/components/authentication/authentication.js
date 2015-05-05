/* global alert */
'use strict';

angular.module('bansho.authentication', [])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'components/authentication/authentication.html'
        });
    }])

    .controller('LoginController', ['$scope', '$rootScope', '$location', 'authService', function ($scope, $rootScope, $location, authService) {
        $scope.credentials = {
            'auth': {
                'tenantName': '',
                'passwordCredentials': {
                    'username': '',
                    'password': ''
                }
            }
        };

        $scope.login = function (credentials) {
            authService.login(credentials);
        };
    }])

    .factory('authService', ['$http', '$location', '$rootScope', 'session', 'configManager',  function ($http, $location, $rootScope, session, configManager) {
        var authService = {};

        authService.login = function (credentials) {
            return $http
                .post('/surveil/v2/auth/tokens/', credentials)
                .success(function (data) {
                    $rootScope.isAuthenticated = true;
                    session.create(data.access.token.id, data.access.token.expires);
                    $http.defaults.headers.common['X-Auth-Token'] = session.sessionId;

                    configManager.fetchConfig().then(function () {
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
            return !!session.sessionId;
        };

        return authService;
    }])

    .service('session', function () {

        this.create = function (sessionId, expirationTime) {
            this.sessionId = sessionId;
            this.expirationTime = expirationTime;
        };

        this.destroy = function () {
            this.sessionId = null;
            this.expirationTime = null;
        };
    });
