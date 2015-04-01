'use strict';

angular.module('adagios.topbar', ['adagios.live'])

    .controller('TopBarCtrl', ['$scope', 'getServiceProblems', function ($scope, getServiceProblems) {
        getServiceProblems().success(function (data) {
            $scope.serviceProblems = data.length;
        });
    }])

    .directive('adgTopbar', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/topbar/topbar.html'
        };
    });
