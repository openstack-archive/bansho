'use strict';

angular.module('bansho.customDirective.actionbar')
    .directive('banshoActionbarDowntime', [function () {
        return {
            restrict: 'E',
            templateUrl: 'components/customDirective/actionbar/component_downtime/downtime.html',
            scope: {
                options: '='
            },
            controller: ['$scope', 'datasource', 'surveilActions', 'notifications',
                function ($scope, datasource, surveilActions, notifications) {
                    $scope.datasourceId = $scope.options.attributes.datasourceId;

                    $scope.isDowntimeFormShown = false;
                    $scope.switchDowntimeFormShown = function () {
                        $scope.isDowntimeFormShown = !$scope.isDowntimeFormShown;
                    };

                    $scope.sendDowntime = function () {
                        angular.forEach($scope.options.attributes.datasourceId, function (datasourceId) {
                            datasource.forEachCheckedEntry(datasourceId, function (entry) {
                                surveilActions.downtime(entry.host_host_name, entry.service_service_description, $scope.attrs).then(function (data) {
                                        notifications.push('success', 'Downtime', 'Added downtime for ' + entry.host_host_name + ' ' + entry.service_service_description);
                                    },
                                    function (error) {
                                        notifications.push('error', 'Downtime', 'Could not add downtime for ' + entry.host_host_name + ' ' + entry.service_service_description);
                                    });
                            });

                            datasource.setAllCheckTable(datasourceId, false);
                        });

                        $scope.isDowntimeFormShown = false;
                    };
                }
            ]
        };
    }]);
