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
                filters = { host_name: 'srv', plugin_output: 'SWAP' };

            getServices(fields, filters);
            $httpBackend.expectGET('/rest/status/json/services/?fields=host_name,host_state,description&host_name__contains=srv&plugin_output__contains=SWAP').respond('');
            $httpBackend.flush();
        }));
    });
});
