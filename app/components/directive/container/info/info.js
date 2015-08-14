'use strict';

angular.module('bansho.container')
    .directive('banshoInfo', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/directive/container/info/info.html',
            link: function (scope) {
                scope.param = scope.$parent.param;
                angular.forEach(scope.components, function(component) {
                    if (component.type === 'info') {
                        scope.datamodels = component.attributes.datamodel;
                    }
                });

                angular.forEach(scope.datamodels, function (datamodel) {
                    scope.$parent.addDirectiveParamRequirements(datamodel);
                });
            }
        };
    });
