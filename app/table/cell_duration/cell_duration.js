'use strict';

angular.module('adagios.table.cell_duration', [])

    .controller('SideBarCtrl', ['$scope', '$http', function ($scope, $http) {
        return;
    }])

    .directive('sidebar', function () {
        return {
            restrict: 'E',
            templateUrl: "sidebar/sidebar.html"
        };
    });
