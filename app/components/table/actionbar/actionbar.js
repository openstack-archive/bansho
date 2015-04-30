'use strict';

angular.module('bansho.table.actionbar', ['bansho.table',
                                          'bansho.live'])

    .factory('actionbarFilters', function () {
        var actionbarFilters = {
            activeFilter: {},
            possibleFilters: [
                {
                    text: "All",
                    name: "all"
                },
                {
                    text: "All OK",
                    name: "all_ok"
                },
                {
                    text: "All Acknowledged",
                    name: "all_acknowledged"
                },
                {
                    text: "All in Downtime",
                    name: "all_downtime"
                }
            ]
        };
        return actionbarFilters;
    })

    .controller('TableActionbarCtrl', ['$scope', '$filter', 'backendClient', 'actionbarFilters', 'tablesConfig',
        function ($scope, $filter, backendClient, actionbarFilters, tablesConfig, actionbarSelectFilter) {
            $scope.actionbarFilters = actionbarFilters;
            $scope.actionbarFilters.activeFilter = $scope.actionbarFilters.possibleFilters[0];
            $scope.ackFormIsOpen = false;

            $scope.acknowledgeData = {};
            $scope.acknowledgeData.author = 'anonymous';
            $scope.acknowledgeData.comment = 'No comment';
            $scope.acknowledgeData.sticky = '1';
            $scope.acknowledgeData.notify = '0';
            $scope.acknowledgeData.persistent = '1';

            $scope.acknowledgeProblems = function () {
                angular.forEach(tablesConfig, function (tableConfig) {
                    var entries = $filter('filter')(tableConfig.entries,
                                                    $scope.actionbarFilters.searchFilter);

                    angular.forEach(entries, function (entry) {
                        var service_description = undefined;

                        if (entry.is_checked) {
                            if ('description' in entry) {
                                service_description = entry.description;
                            }

                            backendClient.acknowledge(entry.host_name, service_description, $scope.acknowledgeData)
                                .error(function (data) {
                                    throw new Error('Acknowledge request failed');
                                });
                        }
                    });
                });
            };

            $scope.activateFilter = function (item) {
                $scope.actionbarFilters.activeFilter = $scope.actionbarFilters.possibleFilters[item];
            };
        }])

    .filter('actionbarSelectFilter', function () {
        return function (items, activeFilter) {
            var out = [],
                i;

            if (!!activeFilter) {
                return items;
            }

            if (!!items) {
                if (activeFilter.name === "all") {
                    for (i = 0; i < items.length; i += 1) {
                        out.push(items[i]);
                    }
                } else if (activeFilter.name === "all_ok") {
                    for (i = 0; i < items.length; i += 1) {
                        if (items[i].state === 0) {
                            out.push(items[i]);
                        }
                    }
                } else if (activeFilter.name === "all_acknowledged") {
                    // TODO Implement this
                    console.log("This filter is not yet implemented");
                } else if (activeFilter.name === "all_downtime") {
                    // TODO Implement this
                    console.log("This filter is not yet implemented");
                }
            }
            return out;
        };
    })

    .directive('banshoTableActionbar', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/table/actionbar/actionbar.html'
        };
    });
