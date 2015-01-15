/*global describe, beforeEach, it, inject, expect*/
'use strict';

describe('Top Alert Producer tactical submodule', function () {

    beforeEach(module('adagios.tactical.top_alert_producers'));

    describe('TacticalTopAlertProducers', function () {

        it('should be defined', inject(function ($controller) {
            var scope, ctrl;
            scope = {};
            ctrl = $controller('NavBarCtrl', { $scope : scope });

            expect(ctrl).toBeDefined();
        }));

    });
});
