'use strict';

angular.module('adagios.table.cell_hosts_host', ['adagios.table'])

    .controller('CellHostsHostCtrl', [function () {
        angular.noop();
    }])

    .run(['tableConfig', function (tableConfig) {
        tableConfig.cellToFieldsMap.hosts_host = ['name'];
    }]);
