'use strict';

angular.module('adagios.tactical', ['adagios.tactical.status_overview',
                                    'adagios.tactical.current_health',
                                    'adagios.tactical.top_alert_producers'
                                   ])

    .controller('TacticalCtrl', [function () {

        // Togglable tabs
        // Don't follow hyperlinks
        $('a[data-toggle="tab"]').on('click', function (evt) {
            evt.preventDefault();
        });
    }])

    .directive('adgTactical', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/tactical/tactical.html',
            controller: function ($scope, $attrs) {
                $scope.statusOverview = JSON.parse($attrs.statusOverview.toLowerCase());
                $scope.currentHealth = JSON.parse($attrs.currentHealth.toLowerCase());
                $scope.topAlertProducers = JSON.parse($attrs.topAlertProducers.toLowerCase());
            }
        };
    });
