'use strict';

angular.module('adagios.live.getservices', [])

    .factory('GetServices', ['$http', function ($http) {
        alert('Salut');
        $http.post("/rest/status/json/services/").
            success(function(data, status, headers, config) {
                alert(data);
            }).
            error(function(data, status, headers, config) {
                alert('Request error');
            });

        return data;
    }]);
