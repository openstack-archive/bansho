'use strict';

angular.module('adagios.tactical', ['adagios.tactical.status_overview',
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

    .controller('TacticalCtrl', ['$scope', 'tacticalConfig', 'getHostProblems', 'getServiceProblems',
        'getTotalHosts', 'getTotalServices',
        function ($scope, tacticalConfig, getHostProblems, getServiceProblems, getTotalHosts, getTotalServices) {
            $scope.statusOverview = tacticalConfig.statusOverview;
            $scope.currentHealth = tacticalConfig.currentHealth;
            $scope.topAlertProducers = tacticalConfig.topAlertProducers;

            $scope.hostsRatio = 0;
            $scope.servicesRatio = 0;
            $scope.hostProblems = 0;
            $scope.totalHosts = 0;
            $scope.serviceProblems = 0;
            $scope.totalServices = 0;

            getHostProblems.success(function (data) {
                $scope.hostProblems = data.length;
                getTotalHosts.success(function (data) {
                    $scope.totalHosts = data.length;
                    $scope.hostsRatio = ($scope.totalHosts - $scope.hostProblems) / $scope.totalHosts * 100;
                });
            });

            getServiceProblems.success(function (data) {
                $scope.serviceProblems = data.length;
                getTotalServices.success(function (data) {
                    $scope.totalServices = data.length;
                    $scope.servicesRatio = ($scope.totalServices - $scope.serviceProblems) / $scope.totalServices * 100;
                });
            });

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
                        tacticalConfig.statusOverview = JSON.parse(iAttrs.statusOverview.toLowerCase());
                        tacticalConfig.currentHealth = JSON.parse(iAttrs.currentHealth.toLowerCase());
                        tacticalConfig.topAlertProducers = JSON.parse(iAttrs.topAlertProducers.toLowerCase());
                    }
                };
            }
        };
    }]);
