'use strict';

angular.module('bansho.drupal', ['bansho.surveil'])

    .value('drupalConfig', {})

    .controller('DrupalCtrl', ['$scope', 'drupalConfig', 'surveilStatus',
        function ($scope, drupalConfig, surveilStatus) {
            $scope.hostName = drupalConfig.hostName;
    }])

    .directive('banshoDrupal', ['$http', '$compile', 'surveilStatus', 'drupalConfig',
        function ($http, $compile, surveilStatus, drupalConfig) {
            return {
                restrict: 'A',
                compile: function () {
                    return function (scope, element, attrs) {
                        var template = 'components/drupal/drupal.html';

                        if (!attrs.hostName) {
                            throw new Error('<div data-bansho-drupal> "host-name" attribute must be defined');
                        }

                        drupalConfig.hostName = {};
                        drupalConfig.hostName = attrs.hostName;

                        $http.get(template, { cache: true })
                            .success(function (data) {
                                var elem = $compile(data)(scope);
                                element.append(elem);
                            });
                    };
                }
            };
        }]);
