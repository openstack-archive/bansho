/*global jQuery */

'use strict';

angular.module('bansho.surveil')
    .service('surveilActions', ['$http', '$q',
        function ($http, $q) {
            var acknowledge = function (host_name, service_description, attrs) {
                var data = {};

                data.host_name = host_name;
                if (attrs.sticky) {
                    data.sticky = parseInt(attrs.sticky, 10);
                }

                if (attrs.notify) {
                    data.notify = parseInt(attrs.notify, 10);
                }

                if (attrs.persistent) {
                    data.persistent = parseInt(attrs.persistent, 10);
                }

                if (service_description !== undefined) {
                    data.service_description = service_description;
                }

                return $http({
                    url: 'surveil/v2/actions/acknowledge/',
                    method: 'POST',
                    data: data
                });
            };

            var downtime = function (host_name, service_description, attrs) {
                attrs.host_name = host_name;
                if (service_description !== undefined) {
                    attrs.service_description = service_description;
                }

                return $http({
                    url: 'surveil/v2/actions/downtime/',
                    method: 'POST',
                    data: attrs
                });
            };

            var recheck = function (host_name, service_description) {
                var attrs = {};
                attrs.host_name = host_name;
                if (service_description !== undefined) {
                    attrs.service_description = service_description;
                }

                return $http({
                    url: 'surveil/v2/actions/recheck/',
                    method: 'POST',
                    data: attrs
                });
            };

            return {
                acknowledge: acknowledge,
                downtime: downtime,
                recheck: recheck
            };
        }]);
