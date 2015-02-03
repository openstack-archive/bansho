'use strict';


function AdagiosConfig(dashboardCells) {
    this.dashboardCells = dashboardCells;
}

angular.module('adagios.config', [])

    .provider('readConfig', function ReadConfigProvider() {

        var dashboardCells = [];

        this.setDashboardCells = function (value) {
            dashboardCells = value;
        };

        this.$get = [function getConfigFactory() {
            return new AdagiosConfig(dashboardCells);
        }];
    });
