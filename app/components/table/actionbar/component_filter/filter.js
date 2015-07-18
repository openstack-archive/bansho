'use strict';

angular.module('bansho.table.actionbar')
    .directive('banshoActionbarFilter', ['componentsConfig', function (componentsConfig) {
        return {
            restrict: 'E',
            scope: {
                "tableId": '='
            },
            templateUrl: 'components/table/actionbar/component_filter/filter.html',
            controller: ['$scope', '$attrs', 'tables', function ($scope, $attrs, tables) {
                var filters = JSON.parse($attrs.filters);

                $scope.filters = [];
                angular.forEach(filters, function (filter) {
                    switch (filter.location) {
                        case 'inline':
                            $scope.filters.push(filter.content);
                            break;
                        case 'componentsConfig':
                            $scope.filters.push(
                                componentsConfig.getFilter(
                                    filter.content
                                )
                            );
                            break;
                    }
                });

                $scope.isShown = false;
                $scope.switchFilterFormShown = function () {
                    $scope.isShown = !$scope.isShown;
                };

                $scope.activeFilter = $scope.filters[0];
                $scope.activateFilter = function (item) {
                    $scope.activeFilter = $scope.filters[item];

                    angular.forEach($scope.tableId, function (tableId) {
                        tables.setQueryFilter(tableId, $scope.activeFilter.filter);
                    });
                    $scope.isShown = false;
                };
            }]
        };
    }]);
