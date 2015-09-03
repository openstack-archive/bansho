'use strict';

angular.module('bansho.customDirective.tactical')
    .directive('banshoTopAlertProducers', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/customDirective/tactical/topAlertProducers/topAlertProducers.html',
            controller: ['$scope', function ($scope) {
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
            }]
        };
    });
