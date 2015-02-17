var AdagiosUI = (function() {
    "use strict";

	// States for UI modifications
	var state = {
		visible: 'state--visible',
		hidden: 'state--hidden',
		current: 'state--current',
		open: 'state--open',
		fadeIn: 'state--fadein',
		fadeOut: 'state--fadeout',
		hasChild: 'state--haschild'
	};

	// Breakpoints for the responsive web design
	var mquery = {
		phone: 480,
		tablet: 959
	};

    var test = function(str) {
        console.log(str);
    };

    var syncBkgCheckbox = function() {
        var $activeHostCell = $('th.data-table__host.state--asc, th.data-table__host.state--desc');
        var activeHostCell_bkgColor = $activeHostCell.css('background-color');

        $activeHostCell
            .prev('th')
            .css('background-color', activeHostCell_bkgColor);      
    };

	return {
		state: state,
		test: test,
		mquery: mquery,
        syncBkgCheckbox : syncBkgCheckbox
	};
    
})();
