angular.module('bansho.customDirective.table')
    .service('headerFollow', ['$window', function ($window) {
        var isFollowing = false, staticHead, followingHead, actionBar = false, actionBarEl, staticActionBar,
            staticActionBarYOffset, staticHeadYOffset, yThreshold, yOffset;

        function enableFollowingMode() {
            isFollowing = true;
            setFollowingModeCss();
        }

        function setFollowingModeCss() {
            // We need to show moving head
            followingHead.css("display", "table-header-group");
            // Resize thead col width
            var thList = staticHead.children("tr").children("th");
            angular.forEach(thList, function(th, key) {
                $(followingHead.children("tr").children("th")[key]).css("width", $(th).css("width"));
            });
            // If we have an actionbar
            if (actionBar) {
                // Set actionbar css
                staticActionBar.css("top", "0");
                staticActionBar.css("position", "fixed");
                if (followingHead.css("width") != "0px") {
                    staticActionBar.css("width", followingHead.css("width"));
                }
                // Set top css to moving head
                followingHead.css("top", staticActionBar.css("height"));
            }
        }

        function disableFollowingMode(){
            isFollowing = false;
            setStaticModeCss();
        }

        function setStaticModeCss(){
            // We need to hide moving head
            followingHead.css("display", "none");
            // Resize thead col width
            var thList = staticHead.children("tr").children("th");
            angular.forEach(thList, function(th, key) {
                $(followingHead.children("tr").children("th")[key]).css("width", "auto");
            });
            // If we have an actionbar
            if (actionBar) {
                // We need to fix moving actionbar
                staticActionBar.css("position", "relative");
                if (followingHead.css("width") != "0px") {
                    staticActionBar.css("width", "auto");
                }
            }
        }

        function calculateThreshold() {
            // Get YThreshold
            if ($(staticHead) && $(staticHead).position()) {
                staticHeadYOffset = $(staticHead).position().top;
                if (actionBar) {
                    yThreshold = Math.min(staticActionBarYOffset, staticHeadYOffset);
                }
                else {
                    yThreshold = staticHeadYOffset;
                }
            }
        }

        function scrollEvent() {
            yOffset = $window.pageYOffset;

            if (!isFollowing) {
                // Get init data
                staticHead = $("thead.static-thead");
                followingHead = $(staticHead).parent().children("thead.moving-thead");
                // Prepare action bar
                if (actionBar) {
                    staticActionBar = actionBarEl.children("menu");
                    staticActionBarYOffset = $(staticActionBar).position().top;
                }
                calculateThreshold();
            }

            if (yOffset >= yThreshold){
                enableFollowingMode();
            }
            else {
                disableFollowingMode();
            }
        }
        this.activate = function () {
            // Handle header fixed
            angular.element(document).ready(function () {

                // Prepare action bar
                actionBarEl = $("bansho-table-actionbar");
                if (actionBarEl.length > 0) {
                    actionBar = true;
                }

                // Handle scroll event
                angular.element(document).on("scroll", scrollEvent);

                // Handle resize event
                $($window).resize(function() {
                    if (isFollowing) {
                        setFollowingModeCss();
                    }
                    else {
                        setStaticModeCss();
                    }
                });
            });
        };

        this.deactivate = function () {
            angular.element(document).off("scroll", scrollEvent);
        };
    }]);
