'use strict';

angular.module('adagios.live', [])

    .factory('GetProblems', ['$http', function ($http) {
        var problem_number = 44;

        return problem_number;
    }])

    .factory('GetServices', ['$http', function ($http) {
        $http.post("/rest/status/json/services", "host_name")
            .success(function(data, status, headers, config) {
                return data;
            })
            .error(function(data, status, headers, config) {
                alert('request error');
            });
    }]);
