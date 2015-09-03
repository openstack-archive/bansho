'use strict';

describe('Custom directives', function () {
    var $compile,
        $rootScope,
        $controller,
        $httpBackend;

    beforeEach(module('bansho.customDirective'));

    beforeEach(inject(function (_$compile_, _$rootScope_, _$controller_, _$httpBackend_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;
    }));

    describe('directiveBuilder', function () {

        it('should send a GET request', function () {
            expect(3).toBe(1 + 2);
        });

    });
});
