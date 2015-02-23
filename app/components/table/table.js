'use strict';

angular.module('adagios.table', ['adagios.live',
                                 'adagios.table.actionbar',
                                 'adagios.filters',
                                 'adagios.table.cell_host',
                                 'adagios.table.cell_duration',
                                 'adagios.table.cell_service_check',
                                 'adagios.table.cell_last_check',
                                 'adagios.table.cell_hosts_host',
                                 'adagios.table.cell_host_address',
                                 'adagios.table.cell_host_status'
                                ])

    .value('tableConfig', { cells: { 'text': [], 'name': [] },
                            apiName: '',
                            filters: {},
                            cellToFieldsMap: {} })

    .controller('TableCtrl', ['$scope', 'getServices', 'tableConfig', function ($scope, getServices, tableConfig) {

        var requestFields = [],
            filters = JSON.parse(tableConfig.filters),
            i;

        $scope.cellsName = tableConfig.cells.name;
        $scope.cellsText = tableConfig.cells.text;
        $scope.cellIndexes = [];

        for (i = 0; i < $scope.cellsName.length; i += 1) {
            $scope.cellIndexes.push(i);
        }

        angular.forEach($scope.cellsName, function (key) {
            angular.forEach(tableConfig.cellToFieldsMap[key], function (_value) {
                requestFields.push(_value);
            });
        });

        getServices(requestFields, filters, tableConfig.apiName)
            .success(function (data) {
                $scope.entries = data;
            });
    }])

    .directive('adgTable', ['$http', '$compile', 'tableConfig',  function ($http, $compile, tableConfig) {
        return {
            restrict: 'E',
            compile: function () {
                return function (scope, element, attrs) {

                    if (!attrs.cellsText || !attrs.cellsName || !attrs.apiName) {
                        throw new Error('<adg-table> "cells-text", "cells-name" and "api-name" attributes must be defined');
                    }

                    tableConfig.cells.text = attrs.cellsText.split(',');
                    tableConfig.cells.name = attrs.cellsName.split(',');
                    tableConfig.apiName = attrs.apiName;

                    if (!!attrs.filters) {
                        tableConfig.filters = attrs.filters;
                    }

                    var template = 'components/table/table.html';

                    $http.get(template, { cache: true })
                        .success(function (data) {
                            var elem = $compile(data)(scope);
                            element.append(elem);
                        });
                };
            }
        };
    }])

    .directive('adgCell', ['$http', '$compile', function ($http, $compile) {

        return {
            restrict: 'A',
            compile: function () {
                return function (scope, element, attrs) {
                    if (!attrs.cellName) {
                        throw new Error('<adg-cell> "cell-name" attribute must be defined');
                    }

                    var template = 'components/table/cell_' + attrs.cellName + '/cell_' + attrs.cellName + '.html';

                    $http.get(template, { cache: true })
                        .success(function (data) {
                            var td = $compile(data)(scope);
                            // HACK : replaceWith is a necessary hack because <tr> only accepts <td> as a child
                            element.replaceWith(td);
                        });
                };
            }
        };
    }]);
