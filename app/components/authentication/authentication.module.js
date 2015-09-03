angular.module('bansho.authentication', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'components/authentication/authentication.html'
        });
    }]);
