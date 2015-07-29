angular.module('bansho.surveil', [])
    .service('surveilConfig', function () {
        var apiUrl,
            surveilEndpoints = {};

        return {
            setSurveilApiUrl: function (surveilApiUrl) {
                apiUrl = surveilApiUrl;
                surveilEndpoints = {
                    auth: apiUrl + '/v2/auth/',
                    status: apiUrl + '/v2/status/',
                    actions: apiUrl + '/v2/actions/',
                    config: apiUrl + '/v2/bansho/config'
                }
            },
            endpoint: function (endpoint) {
                return surveilEndpoints[endpoint];
            }
        }
    });
