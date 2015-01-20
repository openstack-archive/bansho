'use strict';

angular.module('adagios.live')

    .factory('GetServices', ['$http', function ($http, columns) {

        return function (columns) {
            return $http.get('/rest/status/json/services/?fields=' + columns)
                .error(function (data, status, headers, config) {
                    console.error('GetServices : GET Request failed');
                });
        };
    }])
