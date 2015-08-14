/*global jQuery */

'use strict';

angular.module('bansho.textArea', [])
    .directive('banshoTextArea', [
        function () {
            return {
                restrict: 'E',
                scope: {
                    options: '='
                },
                templateUrl: 'components/directive/textArea/textArea.html',
                controller:['$scope', '$window', 'configManager',
                    function ($scope, $window, configManager) {
                        $scope.configuration = JSON.stringify(configManager.readLayoutConfig(), null, 4);
                        $scope.saveConfiguration = function () {
                            configManager.saveLayoutConfig(JSON.parse($scope.configuration));
                            $window.location.reload();
                        };
                    }
                ]
            };
        }
    ]);