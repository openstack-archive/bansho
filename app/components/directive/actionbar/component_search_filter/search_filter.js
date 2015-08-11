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
                $scope.searchPaging = {page: '0', size: '50'};

                $scope.searchPagingChange = function () {
                console.log("paging")
                    angular.forEach($scope.options.attributes.tableId, function (tableId) {
                        datasource.setQueryPaging(tableId, $scope.searchPaging);
                    });

                    };

                $scope.searchFilterChange = function () {
                    angular.forEach($scope.options.attributes.tableId, function (tableId) {
                        datasource.setSearchFilter(tableId, $scope.searchFilter);
                    });
                };
            }]
        };
    }]);
