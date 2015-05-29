'use strict';

angular.module('bansho.drupal.cache', [])

    .controller('DrupalCacheCtrl', ['$scope', 'surveilStatus', function ($scope, surveilStatus) {
        var fields = [],
            apiName = 'services',
            filters = {'is': {'host_name': [$scope.hostName],
                              'service_description': ['drupal_cache']}};

        surveilStatus.getObjects(fields, filters, apiName)
            .success(function (data) {
                console.log(data)
                data = data[0].long_output.split(';');
                var out = []

                for (var i = 0; i < data.length; i+=2) {
                    var couple = []
                    couple.push(data[i])
                    var score = parseInt(data[i+1].trim(), 10);
                    console.log(score);
                    if (score < 0) {
                        couple.push('btn-danger');
                    } else {
                        couple.push('');
                    }
                    out.push(couple);
                }

                $scope.data = out;
            });
    }])

    .directive('banshoDrupalCache', ['$http', '$compile', function ($http, $compile) {
        return {
            restrict: 'E',
            compile: function () {
                return function (scope, element, attrs) {
                    var template = 'components/drupal/drupal_cache/drupal_cache.html';

                    if (!attrs.hostName) {
                        throw new Error('<bansho-drupal-cache> "host-name" attribute must be defined');
                    }

                    scope.hostName = {};
                    scope.hostName = attrs.hostName;

                    $http.get(template, { cache: true })
                        .success(function (data) {
                            var elem = $compile(data)(scope);
                            element.append(elem);
                        });
                };
            }
        };
    }]);
