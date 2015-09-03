/*global moment */
'use strict';

angular.module('bansho.filters')
    .filter('timeElapsed', [function () {
        return function (input) {
            return moment.unix(input).fromNow();
        };
    }]);

