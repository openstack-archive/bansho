'use strict';

angular.module('bansho.authentication', [])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'components/authentication/authentication.html'
        });
    }])

    .controller('LoginController', function ($scope, $rootScope, $location, authService) {
        $scope.credentials = {
            'auth': {
                'tenantName': '',
                'passwordCredentials': {
                    'username': '',
                    'password': ''
                }
            }
        }

        $scope.login = function (credentials) {
            authService.login(credentials);
        };
    })

    .factory('authService', ['$http', '$location', '$rootScope', 'session', function ($http, $location, $rootScope, session) {
        var authService = {};

        authService.login = function (credentials) {
            return $http
                .post('/surveil/v2/auth/tokens/', credentials)
                .success(function (data) {
                    $rootScope.isAuthenticated = true;
                    $location.path('/view');
                    session.create(data.access.token.id, data.access.token.expires);
                    $http.defaults.headers.common['X-Auth-Token'] = session.sessionId;
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
