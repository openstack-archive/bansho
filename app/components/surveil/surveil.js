angular.module('bansho.surveil', [])
    .service('surveilApiConfig', function () {
        var apiUrl,
            authUrl,
            surveilEndpoints = {};

        return {
            setSurveilApiUrl: function (surveilApiUrl) {
                apiUrl = surveilApiUrl;
                surveilEndpoints = {
                    status: apiUrl + '/status',
                    actions: apiUrl + '/actions',
                    config: apiUrl + '/config',
                    appConfig: apiUrl + '/bansho/config'
                };
            },
            setAuthUrl: function (url) {
                authUrl = url;
            },
            endpoint: function (endpoint) {
                return surveilEndpoints[endpoint];
            },
            getAuthUrl: function () {
                return authUrl;
            }
        };
    });
