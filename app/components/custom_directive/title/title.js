'use strict';

angular.module('bansho.title', [])
    .directive('banshoTitle', ['sharedData', function (sharedData) {
        return {
            restrict: 'E',
            templateUrl: 'components/custom_directive/title/title.html',
            scope: {
                options: '='
            },
            link: function (scope) {
                if (scope.options.attributes.item) {
                    scope.item = scope.options.attributes.item;

                    scope.data = sharedData.getDataFromInputSource(scope.options.attributes.inputSource, true, null, false, function (data) {
                        scope.data = data;
                    });

                    scope.isBannerShown = true;
                }
            }
        };
    }]);
