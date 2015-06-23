'use strict';

angular.module('bansho.drupal.info', [])

    .value('DrupalInfoConfig', {'nextIndex': 0, 'conf': []})

    .controller('DrupalInfoCtrl', ['$scope', 'surveilStatus', 'DrupalInfoConfig',
        function ($scope, surveilStatus, DrupalInfoConfig) {
            var fields = [],
                apiName = 'services',
                filters = {},
                currentIndex = DrupalInfoConfig.nextIndex,
                conf = DrupalInfoConfig.conf[currentIndex],
                getStateClass;

            $scope.plugin = conf.plugin.split(',');
            $scope.title = conf.title;
            $scope.hostName = conf.hostName;

            filters = {'is': {'host_name': [$scope.hostName],
                              'service_description': $scope.plugin}};

            getStateClass = function (obj) {
                var stateClass = '';

                if (obj.state === 'CRITICAL') {
                    stateClass = 'btn-danger';
                } else if (obj.state === 'WARNING') {
                    stateClass = 'btn-warning';
                }

                return stateClass;
            };

            surveilStatus.getObjects(fields, filters, apiName)
                .success(function (response) {
                    var out = [],
                        tuple_jenkins = [],
                        tuple_selenium = [],
                        tuple_http_load = [],
                        output, result, stateClass;

                    for (var i = 0; i < response.length; i++) {

                        if (response[i].service_description === 'drupal_status') {
                            var finalScore = response[i].plugin_output.split(' ')[1],
                                data = response[i].long_output.split('\n').slice(0, -1);

                            // Split data into (key, value, stateClass) tuples
                            for (var j = 0; j < data.length; j++) {
                                var tuple = data[j].split(';'),
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

                        } else if (response[i].service_description === 'drupal_jenkins') {
                            output = response[i].plugin_output;
                            result = 'Unknown';

                            if (output.indexOf('successful') != -1) {
                                result = 'Successful';
                            } else if (output.indexOf('failed') != -1) {
                                result = 'Failed';
                            } else if (output.indexOf('unstable') != -1) {
                                result = 'Unstable';
                            }

                            stateClass = getStateClass(response[i]);
                            tuple_jenkins = ['Last build', result, stateClass];

                        } else if (response[i].service_description === 'http_load') {
                            output = response[i].plugin_output;

                            if (response[i].state !== 'UNKNOWN') {
                                result = output.split(':')[2];
                            } else {
                                result = 'Unknown';
                            }

                            stateClass = getStateClass(response[i]);
                            tuple_http_load = ['Under load', result, stateClass];

                        } else if (response[i].service_description === 'selenium') {
                            output = response[i].plugin_output;

                            if (response[i].state !== 'UNKNOWN') {
                                result = output.split(':')[2];
                            } else {
                                result = 'Unknown';
                            }

                            stateClass = getStateClass(response[i]);
                            tuple_selenium = ['Scenario time', result, stateClass];

                        }
                    }
                    out.push(tuple_jenkins);
                    out.push(tuple_selenium);
                    out.push(tuple_http_load);
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
