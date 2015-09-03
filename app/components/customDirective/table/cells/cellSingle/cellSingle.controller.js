'use strict';

angular.module('bansho.customDirective.table')
    .controller('CellSingleCtrl', ['$scope', function ($scope) {
        $scope.attributes = JSON.parse($scope.attributes);
    }]);
