'use strict';

angular.module('bansho.table')
    .controller('CellSingleCtrl', ['$scope', function ($scope) {
        $scope.attributes = JSON.parse($scope.attributes);
    }]);
