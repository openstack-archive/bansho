'use strict';

angular.module('bansho.table.actionbar')
    .directive('banshoSearchFilter', function () {
        return {
            restrict: 'E',
            scope: {
                'tableId': '='
            },
            templateUrl: 'components/table/actionbar/component_search_filter/search_filter.html',
            controller: ['$scope', 'tables', function ($scope, tables) {
                $scope.searchFilterChange = function () {
                    angular.forEach($scope.tableId, function (tableId) {
                        tables.setSearchFilter(tableId, $scope.searchFilter);
                    });
                };

            }]
        }
    });
