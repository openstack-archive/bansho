'use strict';

angular.module('bansho.topbar')
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
                        $scope.nbHosts = sharedData.getDataFromInputSource('statusHostsOpenProblems', true, null, true, function (nbHosts) {
                            $scope.nbHosts = nbHosts;
                            $scope.allProblems = $scope.nbServices + $scope.nbHosts;
                        });

                        sharedData.getDataFromInputSource('statusServicesOpenProblems', true, null, true, function (nbServices) {
                            $scope.nbServices = nbServices;
                            $scope.allProblems = $scope.nbServices + $scope.nbHosts;
                        });

                        $scope.components = configManager.getConfigData('topbar').components;
                        $compile($element.contents())($scope);
                    });
                }]
        };
    });
