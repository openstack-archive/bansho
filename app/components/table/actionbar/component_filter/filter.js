'use strict';

angular.module('bansho.table.actionbar')
    .directive('banshoActionbarFilter', function () {
        return {
            restrict: 'EA',
            scope: {
                "tableId": '='
            },
            templateUrl: 'components/table/actionbar/component_filter/filter.html',
            compile: function () {
                return function (scope, element, attrs) {
                    attrs.components = JSON.parse(attrs.components);
                }
            },
            controller: ['$scope', '$attrs', 'tables', function ($scope, $attrs, tables) {
                $scope.filters = JSON.parse($attrs.components).filters;

                $scope.activeFilter = $scope.filters[0];
                $scope.activateFilter = function (item) {
                    $scope.activeFilter = $scope.filters[item];
                    angular.forEach($scope.tableId, function (tableId) {
                        tables.setQueryFilter(tableId, $scope.activeFilter.filter)
                    });
                };
            }]
        };
    });
