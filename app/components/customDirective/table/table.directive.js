angular.module('bansho.customDirective.table')
    .directive('banshoTable', [
        function () {
            return {
                restrict: 'E',
                scope: {
                    options: '='
                },
                templateUrl: 'components/customDirective/table/table.html',
                controller: ['$scope', '$window', 'headerFollow', 'datasource', 'templateManager',
                    function ($scope, $window, headerFollow, datasource, templateManager) {
                        // Manage attributes.
                        $scope.datasourceId = $scope.options.attributes.datasourceId;
                        $scope.checkColumn = $scope.options.attributes.checkColumn;
                        $scope.pagingbar = $scope.options.attributes.pagingbar;

                        if ($scope.options.attributes.headerFollow) {
                            headerFollow.activate();
                        } else {
                            headerFollow.deactivate();
                        }

                        $scope.cellUrls = $scope.options.attributes.cellUrls;

                        // Handle components.
                        $scope.columns = [];
                        angular.forEach($scope.options.components, function (cell) {
                            $scope.columns.push({
                                type: cell.type,
                                title: cell.attributes.title,
                                attributes: cell.attributes
                            });
                        });

                        // Add table configuration.
                        datasource.addTable($scope.datasourceId, {
                            columns: $scope.columns,
                            inputSource: $scope.options.attributes.inputSource,
                            pagingbar: $scope.options.attributes.pagingbar
                        });
                        datasource.registerDataChanged($scope.datasourceId, function (data, isCheckAll) {
                            $scope.isCheckAll = isCheckAll;
                            $scope.entries = data;
                        });
                        datasource.refreshTableData($scope.datasourceId);
                        templateManager.addInterval(false, function refreshTable () {
                            datasource.refreshTableData($scope.datasourceId);
                        });

                        // Table functions.
                        $scope.createUrl = function (entry, attributes) {
                            if (attributes.url) {
                                var url = "#/view?view=" + attributes.url.view;
                                angular.forEach(attributes.url.params, function (value) {
                                    url += '&' + value.urlParam + '=' + entry[value.entryKey];
                                });
                                $window.location = url;
                            }
                        };

                        $scope.onClick = function () {
                            $scope.isCheckAll = !$scope.isCheckAll;
                            datasource.setAllCheckTable($scope.datasourceId, $scope.isCheckAll);
                        };

                        $scope.entryOnClick = function () {
                            $scope.isCheckAll = datasource.isAllCheckedTable($scope.datasourceId);
                        };
                    }
                ]
            };
        }]
    );
