'use strict';

angular.module('bansho.tactical', ['bansho.surveil',
                                    'bansho.tactical.status_overview',
                                    'bansho.tactical.current_health',
                                    'bansho.tactical.top_alert_producers'
                                   ])

    .directive('banshoTactical', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/directive/tactical/tactical.html',
            scope: {
                options: '='
            },
            controller: ['$scope', '$interval', 'surveilStatus', 'pageParams', 'sharedData',
                function ($scope, $interval, surveilStatus, pageParams, sharedData) {
                    var refreshInterval = pageParams.refreshInterval ? pageParams.refreshInterval : 100000;
                    $scope.title = $scope.options.attributes.title;

                    $scope.statusOverview = $scope.options.attributes.statusOverview;
                    $scope.currentHealth = $scope.options.attributes.currentHealth;
                    $scope.topAlertProducers = $scope.options.attributes.topAlertProducers;

                    $scope.totalHosts = sharedData.getData('nbHosts', refreshInterval, function (data) {
                        $scope.totalHosts = data;
                    });

                    $scope.hostProblems = sharedData.getData('nbHostsOpenProblems', refreshInterval, function (data) {
                        $scope.hostProblems = data;
                        $scope.hostsRatio = ($scope.totalHosts - $scope.hostProblems) / $scope.totalHosts * 100;
                    });

                    $scope.totalServices = sharedData.getData('nbServices', refreshInterval, function (data) {
                        $scope.totalServices = data;
                    });

                    $scope.serviceProblems = sharedData.getData('nbServicesOpenProblems', refreshInterval, function (data) {
                        $scope.serviceProblems = data;
                        $scope.servicesRatio = ($scope.totalServices - $scope.serviceProblems) / $scope.totalServices * 100;
                    });

                    // Togglable tabs
                    // Don't follow hyperlinks
                    $('a[data-toggle="tab"]').on('click', function (evt) {
                        evt.preventDefault();
                    });
                }
            ]
        };
    });
