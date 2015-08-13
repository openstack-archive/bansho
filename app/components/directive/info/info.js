'use strict';

angular.module('bansho.info', [])
    .directive('banshoInfo', ['$interval', function ($interval) {
        return {
            restrict: 'E',
            templateUrl: 'components/directive/info/info.html',
            link: function (scope) {
                scope.param = scope.$parent.param;
                scope.datamodels = [];
                angular.forEach	(scope.components, function(component, key) {
                    if (component.type === 'info') {
                        scope.datamodels.push(component.attributes.datamodel);
                    }
                });
            }
        };
    }]);
