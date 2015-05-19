'use strict';

angular.module('bansho.table.actionbar')

    .directive('banshoAcknowledgeForm', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/table/actionbar/actions/acknowledge_form.html',
            scope: {
                isShown: '='
            },
            controller: 'banshoAcknowledgeFormCtrl'
        };
    })

    .controller('banshoAcknowledgeFormCtrl',
        ['$scope', '$filter', 'tablesConfig', 'actionbarFilters', 'backendClient', 'notifications',
        function ($scope, $filter, tablesConfig, actionbarFilters, backendClient, notifications) {

        $scope.acknowledgeProblems = function () {
            angular.forEach(tablesConfig, function (table) {
                var entries = $filter('filter')(table.entries,
                    actionbarFilters.searchFilter);
                table.isCheckAll = false;

                angular.forEach(entries, function (entry) {
                    var service_description;

                    if (entry.is_checked) {
                        entry.is_checked = false;
                        if ('description' in entry) {
                            service_description = entry.description;
                        }

                        backendClient.acknowledge(entry.host_name, service_description, $scope.attrs).then(function (data) {
                            notifications.push('success', 'Acknowledgement', 'Acknowledged ' + entry.host_name);
                        },
                        function (error) {
                            notifications.push('error', 'Acknowledgement', 'Could not acknowledge ' + entry.host_name);
                        });
                    }
                });
            });
            $scope.isShown = false;
        };
    }])

    .directive('banshoDowntimeForm', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/table/actionbar/actions/downtime_form.html',
            scope: {
                isShown: '='
            },
            controller: 'banshoDowntimeFormCtrl'
        };
    })

    .controller('banshoDowntimeFormCtrl',
        ['$scope', '$filter', 'tablesConfig', 'actionbarFilters', 'backendClient', 'notifications',
        function ($scope, $filter, tablesConfig, actionbarFilters, backendClient, notifications) {

        $scope.sendDowntime = function () {
            angular.forEach(tablesConfig, function (table) {
                var entries = $filter('filter')(table.entries, actionbarFilters.searchFilter);
                table.isCheckAll = false;

                angular.forEach(entries, function (entry) {
                    var service_description;

                    if (entry.is_checked) {
                        entry.is_checked = false;
                        if ('description' in entry) {
                            service_description = entry.description;
                        }

                        backendClient.downtime(entry.host_name, service_description, $scope.attrs).then(function (data) {
                            notifications.push('success', 'Downtime', 'Added downtime for ' + entry.host_name);
                        },
                        function (error) {
                            notifications.push('error', 'Downtime', 'Could not add downtime for ' + entry.host_name);
                        });
                    }
                });
            });
            $scope.isShown = false;
        };
    }])

    .directive('banshoRecheckButton', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/table/actionbar/actions/recheck_button.html',
            controller: 'banshoRecheckButtonCtrl'
        };
    })

    .controller('banshoRecheckButtonCtrl',
        ['$scope', '$filter', 'tablesConfig', 'actionbarFilters', 'backendClient', 'notifications',
        function ($scope, $filter, tablesConfig, actionbarFilters, backendClient, notifications) {

        $scope.sendRecheck = function () {
            angular.forEach(tablesConfig, function (table) {
                var entries = $filter('filter')(table.entries, actionbarFilters.searchFilter);
                table.isCheckAll = false;

                angular.forEach(entries, function (entry) {
                    var service_description;

                    if (entry.is_checked) {
                        entry.is_checked = false;
                        if ('description' in entry) {
                            service_description = entry.description;
                        }

                        backendClient.recheck(entry.host_name, service_description).then(function (data) {
                            notifications.push('success', 'Recheck', 'Scheduled recheck for ' + entry.host_name);
                        },
                        function (error) {
                            notifications.push('error', 'Recheck', 'Could not schedule recheck for ' + entry.host_name);
                        });
                    }
                });
            });
        };
    }]);
