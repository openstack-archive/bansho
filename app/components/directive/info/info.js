'use strict';

angular.module('bansho.info', [])
    .directive('banshoInfo', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/directive/info/info.html',
            link: function (scope) {
                scope.param = scope.$parent.param;
                angular.forEach	(scope.components, function(component) {
                    if (component.type === 'info') {
                        scope.datamodels = component.attributes.datamodel;
                    }
                });
            }
        };
    });
