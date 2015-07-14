'use strict';

angular.module('bansho.table.actionbar')
    .directive('banshoActionbarRecheck', function () {
        return {
            restrict: 'EA',
            scope: {
                'tableId': '='
            },
            templateUrl: 'components/table/actionbar/component_recheck/recheck.html',
            controller: ['$scope', 'tables', 'surveilActions', 'notifications',
                function ($scope, tables, surveilActions, notifications) {
                    $scope.sendRecheck = function () {
                        angular.forEach($scope.tableId, function (tableId) {
                            tables.forEachCheckedEntry(tableId, function (entry) {
                                var service_description;

                                if ('description' in entry) {
                                    service_description = entry.description;
                                }

                                surveilActions.recheck(entry.host_name, service_description).then(function (data) {
                                        notifications.push('success', 'Recheck', 'Scheduled recheck for ' + entry.host_name);
                                    },
                                    function (error) {
                                        notifications.push('error', 'Recheck', 'Could not schedule recheck for ' + entry.host_name);
                                    });
                            });

                            tables.setAllCheckTable(tableId, false);
                        });
                    };
                }
            ]
        };
    });
