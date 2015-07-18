'use strict';

angular.module('bansho.title', [])
    .directive('banshoTitle', ['sharedData', function (sharedData) {
        return {
            restrict: 'E',
            templateUrl: 'components/directive/title/title.html',
            scope: {
                options: '='
            },
            link: function (scope) {
                if (scope.options.attributes.item) {
                    scope.item = scope.options.attributes.item;
                    scope.data = sharedData.getData(scope.options.attributes.provider, 30000, function (data) {
                        scope.data = data;
                    });

                    scope.isBannerShown = true;
                }
            }
        }
    }]);
