'use strict';

angular.module('bansho.actionbar')
    .directive('banshoActionbarSearchFilter', [function () {
        return {
            restrict: 'E',
            scope: {
                options: '='
            },
            templateUrl: 'components/directive/actionbar/component_search_filter/search_filter.html',
            controller: ['$scope', 'datasource', function ($scope, datasource) {
                $scope.searchFilterChange = function () {
                    angular.forEach($scope.options.attributes.tableId, function (tableId) {
                        datasource.setSearchFilter(tableId, $scope.searchFilter);
                    });
                };
            }]
        };
    }]);
