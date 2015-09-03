angular.module('bansho.customDirective.table')
    .filter('wrappableStyle', ['datasource', 'tableGlobalConfig',
        function (datasource, tableGlobalConfig) {
            return function (input, scope) {
                var last = '',
                    entry = {},
                    parent_found = false,
                    class_name = ['', ''],
                    i,
                    fieldToWrap = tableGlobalConfig.cellWrappableField[datasource.getConfig(scope.datasourceId).noRepeatCell];

                if (fieldToWrap === undefined) {
                    return input;
                }

                if (datasource.getConfig(scope.datasourceId).isWrappable) {
                    class_name = ['state--hasChild', 'state--isChild'];
                }

                for (i = 0; i < input.length; i += 1) {
                    entry = input[i];

                    if (entry[fieldToWrap] === last) {
                        if (!input[i - 1].has_child && !parent_found) {
                            input[i - 1].has_child = 1;
                            input[i - 1].child_class = class_name[0];
                            entry.child_class = class_name[1];

                            parent_found = true;
                        } else {
                            entry.is_child = 1;
                            entry.child_class = class_name[1];
                        }
                    } else {
                        parent_found = false;
                    }

                    last = entry[fieldToWrap];
                }

                return input;
            };
        }
    ]);
