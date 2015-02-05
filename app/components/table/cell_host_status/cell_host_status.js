'use strict';

angular.module('adagios.table.cell_host_status', ['adagios.table'])

    .controller('CellHostStatusCtrl', ['$scope', function ($scope) {
        $scope.entry.host_status = "";
        $scope.alert_level = "";

        if ($scope.entry.last_check === 0) {
            $scope.alert_level = "alert alert-info";
            $scope.entry.host_status = "Pending";
        } else if ($scope.entry.state === 0) {
            $scope.alert_level = "alert alert-success";
            $scope.entry.host_status = "Host UP";
        } else {
            $scope.alert_level = "alert alert-danger";

            if ($scope.entry.childs.length !== 0) {
                $scope.entry.host_status = "Network outage";
            } else {
                $scope.entry.host_status = "Host down";
            }
        }
    }])

    .run(['tableConfig', function (tableConfig) {
        tableConfig.cellToFieldsMap.host_status = ['state', 'last_check', 'childs'];
    }]);
