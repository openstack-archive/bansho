'use strict';

angular.module('adagios.table.cell_duration', ['adagios.table'])

    .controller('CellDurationCtrl', [function () {
        angular.noop();
    }])

    .run(['tableGlobalConfig', function (tableGlobalConfig) {
        tableGlobalConfig.cellToFieldsMap.duration = ['last_state_change'];
    }]);
