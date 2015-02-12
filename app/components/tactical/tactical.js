'use strict';

angular.module('adagios.tactical', ['adagios.tactical.status_overview',
                                    'adagios.tactical.current_health',
                                    'adagios.tactical.top_alert_producers',
                                    'adagios.table'
                                   ])

    .controller('TacticalCtrl', ['$scope', '$http', function ($scope, $http) {

        // Togglable tabs
        // Don't follow hyperlinks
        $('a[data-toggle="tab"]').on('click', function(evt) {
            evt.preventDefault();
        });
    }]);
