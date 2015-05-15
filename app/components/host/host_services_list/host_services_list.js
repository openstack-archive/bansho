'use strict';

angular.module('bansho.host.services_list', [])

    .controller('HostServicesListCtrl', ['$scope', 'backendClient', function ($scope, backendClient) {
        backendClient.getServicesByHost($scope.hostName).success(function (data) {
            $scope.services = data;
        });
    }])

    .directive('banshoHostServicesList', function () {
        return {
            restrict: 'E',
            compile: function (scope, element, attrs) {
                scope.hostName = attrs.hostName;
            },
            templateUrl: 'components/host/host_services_list/host_services_list.html',
            controller: 'HostServicesListCtrl'
        };
    });
