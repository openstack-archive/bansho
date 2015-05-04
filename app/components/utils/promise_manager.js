'use strict';

angular.module('bansho.utils.promiseManager', [])

    .service('promisesManager', ['$interval', function ($interval) {
        var ajaxPromises = [];

        function clearAjaxPromises () {
            angular.forEach(ajaxPromises, function (promise) {
                $interval.cancel(promise);
            });
        }

        /**
         * Add a new promise to check
         * @param promise
         */
        this.addAjaxPromise = function (promise) {
            ajaxPromises.push(promise);
        };

        /**
         * Clear all types of promises
         */
        this.clearAllPromises = function () {
            clearAjaxPromises();
        };
    }]);
