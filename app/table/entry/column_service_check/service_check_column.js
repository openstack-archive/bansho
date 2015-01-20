'use strict';

angular.module('adagios.table.entry.column_service_check', [])

    .controller('SideBarCtrl', ['$scope', '$http', function ($scope, $http) {
        return;
    }])

    .directive('column', function (col_type) {
        return {
            restrict: 'E',
            templateUrl: "column/" + col_type + ".html"
        };
    });
