angular.module('bansho.authentication')
    .factory('authService', ['$http', '$location', '$rootScope', 'session', 'configManager',
                             'themeManager', 'surveilApiConfig',
        function ($http, $location, $rootScope, session, configManager,
                  themeManager, surveilApiConfig) {
            var authService = {},
                onLogin = [];

            authService.login = function (credentials) {
                return $http
                    .post(surveilApiConfig.getAuthUrl() + '/tokens/', credentials)
                    .success(function (data) {
                        $rootScope.isAuthenticated = true;

                        session.create(data.access.token.id, data.access.token.expires);
                        $http.defaults.headers.common['X-Auth-Token'] = session.sessionId;

                        configManager.fetchLayoutConfig(configManager.getConfig().useStoredConfig).then(function () {
                            themeManager.setTheme(configManager.getTheme());
                            themeManager.setSize(configManager.getSize());
                            $location.path('/view');

                            angular.forEach(onLogin, function (f) {
                                f();
                            });
                        }, function (message) {
                            throw new Error(message);
                        });

                    })
                    .error(function () {
                        alert('Login failed!');
                        $location.path('/login');
                    });
            };

            authService.isAuthenticated = function () {
                return !!session.isUserConnected();
            };

            authService.logout = function () {
                $rootScope.isAuthenticated = false;
                session.destroy();
                $location.path('/login');
            };

            authService.switchTheme = function () {
                themeManager.switchTheme();
            };

            authService.registerOnLogin = function (f) {
                onLogin.push(f);
            };

            return authService;
        }
    ]);
