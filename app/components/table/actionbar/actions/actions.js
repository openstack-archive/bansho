'use strict';

angular.module('bansho.table.actionbar')

    .directive('banshoAcknowledgeForm', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/table/actionbar/actions/acknowledge_form.html',
            scope: {
                isShown: '='
            },
            controller: ['$scope', 'tables', 'surveilActions', 'notifications',
                function ($scope, tables, surveilActions, notifications) {
                    $scope.acknowledgeProblems = function () {
                        angular.forEach($scope.tableId, function (tableId) {
                            tables.getCheckedEntries(tableId, function (entry) {
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
                        });

                        $scope.isShown = false;
                    }
                }
            ]
        }
    })

    .directive('banshoDowntimeForm', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/table/actionbar/actions/downtime_form.html',
            scope: {
                isShown: '='
            },
            controller: ['$scope', 'tables', 'surveilActions', 'notifications',
                function ($scope, tables, surveilActions, notifications) {
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
                            })
                        });

                        $scope.isShown = false;
                    };
                }
            ]
        }
    })

    .directive('banshoRecheckButton', function () {
        return {
                restrict: 'E',
                templateUrl: 'components/table/actionbar/actions/recheck_button.html',
                controller: ['$scope', 'tables', 'surveilActions', 'notifications',
                    function ($scope, tables, surveilActions, notifications) {

                        $scope.sendRecheck = function () {
                            angular.forEach($scope.tableId, function (tableId) {
                                tables.getCheckedEntries(tableId, function (entry) {
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
                            })
                        }
                    }
                ]
            }
        });
