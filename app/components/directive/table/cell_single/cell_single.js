'use strict';

angular.module('bansho.table.cell_single', [])
    .controller('CellSingleCtrl', ['$scope', function ($scope) {
        $scope.attributes = JSON.parse($scope.attributes);
    }]);
