/*global jQuery */

'use strict';

angular.module('bansho.view.config', [])
    .controller('ConfigCtrl', ['$scope', '$window', 'configManager',
        function ($scope, $window, configManager) {
            $scope.configuration = JSON.stringify(configManager.readLayoutConfig(), null, 4);

            $scope.saveConfiguration = function () {
                configManager.saveLayoutConfig(JSON.parse($scope.configuration));
                $window.location.reload();
            };
        }]);
