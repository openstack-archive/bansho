'use strict';

angular.module('bansho.templates.page')
    .controller('PageCtrl', ['$scope', '$routeParams', 'configManager', 'templateManager',
        function ($scope, $routeParams, configManager, templateManager) {
            templateManager.setLayout($scope.viewName);

            angular.forEach($routeParams, function (value, key) {
                templateManager.setPageParam(key, value);
            });

            $scope.components = templateManager.getLayoutComponents();
        }
    ]);

