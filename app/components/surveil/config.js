/*global jQuery */

'use strict';

angular.module('bansho.surveil')
    .service('surveilConfig', ['$http', '$q','surveilQuery', 'componentsConfig', 'surveilApiConfig',
        function ($http, $q, surveilQuery, componentsConfig, surveilApiConfig) {
            var executeQuery = function (url, method, query) {
                return $http({
                    url: url,
                    method: method,
                    data: query
                }).error(function () {
                    throw new Error('executeQuery : ' + method + ' Request failed');
                });
            };

            var getData = function (fields, filters, endpoint, paging) {
                var promise = $q.defer();

                if (!validEndpoint[endpoint]) {
                    throw new Error('getData in surveilConfig : Invalid endpoint ' + endpoint);
                }

                queryEndpoint(endpoint, fields, filters, paging, function (data) {
                    promise.resolve(data);
                });

                return promise.promise;
            };

            var validEndpoint = {
                "hosts": true,
                "commands": true
            };


            var queryEndpoint = function (endpoint, fields, filters, paging, callback) {
                var query = surveilQuery(fields, filters[endpoint], paging),
                    method = 'POST',
                    url = surveilApiConfig.endpoint('config') + '/' + endpoint + '/';

                executeQuery(url, method, query)
                    .success(function (data) {
                        var response = [];

                        angular.forEach(data, function (obj) {
                            response.push(obj);
                        });

                        callback(response);
                    });
            };

            return {
                getData: getData,
                getHost: function (hostname) {
                    var promise = $q.defer(), query = {"hosts": {"is": {"host_name": [ hostname ] } } };
                    getData([], query, "hosts")
                        .then(function (data) {
                            promise.resolve(data);
                        });
                    return promise.promise;
                },
                getCommand: function (commandName) {
                    var promise = $q.defer(), query = {"commands": {"is": {"command_name": [ commandName ] } } };
                    getData([], query, "commands")
                        .then(function (data) {
                            promise.resolve(data);
                        });
                    return promise.promise;
                }
            };
        }]);
