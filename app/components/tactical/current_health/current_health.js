'use strict';

angular.module('adagios.tactical.current_health', ['adagios.live',
                                                   'ngJustGage'])

    .controller('TacticalCurrentHealth', ['$scope', 'getHostProblems', 'getServiceProblems', 'getTotalHosts', 'getTotalServices',
        function ($scope, getHostProblems, getServiceProblems, getTotalHosts, getTotalServices) {
            getHostProblems.success(function (data) {
                $scope.hostProblems = data.length;
                getTotalHosts.success(function (data) {
                    $scope.totalHosts = data.length;
                    $scope.hosts = ($scope.totalHosts - $scope.hostProblems) / $scope.totalHosts * 100;
                });
            });

            getServiceProblems.success(function (data) {
                $scope.serviceProblems = data.length;
                getTotalServices.success(function (data) {
                    $scope.totalServices = data.length;
                    $scope.services = ($scope.totalServices - $scope.serviceProblems) / $scope.totalServices * 100;
                });
            });
        }])

    .directive('adgCurrentHealth', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/tactical/current_health/current_health.html'
        };
    });
