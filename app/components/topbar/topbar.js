'use strict';

angular.module('bansho.topbar', ['bansho.surveil'])

    .directive('banshoTopbar', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/topbar/topbar.html',
            controller: ['$scope', 'sharedData', 'authService', 'themeManager', 'pageParams',
                function ($scope, sharedData, authService, themeManager, pageParams) {
                    var refreshInterval = pageParams.refreshInterval ? pageParams.refreshInterval : 100000;

                    if (authService.isAuthenticated()) {
                        $scope.hostProblems = sharedData.getData('nbHostsOpenProblems', refreshInterval, function (data) {
                            $scope.hostProblems = data;
                        });

                        $scope.serviceProblems = sharedData.getData('nbServicesOpenProblems', refreshInterval, function (data) {
                            $scope.serviceProblems = data;
                            $scope.allProblems = serviceProblems + hostProblems;
                        });
                    }

                    $scope.logout = function () {
                        authService.logout();
                    };

                    $scope.switchTheme = function () {
                        themeManager.switchTheme();
                    };
                }]
        };
    });
