'use strict';

angular.module('bansho.service.live', [])

    .controller('ServiceLiveCtrl', ['$scope', function ($scope) {
        angular.noop();
    }])

    .directive('banshoServiceLive', function () {
        return {
            restrict: 'E',
            scope: {
              service: '=service'
            },
            templateUrl: 'components/service/service_live/service_live.html',
            controller: 'ServiceLiveCtrl'

        };
    });
