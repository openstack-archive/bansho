'use strict';

angular.module('adagios.table.entry', ['adagios.table.entry.column_duration',
                                       'adagios.table.entry.column_host',
                                       'adagios.table.entry.column_last_check',
                                       'adagios.table.entry.column_service_check'
                                      ])

    .controller('EntryCtrl', ['$scope', '$http', function ($scope, $http) {
        return;
    }])

    .directive('entry', function () {
        return {
            restrict: 'E',
            templateUrl: "table/entry/entry.html"
        };
    });
