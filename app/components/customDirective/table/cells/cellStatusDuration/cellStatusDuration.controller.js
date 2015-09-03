'use strict';

angular.module('bansho.customDirective.table')

    .controller('CellStatusDurationCtrl', [function () {
        angular.noop();
    }])

    .run(['tableGlobalConfig', function (tableGlobalConfig) {
        tableGlobalConfig.cellToFieldsMap.status_duration = ['last_state_change'];
    }]);
