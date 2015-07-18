'use strict';

angular.module('bansho.actionbar')
    .directive('banshoActionbarDowntime', [function () {
        return {
            restrict: 'E',
            templateUrl: 'components/directive/actionbar/component_downtime/downtime.html',
            scope: {
                options: '='
            },
            controller: ['$scope', 'datasource', 'surveilActions', 'notifications',
                function ($scope, datasource, surveilActions, notifications) {
                    $scope.tableId = $scope.options.attributes.tableId;

                    $scope.isDowntimeFormShown = false;
                    $scope.switchDowntimeFormShown = function () {
                        $scope.isDowntimeFormShown = !$scope.isDowntimeFormShown;
                    };

                    $scope.sendDowntime = function () {
                        angular.forEach($scope.options.attributes.tableId, function (tableId) {
                            datasource.forEachCheckedEntry(tableId, function (entry) {
                                surveilActions.downtime(entry.host_name, entry.service_description, $scope.attrs).then(function (data) {
                                        notifications.push('success', 'Downtime', 'Added downtime for ' + entry.host_name + ' ' + entry.service_description);
                                    },
                                    function (error) {
                                        notifications.push('error', 'Downtime', 'Could not add downtime for ' + entry.host_name + ' ' + entry.service_description);
                                    });
                            });

                            datasource.setAllCheckTable(tableId, false);
                        });

                        $scope.isDowntimeFormShown = false;
                    };
                }
            ]
        };
    }]);
