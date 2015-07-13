'use strict';

angular.module('bansho.table.actionbar', ['bansho.table', 'bansho.surveil', 'bansho.notifications'])
    .directive('banshoTableActionbar', function () {
        return {
            restrict: 'E',
            scope: {
                tableId: '='
            },
            controller: ['$scope', 'tables', function ($scope, tables) {
                $scope.isDowntimeShown = false;
                $scope.isAcknowledgeShown = false;

                $scope.switchDowntimeForm = function () {
                    $scope.isAcknowledgeShown = false;
                    $scope.isDowntimeShown = !$scope.isDowntimeShown;
                };

                $scope.switchAcknowledgeForm = function () {
                    $scope.isDowntimeShown = false;
                    $scope.isAcknowledgeShown = !$scope.isAcknowledgeShown;
                };

                $scope.actionbarFilters = [{
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
                $scope.activeFilter = $scope.actionbarFilters[0];
                $scope.activateFilter = function (item) {
                    $scope.activeFilter = $scope.actionbarFilters[item];
                    angular.forEach($scope.tableId, function (tableId) {
                        console.log("not yet implemented");
                        //tables.setFilters(tableId)
                    })
                };
            }],
            templateUrl: 'components/table/actionbar/actionbar.html'
        };
    });
