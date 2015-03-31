'use strict';

angular.module('adagios.utils.promiseManager', [])

    .value('ajaxPromises', [])

    .service('addAjaxPromise', ['ajaxPromises', function (ajaxPromises) {
        return function (promise) {
            ajaxPromises.push(promise);
        };
    }])

    .service('clearAjaxPromises', ['$interval', 'ajaxPromises', function ($interval, ajaxPromises) {
        return function () {
            angular.forEach(ajaxPromises, function (promise) {
                $interval.cancel(promise);
            });
        };
    }])

    .service('clearAllPromises', ['ajaxPromises', 'clearAjaxPromises',
        function (ajaxPromises, clearAjaxPromises) {
            return function () {
                clearAjaxPromises();
            };
        }]);
