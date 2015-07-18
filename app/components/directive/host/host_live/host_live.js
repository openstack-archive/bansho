'use strict';

angular.module('bansho.host.live', [])

    .controller('HostLiveCtrl', ['$scope', function ($scope) {
        angular.noop();
    }])

    .directive('banshoHostLive', function () {
        return {
            restrict: 'E',
            compile: function (scope, element, attrs) {
                scope.host = attrs.host;
            },
            templateUrl: '..//host_live/host_live.html'
        };
    });
