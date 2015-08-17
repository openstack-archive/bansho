'use strict';

angular.module('bansho.form', [])
    .directive('banshoForm', function () {
        return {
            restrict: 'E',
            scope: {
                options: '='
            },
            templateUrl: 'components/directive/form/form.html',
            controller: ['$scope',
                function ($scope) {
                    $scope.components = $scope.options.components;
                    $scope.saveConfiguration = function () {
                        configManager.saveLayoutConfig(JSON.parse($scope.configuration));
                        $window.location.reload();
                    };
                }]
        };
    });
