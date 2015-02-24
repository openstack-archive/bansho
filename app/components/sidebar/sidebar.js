'use strict';

angular.module('adagios.sidebar', [])

    .controller('SideBarCtrl', ['$scope', '$location', function ($scope, $location) {
        $scope.getClass = function(path) {
            if ($location.path().substr(0, path.length) == path) {
              return "state--current"
            } else {
              return ""
            }
        }
    }])

    .directive('adgSidebar', function () {
        return {
            restrict: 'E',
            templateUrl: "components/sidebar/sidebar.html"
        };
    });
