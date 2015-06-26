"use strict";

angular.module("bansho.view.drupalDashboard", [])

    .controller("DrupalDashboardViewCtrl", ["$scope", "$routeParams", 'surveilStatus', 'configManager',
        function ($scope, $routeParams, surveilStatus, configManager) {
            var config = configManager.readConfig()[$routeParams.view],
                hostsMap = config.hostsMap,
                filters_host, filters_service,
                hosts = [];

            $scope.title = config.title;
            angular.forEach(hostsMap, function (host_text, host_name) {
                hosts.push(host_name);
            });

            filters_host = {'is': {'host_name': hosts}};
            filters_service = {'is': {'host_name': hosts,
                                      'service_description': ['drupal_status']}};

            surveilStatus.getObjects([], filters_host, 'hosts').success(function (host_objects) {
                var out_dict = {};

                for (var i = 0; i < host_objects.length; i++) {
                    var obj = {};
                    obj.address = host_objects[i].address;
                    obj.host_name = hostsMap[host_objects[i].host_name];
                    out_dict[host_objects[i].host_name]  = obj;
                }


                surveilStatus.getObjects([], filters_service, 'services').success(function (status) {
                    for (var i = 0; i < status.length; i++) {
                        var stat = status[i],
                            obj = out_dict[stat.host_name],
                            long_out;

                        if (stat.plugin_output.indexOf('SECURITY UPDATE available') !== -1) {
                            obj.security = 'Available';
                            obj.security_class = 'btn-danger';
                        } else {
                            obj.security = 'None';
                        }

                        long_out = stat.long_output.split('\n');

                        for (var j = 0; j < long_out.length; j++) {
                            if (long_out[j].indexOf('Drupal Core version') !== -1) {
                                obj.core_version = long_out[j].split(';')[1];
                            } else if (long_out[j].indexOf('PHP version') !== -1) {
                                obj.php_version = long_out[j].split(';')[1];
                            }
                        }

                        out_dict[stat.host_name] = obj;
                    }
                    $scope.data = out_dict;
                });
            });
        }]);
