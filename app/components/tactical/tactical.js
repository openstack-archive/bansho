'use strict';

angular.module('adagios.tactical', ['adagios.live',
                                    'adagios.utils.promiseManager',
                                    'adagios.tactical.status_overview',
                                    'adagios.tactical.current_health',
                                    'adagios.tactical.top_alert_producers'
                                   ])

    .value('tacticalConfig', {})

    .value('TacticalConfigObj', function (config) {
        this.title = config.title;
        this.statusOverview = config.components.statusOverview;
        this.currentHealth = config.components.currentHealth;
        this.topAlertProducers = config.components.topAlertProducers;
    })

    .controller('TacticalCtrl', ['$scope', '$interval', 'tacticalConfig', 'getHostProblems', 'getServiceProblems',
        'getTotalHosts', 'getTotalServices', 'addAjaxPromise',
        function ($scope, $interval, tacticalConfig, getHostProblems, getServiceProblems, getTotalHosts,
            getTotalServices, addAjaxPromise) {

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
                getHostProblems().success(function (hostProblems) {
                    $scope.hostProblems = hostProblems.length;
                    getTotalHosts().success(function (allHosts) {
                        $scope.totalHosts = allHosts.length;
                        $scope.hostsRatio = ($scope.totalHosts - $scope.hostProblems) / $scope.totalHosts * 100;
                    });
                });

                getServiceProblems().success(function (serviceProblems) {
                    $scope.serviceProblems = serviceProblems.length;
                    getTotalServices().success(function (allServices) {
                        $scope.totalServices = allServices.length;
                        $scope.servicesRatio = ($scope.totalServices - $scope.serviceProblems) / $scope.totalServices * 100;
                    });
                });
            };

            if (tacticalConfig.refreshInterval !== 0) {
                addAjaxPromise(
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

    .directive('adgTactical', ['tacticalConfig', function (tacticalConfig) {
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
