'use strict';

angular.module('bansho.host')
    .directive('banshoHostMain', function () {
        return {
            restrict: 'E',
            scope: {
                options: '='
            },
            templateUrl: 'components/directive/host/host_main/host_main.html',
            controller: ['$scope', 'hostSource', function ($scope, hostSource) {
                var handleSource = function (host) {
                    console.log(host)
                    $scope.host_name = host.host_host_name;

                };

                hostSource.registerDataChanged($scope.options.attributes.hostname, handleSource);


            }]
        };
    });
