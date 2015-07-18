'use strict';

angular.module('bansho.actionbar')
    .directive('banshoActionbarFilter', ['componentsConfig', function (componentsConfig) {
        return {
            restrict: 'E',
            scope: {
                options: '='
            },
            templateUrl: 'components/directive/actionbar/component_filter/filter.html',
            controller: ['$scope', 'datasource', function ($scope, datasource) {
                $scope.tableId = $scope.options.attributes.tableId;

                $scope.filters = [];
                angular.forEach($scope.options.attributes.filters, function (filter) {
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

                $scope.activeFilter = $scope.filters[0];

                $scope.components = $scope.options.components;
                $scope.switchFilterFormShown = function () {
                    $scope.isShown = !$scope.isShown;
                };

                $scope.activateFilter = function (item) {
                    $scope.activeFilter = $scope.filters[item];

                    angular.forEach($scope.tableId, function (tableId) {
                        datasource.setQueryFilter(tableId, $scope.activeFilter.filter);
                    });
                    $scope.isShown = false;
                };
            }]
        };
    }]);
