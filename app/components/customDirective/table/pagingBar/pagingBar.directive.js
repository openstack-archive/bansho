'use strict';

angular.module('bansho.customDirective.table.pagingBar')
    .directive('banshoPagingbar', function () {
        return {
            restrict: 'E',
            scope: {
                options: '='
            },
            templateUrl: 'components/customDirective/table/pagingBar/pagingBar.html',
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
