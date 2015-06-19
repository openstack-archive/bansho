'use strict';

angular.module('bansho.grafana', [])
    .service('iframeUrl', function () {
        var createIFrameUrl = function (templateName, host_name, service_description, metric) {
            return 'grafana/dashboard-solo/db/' + templateName + '?' +
                   'panelId=' + '1' +
                   '&fullscreen&from=' + 'now-6h' +
                   '&to=' + 'now' +
                   '&var-metric1=' + metric +
                   '&var-host_name=' + host_name +
                   '&var-service_description=' + service_description;
        };

        var getIFrameUrl = function (metric, host_name, service_description) {
            return createIFrameUrl('templatehostnameservicedescriptiononemetric',
                                    host_name, service_description, metric);
        };

        return {
            getIFrameUrl: getIFrameUrl
        };
    });
