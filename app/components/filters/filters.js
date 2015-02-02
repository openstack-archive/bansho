'use strict';

angular.module('adagios.filters', [])

    .filter('timeElapsed', [function () {
        return function (input) {
            return moment.unix(input).fromNow();
        };
    }]);
