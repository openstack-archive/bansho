var SFLfront = (function() {
    "use strict";

	// States for UI modifications
	var state = {
		visible: 'js-is--visible',
		hidden: 'js-is--hidden',
		current: 'js-is--current',
		open: 'js-is--open',
		fadeIn: 'js-is--fadein',
		fadeOut: 'js-is--fadeout',
		hasChild: 'js-is--haschild'
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
