'use strict';

angular.module('adagios.topbar', ['adagios.live'])

    .controller('TopBarCtrl', ['$scope', '$http', 'getProblems', function ($scope, $http, getProblems) {
        $scope.notifications = getProblems;
    }])

    .directive('adgTopbar', function () {
        return {
            restrict: 'E',
            templateUrl: "topbar/topbar.html"
        };
    });
