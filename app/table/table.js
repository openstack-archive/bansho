'use strict';

angular.module('adagios.table', ['ngRoute',
                                 'adagios.live'
                                 ])

    .controller('TableCtrl', ['$scope', 'GetServices', function ($scope, GetServices) {

        $scope.cellPathMapping = {
            duration: 'duration',
            host_name: 'host',
            last_check: 'last_check',
            service_check: 'service_check'
        };

        $scope.cells = ['host_name', 'duration', 'last_check'];

        console.log(new GetServices($scope.cells)
            .success(function (data) {
                $scope.entries = data;
            }));
    }])

    .directive('customTable', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'table/table.html'
        };
    })

    .directive('customCell', function () {
        return {
            restrict: 'E',
            link: function (scope, element, attrs) {
                var path = scope.cellPathMapping[attrs.type];

                scope.getTemplateUrl = function () {
                    if (path) {
                        return 'table/cell_' + path + '/cell_' + path + '.html';
                    }
                };
            },
            template: '<div ng-include="getTemplateUrl()"></div>'
        };
    });
