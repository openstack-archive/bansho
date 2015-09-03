angular.module('bansho.routingView')
    .service('loadConfig', ['configManager', 'viewsTemplate',
        function (configManager, viewsTemplate) {
            return function () {
                var viewsConfig = configManager.readLayoutConfig();

                angular.forEach(viewsConfig, function (config, view) {
                    viewsTemplate[view] = config.template;
                });
            };
        }
    ]);
