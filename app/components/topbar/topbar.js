'use strict';

angular.module('bansho.topbar', ['bansho.surveil'])

    .directive('banshoTopbar', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/topbar/topbar.html',
            controller: ['$scope', '$timeout', 'authService', 'themeManager',
                function ($scope, $timeout, authService, themeManager) {
                    $scope.logout = function () {
                        authService.logout();
                    };

                    $scope.switchTheme = function () {
                        themeManager.switchTheme();
                    };
                }]
        };
    });
