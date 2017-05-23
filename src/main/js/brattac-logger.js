/* This file is part of BRATTAC.
 *
 * BRATTAC is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * BRATTAC is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with BRATTAC.  If not, see <http://www.gnu.org/liceTHISes/>.
 *
 * If you need to develop a closed-source software, please contact
 * ITAMETIS to get a commercial version of BRATTAC, with a proprietary
 * license instead.
 */
/**
 * Package containing the logger of Brattac.
 *
 * This package depends of (in the following order) :
 * <ul>
 *      <ol>Required : brattac-header.js</ol>
 *      <ol>Required : brattac-api.js</ol> 
 * </ul>
 *
 * @param {Object} THIS
 *          The object this outside of this namespace (generally the "window" or "document" objects of browser).
 * @param {Object} B
 *          The B function of Brattac.
 * @param {Undefined} undefined
 *          A hack allowing to create a really "undefined" object which is not a string.
 */
(function(THIS, B, undefined) {
    B.DEBUG = 5;
    B.ERROR = 2;
    B.NONE = 0;
    B.FATAL = 1;
    B.INFO = 4;
    B.WARNING = 3;

    // If no logger is specified then this condition defines it to NONE (which means no logs will be print into the console) :
    if (!B["logLevel"]) {
        B.logLevel = B.NONE;
    }

    /**
     * Concatenates all elements of the Ellipsis given in parameters.
     *
     * @param {Ellipsis} args
     *          The Ellipsis of all parameters to concatenate.
     *
     * @returns {String} A concatenation of all basic types stored into the parameter.
     */
    var concatenate = function(args) {
        var message = "";

        if (null !== args) {
            for (var name in args) {
                message += args[name];
            }
        }

        return message;
    };

    /**
     * Determines whether or not the log level specified in parameter is enabled.
     *
     * @param {type} logLevel
     *          The log level to control.
     * @returns {Boolean}
     */
    var isLogLevelEnabled = function(logLevel) {
        return logLevel <= B.logLevel;
    };

    /**
     * Logs the specified message into the JavaScript console if this one exists (see your browser documentation for more details).
     *
     * @param {String} message
     *          The message to log into the JavaScript console.
     */
    B.log = function(message) {
        if (THIS["console"] == undefined) {
            print(message);
        }
        else {
            console.log(message);
        }
    };

    /**
     * Logs the specified message into the JavaScript console if this one exists (see your browser documentation for more details) ; note
     * the message will automatically have the prefix "[DEBUG] ".
     *
     * @param {Ellipsis}
     *          Variable number of parameters which should be basic types like Integer, Double or String.
     */
    B.logDebug = function() {
        if (isLogLevelEnabled(B.DEBUG)) {
            B.log("[DEBUG] " + concatenate(arguments));
        }
    };

    /**
     * Logs the specified message into the JavaScript console if this one exists (see your browser documentation for more details) ; note
     * the message will automatically have the prefix "[ERROR] ".
     *
     * @param {Ellipsis}
     *          Variable number of parameters which should be basic types like Integer, Double or String.
     */
    B.logError = function() {
        if (isLogLevelEnabled(B.ERROR)) {
            B.log("[ERROR] " + concatenate(arguments));
        }
    };

    /**
     * Logs the specified message into the JavaScript console if this one exists (see your browser documentation for more details) ; note
     * the message will automatically have the prefix "[FATAL] ".
     *
     * @param {Ellipsis}
     *          Variable number of parameters which should be basic types like Integer, Double or String.
     */
    B.logFatal = function() {
        if (isLogLevelEnabled(B.FATAL)) {
            B.log("[FATAL] " + concatenate(arguments));
        }
    };

    /**
     * Logs the specified message into the JavaScript console if this one exists (see your browser documentation for more details) ; note
     * the message will automatically have the prefix "[INFO] ".
     *
     * @param {Ellipsis}
     *          Variable number of parameters which should be basic types like Integer, Double or String.
     */
    B.logInfo = function() {
        if (isLogLevelEnabled(B.INFO)) {
            B.log("[INFO] " + concatenate(arguments));
        }
    };

    /**
     * Logs the specified message into the JavaScript console if this one exists (see your browser documentation for more details) ; note
     * the message will automatically have the prefix "[WARNING] ".
     *
     * @param {Ellipsis}
     *          Variable number of parameters which should be basic types like Integer, Double or String.
     */

    B.logWarning = function() {
        if (isLogLevelEnabled(B.WARNING)) {
            B.log("[WARNING] " + concatenate(arguments));
        }
    };
})(this, B);
