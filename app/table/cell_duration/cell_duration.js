'use strict';

angular.module('adagios.table.cell_duration', ['ngSanitize'])

    .controller('CellDurationCtrl', ['$scope', '$sce', function ($scope, $sce) {
        $scope.balise = 'salut';
    }])

    .directive('cellDuration', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: false,
            templateUrl: 'table/cell_duration/cell_duration.html',
            link: function(scope, element, attrs) {
                var factory = angular.element('<div></div>');
                factory.html('<p>{{balise}}</p>');
                console.log(scope);
                $compile(factory)(scope);
            }
        };
    });
