'use strict';

angular.module('bansho.service.info', [])

    .controller('ServiceInfoCtrl', ['$scope', function ($scope) {
        $scope.acknowledged = $scope.data[0].acknowledged === "1" ? "Yes" : "No";
    }])

    .directive('banshoServiceInfo', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/service/service_info/service_info.html'
        };
    });
