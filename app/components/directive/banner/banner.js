'use strict';

angular.module('bansho.banner', ['bansho.datasource'])

    .directive('banshoBanner', ['datasource',
        function (datasource) {
            return {
                restrict: 'E',
                scope: {
                    options: '='
                },
                templateUrl: 'components/directive/banner/banner.html',
                controller: ['$scope', function ($scope) {
                    }]
            }
        }
    ])
