'use strict';

angular.module('bansho.customDirective.tactical')

    .directive('banshoCurrentHealth', ['$compile', '$rootScope', function ($compile, $rootScope) {
        return {
            restrict: 'E',
            templateUrl: 'components/customDirective/tactical/currentHealth/currentHealth.html',
            controller: ['$scope', '$element', function (scope, element) {
                $rootScope.$watch('themeClassSize', function(sizeclass) {
                    scope.themeClassSize = sizeclass;
                    //$compile(element.contents())(scope);
                });
            }]
        };
    }]);
