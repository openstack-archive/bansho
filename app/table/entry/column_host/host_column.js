'use strict';

angular.module('adagios.table.entry.column_host', [])

    .controller('SideBarCtrl', ['$scope', '$http', function ($scope, $http) {
        return;
    }])

    .directive('sidebar', function () {
        return {
            restrict: 'E',
            templateUrl: "sidebar/sidebar.html"
        };
    });
