/*global jQuery */

'use strict';

angular.module('bansho.form')
    .directive('banshoTextArea', [
        function () {
            return {
                restrict: 'E',
                scope: {
                    options: '='
                },
                templateUrl: 'components/directive/form/textArea/textArea.html',
                controller:['$scope', '$window', 'configManager',
                    function ($scope, configManager) {
                        $scope.configuration = JSON.stringify(configManager.readLayoutConfig(), null, 4);
                    }
                ]
            };
        }
    ]);