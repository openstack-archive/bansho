'use strict';

angular.module('bansho.routingView', [
    'ngRoute',
    'bansho.config'
])

    .value('viewsTemplate', {})

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view', {
            controller: 'ViewCtrl',
            template: '<div ng-include="templateUrl">Loading...</div>'
        })
        .when('/login', {
            templateUrl: 'components/authentication/authentication.html'
        });
    }]);
