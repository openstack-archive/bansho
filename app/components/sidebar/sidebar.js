'use strict';

angular.module('adagios.sidebar', [])

    .controller('SideBarCtrl', ['$scope', '$http', function ($scope, $http) {
        angular.noop();

        $scope.$on('$viewContentLoaded', AdagiosUI.closeSidebar());
    }])

    .directive('adgSidebar', function () {
        return {
            restrict: 'E',
            templateUrl: "components/sidebar/sidebar.html"
        };
    });
