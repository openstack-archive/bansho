'use strict';

angular.module('bansho.title', [])
    .directive('banshoTitle', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/directive/title/title.html',
            scope: {
                options: '='
            }
        }
    });
