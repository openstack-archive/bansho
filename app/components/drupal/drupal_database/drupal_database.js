'use strict';

angular.module('bansho.drupal.database', [])

    .controller('DrupalDatabaseCtrl', ['$scope', 'surveilStatus', function ($scope, surveilStatus) {
        var fields = [],
            apiName = 'services',
            filters = {'is': {'host_name': [$scope.hostName],
                              'service_description': ['drupal_database']}};

        surveilStatus.getObjects(fields, filters, apiName)
            .success(function (data) {
                console.log(data)
                data = data[0].long_output.split(';');
                $scope.data = data;
            });
    }])

    .directive('banshoDrupalDatabase', ['$http', '$compile', function ($http, $compile) {
        return {
            restrict: 'E',
            compile: function () {
                return function (scope, element, attrs) {
                    var template = 'components/drupal/drupal_database/drupal_database.html';

                    if (!attrs.hostName) {
                        throw new Error('<bansho-drupal-database> "host-name" attribute must be defined');
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
