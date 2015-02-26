'use strict';

angular.module('adagios.tactical', ['adagios.tactical.status_overview',
                                    'adagios.tactical.current_health',
                                    'adagios.tactical.top_alert_producers'
                                   ])

    .value('tacticalConfig', {})

    .controller('TacticalCtrl', ['$scope', 'tacticalConfig', function ($scope, tacticalConfig) {

        $scope.statusOverview = tacticalConfig.statusOverview;
        $scope.currentHealth = tacticalConfig.currentHealth;
        $scope.topAlertProducers = tacticalConfig.topAlertProducers;

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
