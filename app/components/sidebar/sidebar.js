'use strict';

angular.module('adagios.sidebar', [])

    .controller('SideBarCtrl', [function () {
        angular.noop();
    }])

    .directive('adgSidebar', function () {
        return {
            restrict: 'E',
            templateUrl: "components/sidebar/sidebar.html"
        };
    });
