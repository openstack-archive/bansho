'use strict';

describe('Top Alert Producer tactical submodule', function() {

  beforeEach(module('adagios.tactical.top_alert_producers'));

  describe('TacticalTopAlertProducers', function() {

    it('should be defined', inject(function($controller) {
      var scope = {};
      var ctrl = $controller('TacticalTopAlertProducers', {$scope:scope});

      expect(ctrl).toBeDefined();
    }));

  });
});
