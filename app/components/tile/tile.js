'use strict';

angular.module('bansho.tile', [])

    .value('tileConfig', {})

    .controller('TileCtrl', ['$scope', function ($scope) {
        angular.noop();
    }])

    .directive('banshoTile', ['$http', '$compile', 'tileConfig',
        function ($http, $compile, hostConfig) {
            return {
                templateUrl: 'tile.html';
            };
        }]);
