'use strict';

angular.module('bansho.surveil')
    .factory('surveilQuery', [
        function() {
            return function (fields, filters, paging, timeInterval) {
                var query = {};

                if (fields.length > 0) {
                    query.fields = JSON.stringify(fields);
                }
                query.filters = JSON.stringify(filters);

                // TODO handle paging and timeInterval

                return query;
            }
    }]);
