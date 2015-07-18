'use strict';

angular.module('bansho.actionbar')
    .directive('banshoActionbarRecheck', [function () {
        return {
            restrict: 'EA',
            scope: {
                'tableId': '='
            },
            templateUrl: 'components/directive/actionbar/component_recheck/recheck.html',
            controller: ['$scope', 'datasource', 'surveilActions', 'notifications',
                function ($scope, datasource, surveilActions, notifications) {
                    $scope.sendRecheck = function () {
                        angular.forEach($scope.tableId, function (tableId) {
                            datasource.forEachCheckedEntry(tableId, function (entry) {
                                surveilActions.recheck(entry.host_host_name, entry.service_service_description).then(function (data) {
                                        notifications.push('success', 'Recheck', 'Scheduled recheck for ' + entry.host_host_name + ' ' + entry.service_service_description);
                                    },
                                    function (error) {
                                        notifications.push('error', 'Recheck', 'Could not schedule recheck for ' + entry.host_host_name + ' ' + entry.service_service_description);
                                    });
                            });

                            datasource.setAllCheckTable(tableId, false);
                        });
                    };
                }
            ]
        };
    }]);
