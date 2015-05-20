/*global JustGage */
'use strict';

angular.module("ngJustGage", [])
    .directive('justGage', ['$timeout', function ($timeout) {
        return {
            restrict: 'EA',
            scope: {
                id: '@',
                class: '@',
                min: '=',
                max: '=',
                title: '@',
                value: '=',
                options: '='
            },
            template: '<div id="{{id}}-justgage" class="{{class}}"></div>',
            link: function (scope) {
                $timeout(function () {
                    var options, key, graph;

                    options = {
                        id: scope.id + '-justgage',
                        min: scope.min,
                        max: scope.max,
                        title: scope.title,
                        value: scope.value,
                        donut: true
                    };

                    if (scope.options) {
                        for (key in scope.options) {
                            if (scope.options.hasOwnProperty(key)) {
                                options[key] = scope.options[key];
                            }
                        }
                    }

                    graph = new JustGage(options);

                    scope.$watch('max', function (updatedMax) {
                        if (updatedMax !== undefined) {
                            graph.refresh(scope.value, updatedMax);
                        }
                    }, true);

                    scope.$watch('value', function (updatedValue) {
                        if (updatedValue !== undefined) {
                            graph.refresh(updatedValue);
                        }
                    }, true);

                });
            }
        };
    }]);
