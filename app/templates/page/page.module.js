'use strict';

angular.module('bansho.templates.page', ['bansho.templates'])
    .controller('PageCtrl', ['$scope', '$routeParams', 'templateManager',
        function ($scope, $routeParams, templateManager) {
            templateManager.setLayout($scope.viewName);

            angular.forEach($routeParams, function (value, key) {
                templateManager.setPageParam(key, value);
            });

            $scope.components = templateManager.getLayoutComponents();
        }
    ]);

