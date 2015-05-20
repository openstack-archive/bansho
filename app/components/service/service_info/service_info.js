'use strict';

angular.module('bansho.service.info', [])

    .controller('ServiceInfoCtrl', ['$scope', function ($scope) {
        $scope.isAcknowledged = $scope.acknowledged === "1" ? "Yes" : "No";
    }])

    .directive('banshoServiceInfo', function () {
        return {
            restrict: 'E',
            scope: {
              service: '=service'
            },
            templateUrl: 'components/service/service_info/service_info.html'
        };
    });
