'use strict';

angular.module('bansho.table.actionbar')
    .directive('banshoActionbarDowntime', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/table/actionbar/component_downtime/downtime.html',
            scope: {
                tableId: '='
            },
            controller: ['$scope', 'tables', 'surveilActions', 'notifications',
                function ($scope, tables, surveilActions, notifications) {
                    $scope.isDowntimeFormShown = false;
                    $scope.switchDowntimeFormShown = function () {
                        $scope.isDowntimeFormShown = !$scope.isDowntimeFormShown;
                    };

                    $scope.sendDowntime = function () {
                        angular.forEach($scope.tableId, function (tableId) {
                            tables.getCheckedEntries(tableId, function (entry) {
                                var service_description;

                                if ('description' in entry) {
                                    service_description = entry.description;
                                }

                                surveilActions.downtime(entry.host_name, service_description, $scope.attrs).then(function (data) {
                                        notifications.push('success', 'Downtime', 'Added downtime for ' + entry.host_name);
                                    },
                                    function (error) {
                                        notifications.push('error', 'Downtime', 'Could not add downtime for ' + entry.host_name);
                                    });
                            });

                            tables.setAllCheckTable(tableId, false);
                        });

                        $scope.isDowntimeFormShown = false;
                    };
                }
            ]
        };
    });
