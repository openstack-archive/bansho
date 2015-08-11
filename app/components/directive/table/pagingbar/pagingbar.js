'use strict';

angular.module('bansho.table.pagingbar', ['bansho.datasource', 'bansho.surveil', 'bansho.notifications'])
    .directive('banshoPagingbar', function () {
        return {
            restrict: 'E',
            scope: {
                options: '='
            },
            templateUrl: 'components/directive/table/pagingbar/pagingbar.html',
            controller: ['$scope', 'datasource',
                function ($scope, datasource) {
                    $scope.tableId = $scope.options.attributes.tableId;
                    $scope.pageSizes = [5, 25, 50, 75, 100];

                    $scope.page = datasource.getPage($scope.tableId);
                    $scope.size = datasource.getPageSize($scope.tableId);

                    $scope.previousPage = function () {
                        datasource.previousPage($scope.tableId);
                        $scope.page = datasource.getPage($scope.tableId);
                    };

                    $scope.nextPage = function () {console.log('Hey, listen!')
                        datasource.nextPage($scope.tableId);
                        $scope.page = datasource.getPage($scope.tableId);
                    };

                    $scope.setPageSize = function (pageSize) {
                        $scope.size = pageSize;
                    };

                    $scope.$watch('size', function (newValue) {
                        if (newValue !== "") {
                            datasource.setPageSize($scope.tableId, newValue);
                        }
                    });
                }]
        };
    });
