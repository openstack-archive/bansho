'use strict';

angular.module('bansho.topbar', ['bansho.surveil'])

    .directive('banshoTopbar', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/topbar/topbar.html',
            controller: ['$compile', '$element', '$scope', 'authService', 'themeManager', 'viewsTemplate', 'sharedData', 'configManager',
                function ($compile, $element, $scope, authService, themeManager, viewsTemplate, sharedData, configManager) {
                    $scope.logout = function () {
                        authService.logout();
                    };

                    $scope.switchTheme = function () {
                        themeManager.switchTheme();
                    };

                    $scope.setSize = function (size) {
                        themeManager.setSize(size);
                    };

                    authService.registerOnLogin(function () {
                        $scope.allProblems = sharedData.getData('nbServicesHostsOpenProblems', function (data) {
                            $scope.allProblems = data;
                        });

                        $scope.components = configManager.getConfigData('topbar').components;
                        $compile($element.contents())($scope);
                    });
                }]
        };
    });
