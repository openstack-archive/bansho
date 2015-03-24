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

    .controller('TableCtrl', ['$scope', '$interval', 'getServices', 'tableConfig', 'actionbarFilters',
        function ($scope, $interval, getServices, tableConfig, actionbarFilters) {
            console.log(tableConfig[tableConfig.index].additionnalQueryFields);
            var requestFields = [],
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

            getData = function (requestFields, filters, apiName, additionnalFields) {
                console.log(additionnalFields);
                getServices(requestFields, filters, apiName, additionnalFields)
                    .success(function (data) {
                        $scope.entries = data;
                    });
            };

            getData(requestFields, conf.filters, conf.apiName, conf.additionnalQueryFields);

            if (tableConfig.refreshInterval !== '0') {
                $interval(function () {
                    getData(requestFields, conf.filters, conf.apiName, conf.additionnalQueryFields);
                }, tableConfig.refreshInterval);
            }

            $scope.actionbarFilters = actionbarFilters;

            // Index needed to support multiple tables per view
            $scope.tableIndex = tableConfig.index;
            tableConfig.index += 1;
        }])

    .directive('adgTable', ['$http', '$compile', 'tableConfig', function ($http, $compile, tableConfig) {
        return {
            restrict: 'E',
            compile: function () {
                return function (scope, element, attrs) {

                    var template = 'components/table/table.html',
                        conf;

                    if (!attrs.cellsText || !attrs.cellsName || !attrs.apiName || !attrs.isWrappable) {
                        throw new Error('<adg-table> "cells-text", "cells-name", "api-name"'
                                        + ' and "is-wrappable" attributes must be defined');
                    }

                    tableConfig[attrs.tableId] = {};
                    conf = tableConfig[attrs.tableId];
                    conf.filters = {};
                    conf.additionnalQueryFields = {};

                    conf.cells = { 'text': [], 'name': [] };
                    conf.cells.text = attrs.cellsText.split(',');
                    conf.cells.name = attrs.cellsName.split(',');

                    conf.apiName = attrs.apiName;

                    conf.isWrappable = JSON.parse(attrs.isWrappable);
                    conf.noRepeatCell = attrs.noRepeatCell;
                    conf.tableId = attrs.tableId;

                    if (!!attrs.filters) {
                        conf.filters = JSON.parse(attrs.filters);
                    }

                    if (!!attrs.additionnalQueryFields) {
                        conf.additionnalQueryFields = JSON.parse(attrs.additionnalQueryFields);
                    }

                    if (!!attrs.refreshInterval) {
                        tableConfig.refreshInterval = attrs.refreshInterval;
                    }


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

    .value('TableConfigObj', function (config) {
        this.title = config.title;
        this.CellsText = config.cells.text.join();
        this.CellsName = config.cells.name.join();
        this.ApiName = config.apiName;
        this.Filters = config.filters;
        this.IsWrappable = config.isWrappable;
        this.NoRepeatCell = config.noRepeatCell;
        this.additionnalQueryFields = config.additionnalQueryFields;
    })

    .filter('wrappableStyle', ['tableConfig', function (tableConfig) {
        return function (input, scope) {
            var last = '',
                entry = {},
                parent_found = false,
                class_name = ['', ''],
                i,
                fieldToWrap = tableConfig.cellWrappableField[tableConfig[scope.tableIndex].noRepeatCell];

            if (fieldToWrap === undefined) {
                return input;
            }

            if (tableConfig[scope.tableIndex].isWrappable) {
                class_name = ['state--hasChild', 'state--isChild'];
            }

            for (i = 0; i < input.length; i += 1) {
                entry = input[i];

                if (entry[fieldToWrap] === last) {
                    if (!input[i - 1].has_child && !parent_found) {
                        input[i - 1].has_child = 1;
                        input[i - 1].child_class = class_name[0];
                        entry.child_class = class_name[1];

                        parent_found = true;
                    } else {
                        entry.is_child = 1;
                        entry.child_class = class_name[1];
                    }
                } else {
                    parent_found = false;
                }

                last = entry[fieldToWrap];
            }

            return input;
        };
    }])

    .filter('noRepeat', ['tableConfig', function (tableConfig) {
        return function (items, scope) {
            var newItems = [],
                previous,
                fieldToCompare = tableConfig.cellWrappableField[tableConfig[scope.tableIndex].noRepeatCell],
                new_attr = tableConfig[scope.tableIndex].noRepeatCell + "_additionnalClass";

            angular.forEach(items, function (item) {

                if (previous === item[fieldToCompare]) {
                    item[new_attr] = 'state--rmChild';
                } else {
                    previous = item[fieldToCompare].slice(0);
                    if (!!item[new_attr]) {
                        item[new_attr] = item[new_attr].replace("state--rmChild", "");
                    }
                }
                newItems.push(item);
            });

            return newItems;
        };
    }]);
