'use strict';

angular.module('bansho.table.pagingbar', ['bansho.datasource', 'bansho.surveil', 'bansho.notifications'])
    .directive('banshoPagingbar', function () {
        return {
            restrict: 'E',
            scope: {
                options: '='
            },
            templateUrl: 'components/custom_directive/table/paging_bar/paging_bar.html',
            controller: ['$scope', 'datasource',
                function ($scope, datasource) {
                    $scope.datasourceId = $scope.options.attributes.datasourceId;
                    $scope.pageSizes = [5, 25, 50, 75, 100];

                    $scope.page = datasource.getPage($scope.datasourceId);
                    $scope.size = datasource.getPageSize($scope.datasourceId);

                    $scope.previousPage = function () {
                        datasource.previousPage($scope.datasourceId);
                        $scope.page = datasource.getPage($scope.datasourceId);
                    };

                    $scope.nextPage = function () {
                        datasource.nextPage($scope.datasourceId);
                        $scope.page = datasource.getPage($scope.datasourceId);
                    };

                    $scope.setPageSize = function (pageSize) {
                        $scope.size = pageSize;
                    };

                    $scope.$watch('size', function (newValue) {
                        if (newValue !== "") {
                            datasource.setPageSize($scope.datasourceId, newValue);
                        }
                    });
                }]
        };
    });
