'use strict';

angular.module('bansho.service.main', [])

    .controller('ServiceMainCtrl', ['$scope', function ($scope) {
        angular.noop();
    }])

    .directive('banshoServiceMain', function () {
        return {
            restrict: 'A',
            scope: {
              service: '=service'
            },
            templateUrl: 'components/service/service_main/service_main.html',
            controller: 'ServiceMainCtrl'

        };
    });
