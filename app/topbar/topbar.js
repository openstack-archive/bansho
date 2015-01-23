'use strict';

angular.module('adagios.topbar', ['adagios.live'])

    .controller('TopBarCtrl', ['$scope', '$http', 'GetProblems', function ($scope, $http, GetProblems) {
        $scope.notifications = GetProblems;
    }])

    .directive('adgTopbar', function () {
        return {
            restrict: 'E',
            templateUrl: "topbar/topbar.html"
        };
    });
