'use strict';

describe('Sidebar module', function () {
    var $compile,
        $rootScope,
        $controller,
        $httpBackend;

    beforeEach(module('adagios.sidebar'));

    beforeEach(inject(function (_$compile_, _$rootScope_, _$controller_, _$httpBackend_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;

        $httpBackend.expectGET('components/sidebar/sidebar.html').respond('<li></li>');
    }));

    describe('SideBarCtrl', function () {

        it('should be defined', function () {
            var scope = $rootScope.$new(),
                ctrl = $controller('SideBarCtrl', { $scope : scope });

            expect(ctrl).toBeDefined();
        });

    });

    describe('Sidebar directive', function () {

        it('should send a GET request', function () {
            var element = $compile('<adg-sidebar></adg-sidebar>')($rootScope);
            $httpBackend.flush();

            expect(element.html()).toBe('<li></li>');
        });

    });
});
