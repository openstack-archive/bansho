/*global jQuery */

'use strict';

angular.module('bansho.surveil')
    .service('surveilConfig', ['$http', '$q','surveilQuery', 'componentsConfig', 'surveilApiConfig',
        function ($http, $q, surveilQuery, componentsConfig, surveilApiConfig) {
            var getObjects = function (fields, filters, apiName) {
                var query = {};

                if (apiName !== 'hosts') {
                    throw new Error('getObjects : ' + apiName + ' API is not supported');
                }

                if (fields.length > 0) {
                    query.fields = fields;
                }
                query.filters = JSON.stringify(filters);

                console.log(query)
                return $http({
                    url: 'surveil/v2/config/' + apiName + '/',
                    method: 'POST',
                    data: query
                }).error(function () {
                    throw new Error('getObjects : POST Request failed');
                });
            };

            var executeQuery = function (url, method, query) {
                return $http({
                    url: url,
                    method: method,
                    data: query
                }).error(function () {
                    throw new Error('executeQuery : ' + method + ' Request failed');
                });
            };

            var getData = function (fields, filters, endpoint) {
                var promise = $q.defer();

                if (!queryEndpoint[endpoint]) {
                    throw new Error('getData in surveilConfig : Invalid endpoint ' + endpoint);
                }

                queryEndpoint[endpoint](fields, filters, function (data) {
                    promise.resolve(data);
                });

                return promise.promise;
            };

            var queryEndpoint = {
                "hosts": function (fields, filters, callback) {
                    var hostQuery = surveilQuery(fields, filters.hosts),
                        method = 'POST',
                        hostUrl = surveilApiConfig.endpoint('config') + '/hosts/';

                    executeQuery(hostUrl, method, hostQuery)
                        .success(function (hosts) {
                            var response = [];

                            angular.forEach(hosts, function (host) {
                                response.push(host);
                            });

                            callback(response);
                        });
                }
            };


            return {getData: getData};

        }]);
