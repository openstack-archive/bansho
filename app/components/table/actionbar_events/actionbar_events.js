'use strict';

angular.module('bansho.table.actionbar_events', ['bansho.table', 'bansho.surveil', 'bansho.notifications'])
    .directive('banshoTableActionbarEvents', function () {
        return {
            restrict: 'E',
            controller: ['$scope', '$filter', 'surveilStatus', 'tables',
                function ($scope, $filter, surveilStatus, tables) {
                    //$scope.actionbarFilters = actionbarFilters;
                    //$scope.actionbarFilters.activeFilter = $scope.actionbarFilters.possibleFilters[0];

                    $scope.activateFilter = function (item) {
                        $scope.actionbarFilters.activeFilter = $scope.actionbarFilters.possibleFilters[item];
                    };
                }
            ],
            templateUrl: 'components/table/actionbar_events/actionbar_events.html'
        };
    });
