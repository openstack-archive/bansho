'use strict';


function AdagiosConfig(dashboardConfig, hostsConfig, servicesConfig) {
    this.dashboardConfig = dashboardConfig;
    this.hostsConfig = hostsConfig;
    this.servicesConfig = servicesConfig;
}

angular.module('adagios.config', [])

    .provider('readConfig', function ReadConfigProvider() {

        var dashboardConfig = {},
            hostsConfig = {},
            servicesConfig = {};

        this.setDashboardConfig = function (value) {
            dashboardConfig = value;
        };

        this.setHostsConfig = function (value) {
            hostsConfig = value;
        };

        this.setServicesConfig = function (value) {
            servicesConfig = value;
        };

        this.$get = [function getConfigFactory() {
            return new AdagiosConfig(dashboardConfig, hostsConfig, servicesConfig);
        }];
    });
