'use strict';

angular.module('adagios.live')

    .constant('filterFields', { host_name: 'host_name__contains',
                                description: 'description__contains',
                                plugin_output: 'plugin_output__contains',
                                host_address: 'host_address__contains' })

    .factory('getServices', ['$http', 'filterFields',
        function ($http, filterFields, columns, filters) {
            return function (columns, filters) {
                var filtersQuery = '';

                function createQuery(filters) {
                    angular.forEach(filters, function (value, key) {
                        console.log(key);
                        console.log(filterFields[key]);
                        filtersQuery += '&' + filterFields[key] + '=';
                        filtersQuery += value;
                    });
                }

                createQuery(filters);

                return $http.get('/rest/status/json/services/?fields=' + columns + filtersQuery)
                    .error(function (data, status, headers, config) {
                        console.error('getServices : GET Request failed');
                    });
            };
        }]);
