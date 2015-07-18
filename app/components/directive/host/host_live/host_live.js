'use strict';

angular.module('bansho.host')
    .directive('banshoHostLive', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/directive/host/host_live/host_live.html',
        };
    });
