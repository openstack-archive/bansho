/*global describe, beforeEach, it, inject, expect*/
'use strict';

describe('Sidebar module', function () {

    beforeEach(module('adagios.sidebar'));

    describe('SideBarCtrl', function () {

        it('should be defined', inject(function ($controller) {
            var scope, ctrl;
            scope = {};
            ctrl = $controller('NavBarCtrl', { $scope : scope });

            expect(ctrl).toBeDefined();
        }));

    });
});
