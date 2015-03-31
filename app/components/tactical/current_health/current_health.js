'use strict';

angular.module('adagios.tactical.current_health', ['adagios.live',
                                                   'ngJustGage'])

    .controller('TacticalCurrentHealth', ['$scope', 'getHostProblems', 'getServiceProblems', 'getTotalHosts', 'getTotalServices',
        function ($scope, getHostProblems, getServiceProblems, getTotalHosts, getTotalServices) {
            $scope.hostsRatio = 0;
            $scope.servicesRatio = 0;

            getHostProblems.success(function (data) {
                $scope.hostProblems = data.length;
                getTotalHosts.success(function (data) {
                    $scope.totalHosts = data.length;
                    $scope.hostsRatio = ($scope.totalHosts - $scope.hostProblems) / $scope.totalHosts * 100;
                });
            });

            getServiceProblems.success(function (data) {
                $scope.serviceProblems = data.length;
                getTotalServices.success(function (data) {
                    $scope.totalServices = data.length;
                    $scope.servicesRatio = ($scope.totalServices - $scope.serviceProblems) / $scope.totalServices * 100;
                });
            });
        }])

    .directive('adgCurrentHealth', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/tactical/current_health/current_health.html'
        };
    });
