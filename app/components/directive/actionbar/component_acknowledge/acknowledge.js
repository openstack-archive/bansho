'use strict';

angular.module('bansho.actionbar')
    .directive('banshoActionbarAcknowledge', [function () {
        return {
            restrict: 'E',
            templateUrl: 'components/directive/actionbar/component_acknowledge/acknowledge.html',
            scope: {
                options: '='
            },
            controller: ['$scope', 'datasource', 'surveilActions', 'notifications',
                function ($scope, datasource, surveilActions, notifications) {
                    $scope.isAcknowledgeFormShown = false;
                    $scope.switchAcknowledgeFormShown = function () {
                        $scope.isAcknowledgeFormShown = !$scope.isAcknowledgeFormShown;
                    };

                    $scope.acknowledgeProblems = function () {
                        angular.forEach($scope.options.attributes.datasourceId, function (datasourceId) {
                            datasource.forEachCheckedEntry(datasourceId, function (entry) {
                                surveilActions.acknowledge(entry.host_host_name, entry.service_service_description, $scope.attrs).then(function (data) {
                                        notifications.push('success', 'Acknowledgement', 'Acknowledged ' + entry.host_host_name + ' ' + entry.service_service_description);
                                    },
                                    function (error) {
                                        notifications.push('error', 'Acknowledgement', 'Could not acknowledge ' + entry.host_host_name + ' ' + entry.service_service_description);
                                    });
                            });

                            datasource.setAllCheckTable(datasourceId, false);
                        });

                        $scope.isAcknowledgeFormShown = false;
                    };
                }
            ]
        };
    }]);


