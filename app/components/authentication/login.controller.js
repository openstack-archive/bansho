angular.module('bansho.authentication')
    .controller('LoginController', ['$scope', '$rootScope', '$location', 'authService', 'configManager', 'themeManager',
        function ($scope, $rootScope, $location, authService, configManager, themeManager) {
            themeManager.setTheme(themeManager.THEMES.DEFAULT);
            themeManager.setSize(themeManager.SIZES.DEFAULT, false);
            $rootScope.isAuthenticated = false;

            var login = function (credentials) {
                authService.login(credentials);
            };

            $scope.credentials = {
                'auth': {
                    'tenantName': '',
                    'passwordCredentials': {
                        'username': '',
                        'password': ''
                    }
                }
            };

            $scope.login = function() {
                login($scope.credentials);
            };

            configManager.loadConfig().then(function () {
                var devConfig = configManager.getConfig();

                if (devConfig.env === 'development') {
                    login({
                        'auth': {
                            'tenantName': '',
                            'passwordCredentials': {
                                'username': devConfig.username,
                                'password': devConfig.password
                            }
                        }
                    });
                } else if (authService.isAuthenticated()) {
                    login($scope.credentials);
                }

            }, function () {
                // Development config failed
            });
        }
    ]);
