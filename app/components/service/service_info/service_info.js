'use strict';

angular.module('adagios.service.info', [])

    .controller('ServiceInfoCtrl', ['$scope', function ($scope) {
    }])

    .directive('adgServiceInfo', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/service/service_info/service_info.html'
        };
    });
