/*global angular*/
'use strict';

angular.module('adagios.tactical', ['ngRoute',
                                    'adagios.tactical.status_overview',
                                    'adagios.tactical.current_health',
                                    'adagios.tactical.top_alert_producers'
                                    ])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/tactical', {
            templateUrl: 'tactical/tactical.html',
            controller: 'TacticalCtrl'
        });
    }])

    .controller('TacticalCtrl', ['$scope', '$http', function ($scope, $http) {
    }]);
