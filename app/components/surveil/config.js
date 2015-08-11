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

                if (!queryEndpoint[endpoint]) {
                    throw new Error('getData in surveilConfig : Invalid endpoint ' + endpoint);
                }

                queryEndpoint[endpoint](fields, filters, paging, function (data) {
                    promise.resolve(data);
                });

                return promise.promise;
            };

            var queryEndpoint = {
                "hosts": function (fields, filters, paging, callback) {
                    var hostQuery = surveilQuery(fields, filters.hosts, paging),
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


            return {
                getData: getData
            };
        }]);
