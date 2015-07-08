'use strict';

angular.module('bansho.table.cell_status_event', ['bansho.table'])

    .controller('CellStatusEventCtrl', ['$scope', function ($scope) {
        $scope.isExpanded = false;
        $scope.toggleExpansion = function () {
            $scope.isExpanded = !$scope.isExpanded;
        };

        var shownOutput = {
            'attempts': true,
            'contact': true,
            'notification_method': true,
            'notification_type': true,
            'state': true,
            'state_type': true
        };

        $scope.filter = function (entry) {
            var result = {};
            angular.forEach(entry, function(value, key) {
                if (shownOutput[key]) {
                    result[key] = value;
                }
            });
            return result;
        };
    }])

    .run(['tableGlobalConfig', function (tableGlobalConfig) {
        tableGlobalConfig.cellToFieldsMap.status_output = [
            'attempts',
            'contact',
            'notification_method',
            'notification_type',
            'state',
            'state_type'
        ];
    }]);
