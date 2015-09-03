'use strict';

angular.module('bansho.datasource', ['bansho.surveil'])
    .value('tableGlobalConfig', {
        'cellToFieldsMap': {},
        'cellWrappableField': {}
    });
