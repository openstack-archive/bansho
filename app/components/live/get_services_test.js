'use strict';

describe('In Adagios Live', function () {
    var $httpBackend;

    beforeEach(module('adagios.live'));

    beforeEach(inject(function (_$httpBackend_) {
        $httpBackend = _$httpBackend_;
    }));

    describe('getServices', function () {

        it('should send the proper GET request', inject(function (getServices) {
            var fields = ['host_name', 'host_state', 'description'],
                filters = { contains: { host_name: ['srv', 'a'], plugin_output: ['SWAP'] },
                            startswith: { host_name: ['srv'] } },
                apiName = 'services';

            getServices(fields, filters, apiName);
            $httpBackend.expectGET('/rest/status/json/services/?fields=host_name,host_state,description&host_name__contains=srv&host_name__contains=a&plugin_output__contains=SWAP&host_name__startswith=srv').respond('');
            $httpBackend.flush();
        }));
    });
});
