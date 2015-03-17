'use strict';

angular.module('adagios.sidebar', [])

    .controller('SideBarCtrl', ['$scope', '$location', function ($scope, $location) {
        $scope.getClass = function (path) {
            var class_name = "";

            if ($location.url().substr(0, path.length) === path) {
                class_name = "state--current";
            }

            return class_name;
        };
    }])

    .directive('adgSidebar', function () {
        return {
            restrict: 'E',
            templateUrl: "components/sidebar/sidebar.html"
        };
    });
