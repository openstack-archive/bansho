'use strict';

angular.module('bansho.drupal.info', [])

    .value('DrupalInfoConfig', {'nextIndex': 0, 'conf': []})

    .controller('DrupalInfoCtrl', ['$scope', 'surveilStatus', 'DrupalInfoConfig',
        function ($scope, surveilStatus, DrupalInfoConfig) {
            var fields = [],
                apiName = 'services',
                filters = {},
                currentIndex = DrupalInfoConfig.nextIndex,
                conf = DrupalInfoConfig.conf[currentIndex];

            $scope.plugin = conf.plugin;
            $scope.title = conf.title;
            $scope.hostName = conf.hostName;

            filters = {'is': {'host_name': [$scope.hostName],
                              'service_description': [$scope.plugin]}};

            surveilStatus.getObjects(fields, filters, apiName)
                .success(function (response) {
                    var finalScore = response[0].plugin_output.split(' ')[1],
                        out = [],
                        data = response[0].long_output.split('\n').slice(0, -1);

                    // Split data into (key, value, score_class) tuples
                    for (var i = 0; i < data.length; i++) {
                        var tuple = data[i].split(';'),
                            score = parseInt(tuple[2], 10);

                        if (score === 1) {
                            tuple[2] = 'btn-warning';
                        } else if (score === 0) {
                            tuple[2] = 'btn-danger';
                        } else {
                            tuple[2] = '';
                        }

                        out.push(tuple);
                    }

                    $scope.data = out;
                });

            DrupalInfoConfig.nextIndex++;
        }])

    .directive('banshoDrupalInfo', ['$http', '$compile', 'DrupalInfoConfig',
        function ($http, $compile, DrupalInfoConfig) {
        return {
            restrict: 'E',
            compile: function () {
                return function (scope, element, attrs) {
                    var template = 'components/drupal/drupal_info/drupal_info.html',
                        currentIndex = DrupalInfoConfig.nextIndex,
                        conf = {};

                    if (!attrs.hostName || !attrs.plugin) {
                        throw new Error('<bansho-drupal-tile> "host-name" and "plugin"' +
                                        'attributes must be defined');
                    }

                    conf.hostName = attrs.hostName;
                    conf.plugin = attrs.plugin;
                    conf.title = attrs.title;
                    DrupalInfoConfig.conf.push(conf);

                    $http.get(template, { cache: true })
                        .success(function (data) {
                            var elem = $compile(data)(scope);
                            element.append(elem);
                        });
                };
            }
        };
    }])

    .service('reinitDrupalInfo', ['DrupalInfoConfig',
        function (DrupalInfoConfig) {
            return function () {
                // Reinitialise tile index
                DrupalInfoConfig.nextIndex = 0;
            };
        }]);
