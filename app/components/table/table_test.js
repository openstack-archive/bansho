'use strict';

describe('In Table module', function () {
    var $compile,
        $rootScope,
        $httpBackend;

    beforeEach(module('adagios.table'));

    beforeEach(inject(function (_$compile_, _$rootScope_, _$httpBackend_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
    }));

    describe('banshoCell directive', function () {

        it('should send a get request to the proper cell template', function () {
            var cells = ['host', 'service_check', 'duration', 'last_check'];

            angular.forEach(cells, function (cell) {
                var elem = angular.element('<td bansho-cell cell-name="' + cell + '"></td>');
                $compile(elem)($rootScope);
                $httpBackend.expectGET('components/table/cell_' + cell + '/cell_' + cell + '.html').respond('');
                $httpBackend.flush();
            });
        });
    });

    describe('banshoTable directive', function () {

        it('should request table/table.html template', function () {
            var elem = angular.element('<bansho-table cells-name="host,service_check,duration,last_check" cells-text="Host,Service Check,Duration,Last check" api-name="services" is-wrappable="true"></bansho-table>');
            $compile(elem)($rootScope);
            $httpBackend.expectGET('components/table/table.html').respond('');
            $httpBackend.flush();
        });
    });
});
