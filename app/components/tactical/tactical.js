'use strict';

angular.module('bansho.tactical', ['bansho.live',
                                    'bansho.utils.promiseManager',
                                    'bansho.tactical.status_overview',
                                    'bansho.tactical.current_health',
                                    'bansho.tactical.top_alert_producers'
                                   ])

    .value('tacticalConfig', {})

    .value('TacticalConfigObj', function (config) {
        this.title = config.title;
        this.statusOverview = config.components.statusOverview;
        this.currentHealth = config.components.currentHealth;
        this.topAlertProducers = config.components.topAlertProducers;
    })

    .controller('TacticalCtrl', ['$scope', '$interval', 'tacticalConfig', 'backendClient', 'promisesManager',
        function ($scope, $interval, tacticalConfig, backendClient, promisesManager) {

            var getData;

            $scope.statusOverview = tacticalConfig.statusOverview;
            $scope.currentHealth = tacticalConfig.currentHealth;
            $scope.topAlertProducers = tacticalConfig.topAlertProducers;

            $scope.hostsRatio = undefined;
            $scope.servicesRatio = undefined;
            $scope.hostProblems = undefined;
            $scope.totalHosts = undefined;
            $scope.serviceProblems = undefined;
            $scope.totalServices = undefined;

            getData = function () {
                backendClient.getHostProblems().success(function (hostProblems) {
                    $scope.hostProblems = hostProblems.length;
                    backendClient.getTotalHosts().success(function (allHosts) {
                        $scope.totalHosts = allHosts.length;
                        $scope.hostsRatio = ($scope.totalHosts - $scope.hostProblems) / $scope.totalHosts * 100;
                    });
                });

                backendClient.getServiceProblems().success(function (serviceProblems) {
                    $scope.serviceProblems = serviceProblems.length;
                    backendClient.getTotalServices().success(function (allServices) {
                        $scope.totalServices = allServices.length;
                        $scope.servicesRatio = ($scope.totalServices - $scope.serviceProblems) / $scope.totalServices * 100;
                    });
                });
            };

            if (tacticalConfig.refreshInterval !== 0) {
                promisesManager.addAjaxPromise(
                    $interval(getData, tacticalConfig.refreshInterval)
                );
            }

            getData();

            // Togglable tabs
            // Don't follow hyperlinks
            $('a[data-toggle="tab"]').on('click', function (evt) {
                evt.preventDefault();
            });
        }])

    .directive('banshoTactical', ['tacticalConfig', function (tacticalConfig) {
        return {
            restrict: 'E',
            templateUrl: 'components/tactical/tactical.html',
            compile: function compile() {
                return {
                    pre: function preLink(scope, iElement, iAttrs, controller) {
                        // This is the earliest phase during which attributes are evaluated
                        tacticalConfig.statusOverview = JSON.parse(iAttrs.statusOverview);
                        tacticalConfig.currentHealth = JSON.parse(iAttrs.currentHealth);
                        tacticalConfig.topAlertProducers = JSON.parse(iAttrs.topAlertProducers);
                        tacticalConfig.refreshInterval = parseInt(iAttrs.refreshInterval * 1000, 10);
                    }
                };
            }
        };
    }]);
