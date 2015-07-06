'use strict';

angular.module('bansho.host.live', [])

    .controller('HostLiveCtrl', ['$scope', function ($scope) {
        angular.noop();
    }])

    .directive('banshoHostLive', function () {
        return {
            restrict: 'A',
            compile: function (scope, element, attrs) {
                scope.host = attrs.host;
            },
            templateUrl: 'components/host/host_live/host_live.html'
        };
    });
