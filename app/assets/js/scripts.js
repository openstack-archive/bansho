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

//     //var mqDesktop = 'only screen and (min-width: 60em)';
//     //var mqTablet = 'only screen and (min-width: 30.063em) and (max-width: 59.938em)';
//     //var mqPhone = 'only screen and (min-width: 20em) and (max-width: 30em)';

//     $(function () {
//         // ON LOAD
//         console.log($('li'), '!!!!');

//         $('a').on('click', function(e) {
//             e.preventDefault();
//             console.log($('!!!'));
//         });

//         // ON RESIZE
//     });


// })(jQuery, window, document);
