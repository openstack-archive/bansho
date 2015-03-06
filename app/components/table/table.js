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

    .value('tableConfig', {'cellToFieldsMap': {}, 'cellWrappableField': {}, 'index': 0})

    .controller('TableCtrl', ['$scope', '$interval', 'getServices', 'tableConfig', 'processColumnRepeat',
        function ($scope, $interval, getServices, tableConfig, processColumnRepeat) {
            var requestFields = [],
                filters = JSON.parse(tableConfig[tableConfig.index].filters),
                conf = tableConfig[tableConfig.index],
                getData,
                i;

            $scope.cellsName = conf.cells.name;
            $scope.cellsText = conf.cells.text;
            $scope.cellIndexes = [];

            for (i = 0; i < $scope.cellsName.length; i += 1) {
                $scope.cellIndexes.push(i);
            }

            angular.forEach($scope.cellsName, function (key) {
                angular.forEach(tableConfig.cellToFieldsMap[key], function (_value) {
                    requestFields.push(_value);
                });
            });

            getData = function (requestFields, filters, apiName) {
                getServices(requestFields, filters, apiName)
                    .success(function (data) {
                        var fieldToWrap = tableConfig.cellWrappableField[conf.noRepeatCell],
                            cellFields = tableConfig.cellToFieldsMap[conf.noRepeatCell];

                        if (conf.noRepeatCell !== "") {
                            data = processColumnRepeat(data, fieldToWrap, cellFields, conf.isWrappable);
                        }

                        $scope.entries = data;
                    });
            };

            getData(requestFields, filters, conf.apiName);

            if (tableConfig.refreshInterval !== '0') {
                $interval(function () {
                    getData(requestFields, filters, conf.apiName);
                }, tableConfig.refreshInterval);
            }

            // Used if there's more than one table in a view
            tableConfig.index += 1;
        }])

    .directive('adgTable', ['$http', '$compile', 'tableConfig', function ($http, $compile, tableConfig) {
        return {
            restrict: 'E',
            compile: function () {
                return function (scope, element, attrs) {

                    if (!attrs.cellsText || !attrs.cellsName || !attrs.apiName || !attrs.isWrappable) {
                        throw new Error('<adg-table> "cells-text", "cells-name", "api-name"'
                                        + ' and "is-wrappable" attributes must be defined');
                    }

                    tableConfig[attrs.tableId] = {};
                    tableConfig[attrs.tableId].filters = {};

                    tableConfig[attrs.tableId].cells = { 'text': [], 'name': [] };
                    tableConfig[attrs.tableId].cells.text = attrs.cellsText.split(',');
                    tableConfig[attrs.tableId].cells.name = attrs.cellsName.split(',');

                    tableConfig[attrs.tableId].apiName = attrs.apiName;

                    tableConfig[attrs.tableId].isWrappable = false;
                    tableConfig[attrs.tableId].isWrappable = attrs.isWrappable;
                    tableConfig[attrs.tableId].noRepeatCell = attrs.noRepeatCell;
                    tableConfig[attrs.tableId].tableId = attrs.tableId;

                    if (!!attrs.refreshInterval) {
                        tableConfig.refreshInterval = attrs.refreshInterval;
                    }

                    if (!!attrs.filters) {
                        tableConfig[attrs.tableId].filters = attrs.filters;
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
    }])

    .service('processColumnRepeat', function () {

        function clearFields(entry, fields) {
            angular.forEach(fields, function (value) {
                entry[value] = '';
            });
        }

        // Erase subsequently repeated data of a given cell only keeping the first occurrence
        // fieldToProcess is the field to watch for subsequent repetition
        // fields are all the fields of a given cell whose data will be erased
        return function (data, fieldToProcess, fields, isWrappable) {
            var last = '',
                actual = '',
                entry = {},
                parent_found = false,
                class_name = ['', ''],
                i;

            if (isWrappable === "true") {
                class_name = ['state--hasChild', 'state--isChild'];
            }

            for (i = 0; i < data.length; i += 1) {
                entry = data[i];
                actual = entry[fieldToProcess];

                if (entry[fieldToProcess] === last) {

                    if (!data[i - 1].has_child && !parent_found) {
                        data[i - 1].has_child = 1;
                        data[i - 1].child_class = class_name[0];
                        entry.child_class = class_name[1];
                        parent_found = true;
                    } else {
                        entry.is_child = 1;
                        entry.child_class = class_name[1];
                    }

                    clearFields(entry, fields);

                } else {
                    parent_found = false;
                }

                last = actual;
            }

            return data;
        };
    });
