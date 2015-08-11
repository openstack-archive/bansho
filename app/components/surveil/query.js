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

                if (paging && paging.size >=0 && paging.page >=0) {
                    query.paging = paging;
                }

                // TODO handle timeInterval

                return query;
            };
    }]);
