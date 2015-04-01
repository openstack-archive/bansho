'use strict';

angular.module('adagios.service.info', [])

    .controller('ServiceInfoCtrl', ['$scope', function ($scope) {
        $scope.acknowledged = $scope.data[0].acknowledged === "1" ? "Yes" : "No";
    }])

    .directive('adgServiceInfo', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/service/service_info/service_info.html'
        };
    });
