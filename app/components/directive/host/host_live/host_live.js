'use strict';

angular.module('bansho.host')
    .directive('banshoHostLive', function () {
        return {
            restrict: 'E',
            scope: {
                options: '='
            },
            templateUrl: 'components/directive/host/host_live/host_live.html',
            controller: ['$scope', 'hostSource', function ($scope, hostSource) {
                var handleSource = function (host) {
                    $scope.host_state = host.host_state;
                    $scope.host_plugin_output = host.host_plugin_output;
                };

                hostSource.registerDataChanged($scope.options.attributes.hostname, handleSource);
            }]
        };
    });
