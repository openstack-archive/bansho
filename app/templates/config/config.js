/*global jQuery */

'use strict';

angular.module('bansho.view.config', [])
    .controller('ConfigCtrl', ['$scope', '$window', 'configManager',
        function ($scope, $window, configManager) {
            $scope.configuration = JSON.stringify(configManager.readConfig(),null,4);

            $scope.saveConfiguration = function () {
                configManager.saveConfig(JSON.parse($scope.configuration));
                $window.location.reload();
            };
        }]);
