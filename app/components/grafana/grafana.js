'use strict';

angular.module('bansho.grafana', [])
    .service('iframeUrl', function () {
        var _baseUrl = "/grafana/dashboard-solo/db/dashboardmetrichostnameservicedescription?panelId=",
            _commonUrl = "&fullscreen&edit&from=1433281087448&to=1433283971659&var-measurements=",
            _hostName = "&var-host_name=",
            _service_description = "&var-service_description=";

        var getIFrameUrl = function (measurements, host_name, service_description) {
            var url,
                panelId = 2;

            if (service_description) {
                panelId = 1;
            }

            url = _baseUrl + panelId + _commonUrl + measurements + _hostName + host_name;

            if (service_description) {
                url += _service_description + service_description;
            }

            return url;
        };

        return {
            getIFrameUrl: getIFrameUrl
        };
    });
