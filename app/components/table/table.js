'use strict';

angular.module('adagios.table', ['adagios.live',
                                 'adagios.table.cell_host',
                                 'adagios.table.cell_duration',
                                 'adagios.table.cell_service_check',
                                 'adagios.table.cell_last_check'
                                 ])

    .value('tableConfig', { cells: [],
                            apiName: '',
                            cellToFieldsMap: {} })

    .controller('TableCtrl', ['$scope', 'getServices', 'readConfig', 'tableConfig', function ($scope, getServices, readConfig, tableConfig) {

        var requestFields = [],
            filters =  {};

        $scope.cells = tableConfig.cells;

        angular.forEach($scope.cells, function (key, value) {
            angular.forEach(tableConfig.cellToFieldsMap[key], function (_value) {
                requestFields.push(_value);
            });
        });

        getServices(requestFields, filters, tableConfig.apiName)
            .success(function (data) {
                $scope.entries = data;
            });
    }])

    .directive('adgTable', ['tableConfig', function (tableConfig) {
        return {
            restrict: 'E',
            link: function (scope, element, attrs) {
                scope.generateTable = function () {
                    if (!!attrs.cells && !!attrs.apiName) {
                        tableConfig.cells = attrs.cells.split(',');
                        tableConfig.apiName = attrs.apiName;
                        return 'components/table/table.html';
                    }
                    console.log('<adg-table> "cells" and "api-name" attributes must be defined');
                };
            },
            template: '<div ng-include="generateTable()"></div>'
        };
    }])

    .directive('adgCell', function () {
        return {
            restrict: 'E',
            link: function (scope, element, attrs) {
                scope.getTemplateUrl = function () {
                    if (!!attrs.type) {
                        return 'components/table/cell_' + attrs.type + '/cell_' + attrs.type + '.html';
                    }
                    console.error('<adg-cell> "type" attribute is undefined');
                };
            },
            template: '<div ng-include="getTemplateUrl()"></div>'
        };
    });
