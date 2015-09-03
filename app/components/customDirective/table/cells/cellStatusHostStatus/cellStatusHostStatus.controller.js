'use strict';

angular.module('bansho.customDirective.table')

    .run(['tableGlobalConfig', function (tableGlobalConfig) {
        tableGlobalConfig.cellToFieldsMap.status_host_status = ['state', 'last_check', 'parents'];
    }]);