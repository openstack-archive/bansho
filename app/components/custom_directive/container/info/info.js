'use strict';

angular.module('bansho.container')
    .directive('banshoInfo', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/custom_directive/container/info/info.html',
            link: function (scope) {
                scope.param = scope.$parent.param;
                angular.forEach(scope.components, function(component) {
                    if (component.type === 'info') {
                        scope.inputSources = component.attributes.inputSource;
                    }
                });

                angular.forEach(scope.inputSources, function (inputSource) {
                    scope.$parent.addDirectiveParamRequirements(inputSource);
                });
            }
        };
    });
