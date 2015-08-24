'use strict';

angular.module('bansho.tactical.top_alert_producers', ['ngRoute' ])
    .controller('TacticalTopAlertProducers', ['$scope', function ($scope) {
        $scope.hosts = [
            {
                "host_name": "server-18",
                "problems": 10
            },
            {
                "host_name": "server-22",
                "problems": 5
            },
            {
                "host_name": "server-13",
                "problems": 3
            }
        ];
    }])

    .directive('banshoTopAlertProducers', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/custom_directive/tactical/top_alert_producers/top_alert_producers.html'
        };
    });
