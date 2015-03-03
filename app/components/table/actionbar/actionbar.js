'use strict';

angular.module('adagios.table.actionbar', [])

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
            ],
			searchFilter: ""
        };
        return actionbarFilters;
    })

    .controller('TableActionbarCtrl', ['$scope', 'actionbarFilters', function ($scope, actionbarFilters) {
        $scope.actionbarFilters = actionbarFilters;
        $scope.actionbarFilters.activeFilter = $scope.actionbarFilters.possibleFilters[0];

        $scope.activateFilter = function (item) {
            $scope.actionbarFilters.activeFilter = $scope.actionbarFilters.possibleFilters[item];
        };
    }])

    .filter('actionbarSelectFilter', function () {
        return function (items, activeFilter) {
            var out = [];
            if (!!items) {
                if (activeFilter.name === "all") {
                    for (var i = 0; i < items.length; i++) {
                        out.push(items[i]);
                    }
                } else if (activeFilter.name === "all_ok") {
                    for (var i = 0; i < items.length; i++) {
                        if (items[i].state == 0) {
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

    .directive('adgTableActionbar', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/table/actionbar/actionbar.html'
        };
    });
