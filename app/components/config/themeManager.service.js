angular.module('bansho.config')
    .service('themeManager', ['$rootScope', 'configManager',
        function ($rootScope, configManager) {
            // Constants for theme colors
            var THEMES = {
                DARK: "dark",
                LIGHT: "light",
                DEFAULT: "dark"
            };
            var SIZES = {
                BIG: "big",
                NORMAL: "normal",
                SMALL: "small",
                DEFAULT: "normal"
            };
            this.THEMES = THEMES;
            this.SIZES = SIZES;

            var setThemeClass = function (theme, saveConfig) {
                $rootScope.themeClass = 'color-scheme--' + theme;
                $rootScope.themeColor = theme;

                if (saveConfig) {
                    configManager.setThemeAndSave(theme);
                }
            };

            var setThemeSize = function (size, saveConfig) {
                $rootScope.themeClassSize = 'size-scheme--' + size;
                $rootScope.themeSize = size;

                if (saveConfig) {
                    configManager.setSizeAndSave(size);
                }
            };

            /**
             * Set the application theme from configManager
             *
             * If configManager isn't loaded this will set default.
             */
            this.setTheme = function (theme) {
                if (theme) {
                    setThemeClass(theme, false);
                } else {
                    setThemeClass(THEMES.DEFAULT, false);
                }
            };

            this.switchTheme = function () {
                if ($rootScope.themeColor === THEMES.DARK) {
                    setThemeClass(THEMES.LIGHT, true);
                } else {
                    setThemeClass(THEMES.DARK, true);
                }
            };

            this.setSize = function (size, saveConfig) {
                if (saveConfig === undefined) {
                    saveConfig = true;
                }
                if (size) {
                    setThemeSize(size, saveConfig);
                } else {
                    setThemeSize(SIZES.DEFAULT, saveConfig);
                }
            };
        }]
    );
