/*global jQuery */

'use strict';

angular.module('bansho.view.singleTable')
    .controller('HostConfigCtrl', ['$scope', '$window', 'hostconfigManager',
        function ($scope, $window, hostconfigManager) {
            $scope.configuration = JSON.stringify(hostconfigManager.readConfig(),null,4);

            $scope.saveConfiguration = function () {
                configManager.saveConfig(JSON.parse($scope.configuration));
                $window.location.reload();
            };
        }]);
