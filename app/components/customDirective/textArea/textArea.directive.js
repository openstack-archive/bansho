'use strict';

angular.module('bansho.customDirective.textArea')
    .directive('banshoTextArea', [
        function () {
            return {
                restrict: 'E',
                scope: {
                    options: '='
                },
                templateUrl: 'components/directive/text_area/text_area.html',
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
