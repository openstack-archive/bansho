'use strict';

angular.module('bansho.drupal.tile', [])

    .value('DrupalTileConfig', {'nextIndex': 0, 'tileConf': []})

    .controller('DrupalTileCtrl', ['$scope', 'surveilStatus', 'DrupalTileConfig',
        function ($scope, surveilStatus, DrupalTileConfig) {
            var fields = [],
                apiName = 'services',
                filters = {},
                currentIndex = DrupalTileConfig.nextIndex,
                tileConfig = DrupalTileConfig.tileConf[currentIndex];

            $scope.plugin = tileConfig.plugin;
            $scope.title = tileConfig.title;
            $scope.hostName = tileConfig.hostName;

            filters = {'is': {'host_name': [$scope.hostName],
                              'service_description': [$scope.plugin]}};

            surveilStatus.getObjects(fields, filters, apiName)
                .success(function (response) {
                    var finalScore = response[0].plugin_output.split(' ')[1],
                        out = [],
                        data = response[0].long_output.split(';').slice(0, -1);

                    finalScore = parseInt(finalScore.substring(0, finalScore.length - 4));
                    $scope.finalScore = isNaN(finalScore) ? '': finalScore + '%';

                    if (finalScore <= tileConfig.critical) {
                        $scope.finalScoreClass = 'tile__score-critical';
                    } else if (finalScore <= tileConfig.warning) {
                        $scope.finalScoreClass = 'tile__score-warning';
                    }

                    // Split data into (metric, score_class, action) tuples
                    for (var i = 0; i < data.length; i+=3) {
                        var tuple = [];

                        tuple.push(data[i]);
                        var score = parseInt(data[i+1].trim(), 10);
                        if (score === 1) {
                            tuple.push('btn-warning');
                        } else if (score === 0) {
                            tuple.push('btn-danger');
                        } else {
                            tuple.push('');
                        }
                        tuple.push(data[i+2]);
                        out.push(tuple);
                    }
                    $scope.data = out;

                });

            DrupalTileConfig.nextIndex++;
        }])

    .directive('banshoDrupalTile', ['$http', '$compile', 'DrupalTileConfig',
        function ($http, $compile, DrupalTileConfig) {
        return {
            restrict: 'E',
            compile: function () {
                return function (scope, element, attrs) {
                    var template = 'components/drupal/drupal_tile/drupal_tile.html',
                        currentIndex = DrupalTileConfig.nextIndex,
                        tileConfig = {};

                    if (!attrs.hostName || !attrs.plugin || !attrs.warning || !attrs.critical) {
                        throw new Error('<bansho-drupal-tile> "host-name", ' +
                                        '"plugin", "warning" and "critical" ' +
                                        'attributes must be defined');
                    }

                    tileConfig.hostName = attrs.hostName;
                    tileConfig.plugin = attrs.plugin;
                    tileConfig.title = attrs.title;
                    tileConfig.warning = parseInt(attrs.warning, 10);
                    tileConfig.critical = parseInt(attrs.critical, 10);
                    DrupalTileConfig.tileConf.push(tileConfig);

                    $http.get(template, { cache: true })
                        .success(function (data) {
                            var elem = $compile(data)(scope);
                            element.append(elem);
                        });
                };
            }
        };
    }])

    .service('reinitDrupalTiles', ['DrupalTileConfig',
        function (DrupalTileConfig) {
            return function () {
                // Reinitialise tile index
                DrupalTileConfig.nextIndex = 0;
            };
        }]);
