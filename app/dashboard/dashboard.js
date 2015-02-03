'use strict';

angular.module('adagios.tactical', ['ngRoute',
                                    'adagios.tactical.status_overview',
                                    'adagios.tactical.current_health',
                                    'adagios.tactical.top_alert_producers',
                                    'adagios.table'
                                    ])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'dashboard/dashboard.html',
            controller: 'DashboardCtrl'
        });
    }])

    .controller('DashboardCtrl', ['$scope', '$http', function ($scope, $http) {
        return;
    }]);
