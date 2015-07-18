'use strict';

angular.module('bansho.tactical', ['bansho.surveil',
                                    'bansho.utils.promiseManager',
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
            controller: ['$scope', '$interval', 'surveilStatus', 'promisesManager',
                function ($scope, $interval, surveilStatus, promisesManager) {
                    $scope.title = $scope.options.attributes.title;

                    console.log($scope.options)
                    $scope.statusOverview = $scope.options.attributes.statusOverview;
                    $scope.currentHealth = $scope.options.attributes.currentHealth;
                    $scope.topAlertProducers = $scope.options.attributes.topAlertProducers;

                    var getData = function () {
                        surveilStatus.getNbHostOpenProblems().then(function (nbHostProblems) {
                            $scope.hostProblems = nbHostProblems;
                            surveilStatus.getNbHosts().then(function (nbHosts) {
                                $scope.totalHosts = nbHosts;
                                $scope.hostsRatio = ($scope.totalHosts - $scope.hostProblems) / $scope.totalHosts * 100;
                            });
                        });

                        surveilStatus.getNbServiceOpenProblems().then(function (nbServiceProblems) {
                            $scope.serviceProblems = nbServiceProblems;
                            surveilStatus.getNbServices().then(function (nbServices) {
                                $scope.totalServices = nbServices;
                                $scope.servicesRatio = ($scope.totalServices - $scope.serviceProblems) / $scope.totalServices * 100;
                            });
                        });
                    };

                    // TODO put tableGlobalConfig or something better
                    //if (tacticalConfig.refreshInterval !== 0) {
                    //    promisesManager.addAjaxPromise(
                    $interval(getData, 30000)
                    //    );
                    //}

                    getData();

                    // Togglable tabs
                    // Don't follow hyperlinks
                    $('a[data-toggle="tab"]').on('click', function (evt) {
                        evt.preventDefault();
                    });
                }
            ]
        };
    });
