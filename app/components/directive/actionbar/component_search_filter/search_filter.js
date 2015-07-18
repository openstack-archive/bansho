'use strict';

angular.module('bansho.actionbar')
    .directive('banshoActionbarSearchFilter', [function () {
        return {
            restrict: 'E',
            scope: {
                'tableId': '='
            },
            templateUrl: 'components/directive/actionbar/component_search_filter/search_filter.html',
            controller: ['$scope', 'datasource', function ($scope, datasource) {
                $scope.searchFilterChange = function () {
                    angular.forEach($scope.tableId, function (tableId) {
                        datasource.setSearchFilter(tableId, $scope.searchFilter);
                    });
                };
            }]
        };
    }]);
