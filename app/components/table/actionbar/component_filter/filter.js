'use strict';

angular.module('bansho.table.actionbar')
    .directive('banshoActionbarFilter', [function () {
        return {
            restrict: 'EA',
            scope: {
                'tableId': '='
            },
            templateUrl: 'components/table/actionbar/component_filter/filter.html',
            controller: ['$scope', 'tables', function ($scope, tables) {
                $scope.possibleFilters = [
                    {
                        text: "All",
                        name: "all"
                    },
                    {
                        text: "All OK",
                        name: "all_ok"
                    },
                    {
                        text: "All Acknowledged",
                        name: "all_acknowledged"
                    },
                    {
                        text: "All in Downtime",
                        name: "all_downtime"
                    }];

                $scope.activeFilter = $scope.possibleFilters[0];
                $scope.activateFilter = function (item) {
                    $scope.activeFilter = $scope.possibleFilters[item];
                    angular.forEach($scope.tableId, function (tableId) {
                        console.log("not yet implemented");
                    });
                };
            }]
        };
    }]);
