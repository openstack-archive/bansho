var SFLfront = (function() {
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

	return {
		state: state,
		mquery: mquery
	};
})();
