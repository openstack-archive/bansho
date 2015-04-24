'use strict';

angular.module('adagios.host.services_list', [])

    .controller('HostServicesListCtrl', ['$scope', function ($scope) {
        angular.noop();
    }])

    .directive('banshoHostServicesList', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/host/host_services_list/host_services_list.html'
        };
    });
