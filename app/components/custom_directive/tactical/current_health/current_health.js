'use strict';

angular.module('bansho.tactical.current_health', ['bansho.surveil',
                                                   'ngJustGage'])

    .directive('banshoCurrentHealth', ['$compile', '$rootScope', function ($compile, $rootScope) {
        return {
            restrict: 'E',
            templateUrl: 'components/custom_directive/tactical/current_health/current_health.html',
            controller: ['$scope', '$element', function (scope, element) {
                $rootScope.$watch('themeClassSize', function(sizeclass) {
                    scope.themeClassSize = sizeclass;
                    //$compile(element.contents())(scope);
                });
            }]
        };
    }]);
