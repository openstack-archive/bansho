angular.module('bansho.customDirective.table')
    .filter('noRepeat', ['datasource', 'tableGlobalConfig',
        function (datasource, tableGlobalConfig) {
            return function (items, scope) {
                var newItems = [],
                    previous,
                    fieldToCompare = tableGlobalConfig.cellWrappableField[datasource.getConfig(scope.datasourceId).noRepeatCell],
                    newAttr = datasource.getConfig(scope.datasourceId).noRepeatCell + "_additionnalClass";

                angular.forEach(items, function (item) {

                    if (previous === item[fieldToCompare]) {
                        item[newAttr] = 'state--rmChild';
                    } else {
                        previous = item[fieldToCompare].slice(0);
                        if (!!item[newAttr]) {
                            item[newAttr] = item[newAttr].replace("state--rmChild", "");
                        }
                    }
                    newItems.push(item);
                });

                return newItems;
            };
        }
    ]);

