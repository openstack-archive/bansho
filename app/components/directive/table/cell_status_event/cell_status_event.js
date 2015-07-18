'use strict';

angular.module('bansho.table.cell_status_event', ['bansho.table'])

    .controller('CellStatusEventCtrl', ['$scope', function ($scope) {
        $scope.isExpanded = false;
        $scope.toggleExpansion = function () {
            $scope.isExpanded = !$scope.isExpanded;
        };

        var shownOutput = {
            'event_attempts': true,
            'event_contact': true,
            'event_notification_method': true,
            'event_notification_type': true,
            'event_state': true,
            'event_state_type': true
        };

        $scope.filter = function (entry) {
            var result = {};
            angular.forEach(entry, function(value, key) {
                if (shownOutput[key]) {
                    result[key.substring(6)] = value;
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
