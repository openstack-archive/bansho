angular.module('bansho.customDirective.table')
    .directive('banshoCell', ['$http', '$compile', 'tableGlobalConfig',
        function ($http, $compile, tableGlobalConfig) {
            return {
                restrict: 'E',
                compile: function () {
                    return function (scope, element, attrs) {
                        var attributes = attrs.attributes,
                            template = 'components/customDirective/table/';

                        if (!attrs.type) {
                            throw new Error('Directive bansho-cell "type" attribute must be defined');
                        }

                        if (!attributes) {
                            throw new Error('Directive bansho-cell "attributes" attribute must be defined');
                        }

                        if (attrs.type == 'cell-single') {
                            template += 'cells/cellSingle/cellSingle.html';
                            scope.attributes = attributes;
                            tableGlobalConfig[attrs.title] = scope.entryKey;
                        } else if (attrs.type == 'cell-other-fields') {
                            template += 'cells/cellOtherFields/cellOtherFields.html';
                            scope.attributes = attributes;
                        } else {
                            var templateName = camelCase(attrs.type);
                            template += 'cells/' + templateName + '/' + templateName + '.html';
                        }

                        function camelCase(input) {
                            return input.toLowerCase().replace(/-(.)/g, function(match, group1) {
                                return group1.toUpperCase();
                            });
                        }

                        $http.get(template, { cache: true })
                            .success(function (data) {
                                element.replaceWith($compile(data)(scope));
                            });
                    };
                }
            };
        }]
    );
