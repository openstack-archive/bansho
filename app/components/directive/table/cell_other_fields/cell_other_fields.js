'use strict';

angular.module('bansho.table')

    .controller('CellOtherFieldsCtrl', ['$scope', function ($scope) {
        $scope.attributes = JSON.parse($scope.attributes);

        $scope.isExpanded = false;
        $scope.toggleExpansion = function () {
            $scope.isExpanded = !$scope.isExpanded;
        };

        $scope.skipFields = {
            "undefined_additionnalClass": true
        };
        angular.forEach($scope.attributes.skipFields, function (value) {
            $scope.skipFields[value] = true;
        });

        $scope.filter = function (entry) {
            var result = {};
            angular.forEach(entry, function(value, key) {
                if (!$scope.skipFields[key]) {
                    result[key] = entry[key];
                }
            });
            return result;
        };
    }]);
