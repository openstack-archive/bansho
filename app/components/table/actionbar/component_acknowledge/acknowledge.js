'use strict';

angular.module('bansho.table.actionbar')
    .directive('banshoActionbarAcknowledge', [function () {
        return {
            restrict: 'E',
            templateUrl: 'components/table/actionbar/component_acknowledge/acknowledge.html',
            scope: {
                tableId: '='
            },
            controller: ['$scope', 'tables', 'surveilActions', 'notifications',
                function ($scope, tables, surveilActions, notifications) {
                    $scope.isAcknowledgeFormShown = false;
                    $scope.switchAcknowledgeFormShown = function () {
                        $scope.isAcknowledgeFormShown = !$scope.isAcknowledgeFormShown;
                    };

                    $scope.acknowledgeProblems = function () {
                        angular.forEach($scope.tableId, function (tableId) {
                            tables.forEachCheckedEntry(tableId, function (entry) {
                                var service_description;

                                if ('description' in entry) {
                                    service_description = entry.description;
                                }

                                surveilActions.acknowledge(entry.host_name, service_description, $scope.attrs).then(function (data) {
                                        notifications.push('success', 'Acknowledgement', 'Acknowledged ' + entry.host_name);
                                    },
                                    function (error) {
                                        notifications.push('error', 'Acknowledgement', 'Could not acknowledge ' + entry.host_name);
                                    });
                            });

                            tables.setAllCheckTable(tableId, false);
                        });

                        $scope.isAcknowledgeFormShown = false;
                    };
                }
            ]
        };
    }]);


