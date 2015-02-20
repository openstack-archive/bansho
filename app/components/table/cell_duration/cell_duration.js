'use strict';

angular.module('adagios.table.cell_duration', ['adagios.table'])

    .controller('CellDurationCtrl', [function () {
        angular.noop();
    }])

    .run(['tableConfig', function (tableConfig) {
        tableConfig.cellToFieldsMap.duration = ['last_state_change'];
    }]);
