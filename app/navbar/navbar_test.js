/*global describe, beforeEach, it, inject, expect*/
'use strict';

describe('Navbar module', function () {

    beforeEach(module('adagios.navbar'));

    describe('NavBarCtrl', function () {

        it('should be defined', inject(function ($controller) {
            var scope, ctrl;
            scope = {};
            ctrl = $controller('NavBarCtrl', { $scope : scope });

            expect(ctrl).toBeDefined();
        }));

    });
});
