'use strict';

angular.module('bansho.customDirective.table')

    .controller('CellStatusLastCheckCtrl', [function () {
        angular.noop();
    }])

    .run(['tableGlobalConfig', function (tableGlobalConfig) {
        tableGlobalConfig.cellToFieldsMap.status_last_check = ['last_check'];
    }]);
