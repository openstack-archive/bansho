'use strict';


function AdagiosConfig(dashboardConfig, hostsConfig) {
    this.dashboardConfig = dashboardConfig;
    this.hostsConfig = hostsConfig;
}

angular.module('adagios.config', [])

    .provider('readConfig', function ReadConfigProvider() {

        var dashboardConfig = {},
            hostsConfig = {};

        this.setDashboardConfig = function (value) {
            dashboardConfig = value;
        };

        this.setHostsConfig = function (value) {
            hostsConfig = value;
        };

        this.$get = [function getConfigFactory() {
            return new AdagiosConfig(dashboardConfig, hostsConfig);
        }];
    });
