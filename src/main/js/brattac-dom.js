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
 * Package containing the DOM API of Brattac.
 *
 * This package has no dependencies.
 *
 * @param {Object} THIS
 *          The current global namespace into which place the Brattac's namespace.
 * @param {Undefined} undefined
 *          A hack allowing to create a really "undefined" which is not a string.
 */
(function(THIS, undefined) {
    /**
     * Researches the element targeted by the specified query and returns it or them (depending the number) as Brattac's enriched object. A
     * Brattac's enriched object get hight level methods to manipulate DOM, style or JavaScript events.<br />
     * <br />
     * Here belong some sample of usable queries :
     * <pre>
     *  <code>
     *      var node = B("#myId");              // Finds the element matching this ID then returns it enriched.
     *      var nodes = B(".myClass");          // Finds all the elements having this class then returns them enriched inside an Array.
     *      var nodes = B("<span>");            // Finds all the elements having this tag then returns them enriched inside an Array.
     *      var nodes = B("span.myClass");      // Finds all the elements having this class and this tab then returns them enriched inside
     *                                          // an Array.
     *      var nodes = B("#myId .myClass");    // Finds all the elements having this ID and this class then returns them enriched inside an
     *                                          // Array.
     *      var nodes = B("#myId tag");         // Finds all the elements having this ID and this tag then returns them enriched inside an
     *                                          // Array.
     *      var nodes = B("tag .myClass");      // Finds all the elements having this tag and this class then returns them enriched inside
     *                                          // an Array.
     *      var nodes = B("tag > .myClass");    // Finds all the elements having this tag and this class then returns them enriched inside
     *                                          // an Array.
     *  </code>
     * </pre>
     *
     * @param {String} query
     *          The query used to research the element(s).
     *
     * @return {Object} An enriched JavaScript object.
     */
    THIS.B = function(query) {
        var result = null;

        if (THIS["document"]) {
            var type = false;
            if (type = THIS.B.isIdQuery(query)) {
                result = document.getElementById(query.substring(1));
            }
            else if (THIS.B.isClassQuery(query)) {
                result = document.getElementsByClassName(query.substring(1));
            }
            else if (THIS.B.isTagQuery(query)) {
                result = document.getElementsByTagName(query.substring(1, query.length - 1));
            }
            else {
                result = document.querySelectorAll(query);
            }

            if (result !== null) {
                if (type) {
                    addFunctions(result, FUNC_EVENT);
                    addFunctions(result, FUNC_HTML);
                    addFunctions(result, FUNC_STYLE);
                }
                else {
                    for (var i in result) {
                        addFunctions(result[i], FUNC_EVENT);
                        addFunctions(result[i], FUNC_HTML);
                        addFunctions(result[i], FUNC_STYLE);
                    }
                }
            }
        }

        return result;
    };

    /**
     * Integrates a set of functions into a Brattac object.
     *
     * @param {Brattac Object} element
     *          The Brattac object into which set the methods.
     * @param {Map<String, Function>} funcSet
     *          A set of methods to integrate to the {@code element} parameter.
     */
    var addFunctions = function(element, funcSet) {
        for (var name in funcSet) {
            element[name] = funcSet[name];
        }
    };

    /**
     * Determines whether the given paremeter is set (i.e defined and not null) or not.
     *
     * @param {Object} obj
     *          The parameter to check.
     *
     * @returns {Boolean} true if the paremeter is correctly set, false otherwise.
     */
    var isSet = function(obj) {
        return obj !== undefined && obj !== null;
    }

    /**
     * Applies the given regular expression on the string specified in parameter then returns the matching result.
     *
     * @param {String} str
     *          The string on to execute the regular expression.
     * @param {String} regexp
     *          The regular expression to execute.
     *
     * @returns {Boolean} true if the given string is matching by given regular expression, false otherwise or if at least one parameter is
     *          null or undefined.
     */
    var isSelectorMatching = function(str, regexp) {
        var res = isSet(str) && isSet(regexp);

        if (res) {
            res = str.match(regexp);
            res = res === null ? false : res.length === 1;
        }

        return res;
    };

    /**
     * Determines whether or not the selector given in parameter is a class.
     *
     * @param {String} selector
     *          The string containing the selector used.
     *
     * @returns {Boolean} true if the given string is matching by given regular expression, false otherwise or if the parameter is null or
     *          undefined.
     */
    THIS.B.isClassQuery = function(selector) {
        return isSelectorMatching(selector, /^\.[a-zA-Z0-9_\-]+$/);
    };

    /**
     * Determines whether or not the selector given in parameter is an ID.
     *
     * @param {String} selector
     *          The string containing the selector used.
     *
     * @returns {Boolean} true if the given string is matching by given regular expression, false otherwise or if the parameter is null or
     *          undefined.
     */
    THIS.B.isIdQuery = function(selector) {
        return isSelectorMatching(selector, /^\#[a-zA-Z0-9_\-]+$/);
    };

    /**
     * Determines whether or not the selector given in parameter is an ID.
     *
     * @param {String} selector
     *          The string containing the selector used.
     *
     * @returns {Boolean} true if the given string is matching by given regular expression, false otherwise or if the parameter is null or
     *          undefined.
     */
    THIS.B.isTagQuery = function(selector) {
        return isSelectorMatching(selector, /^\<[a-zA-Z0-9_\-]+\>$/);
    };

    var FUNC_EVENT = {
        /**
         * Adds the specified event on this object to execute the function given in parameter once the event has been caught.
         *
         * @param {String} type
         *          The type of event to listen ("submit", "onload", etc.).
         * @param {Function} callback
         *          The function to execute once the event has been caught.
         */
        addEvent: function(type, callback) {
            this[type] = callback;
        },

        /**
         * Removes the specified event from this object.
         *
         * @param {String} type
         *          The type of event to listen ("submit", "onload", etc.).
         * @param {Function} callback
         *          The function to execute once the event has been caught.
         */
        removeEvent: function(type, callback) {
            this[type] = null;
        },
    };

    var FUNC_HTML = {
        /**
         * Adds an attribute into the current HTML tag. The added attribute will be based on the name and the value specified in parameter.
         *
         * @param {String} name
         *          The name of the attribute to add.
         * @param {String} value
         *          The content of the attribute to add.
         */
        addAttribute: function(name, value) {
            this.setAttribute(name, value);
        },

        /**
         * Replaces the content of the HTML tag by the one specified in parameter.
         *
         * @param {HTML as String} data
         *          The new data to insert into the current HTML tag.
         */
        appendHtmlContent: function(data) {
            if (this.innerHTML) {
                this.innerHTML += data;
            }
        },

        /**
         * Removes the current HTML object from its parent (and so the DOM).
         */
        remove: function() {
            this.parentNode.removeChild(document.getElementById(this.id));
        },

        /**
         * Replaces the content of the HTML tag by the one specified in parameter.
         *
         * @param {HTML as String} data
         *          The new data to insert into the current HTML tag.
         */
        replaceHtmlContent: function(data) {
            if (this.innerHTML) {
                this.innerHTML = data;
            }
        },

        /**
         * Updates an attribute of the current HTML tag by the value specified in parameter.
         *
         * @param {String} name
         *          The name of the attribute to add.
         * @param {String} value
         *          The content of the attribute to add.
         */
        updateAttribute: function(name, value) {
            this.setAttribute(name, value); // Update and add methods are the same in JavaScript.
        }
    };

    var FUNC_STYLE = {
        /**
         * Adds the specified class to the current HTML object.
         *
         * @param {String} name
         *          The name of the class to add.
         */
        addClass: function(name) {
            if (!this.hasClass(name)) {
                this.className += " " + name;
            }
        },

        /**
         * Determines whether a class already exists for this tag or not.
         *
         * @param {String} name
         *          The name of the class to research.
         *
         * @return true if the class exists, false otherwise.
         */
        hasClass: function(name) {
            var result = name !== undefined && name !== null && name !== "";

            if (result) {
                var regex = new RegExp('(?:\\s|^)' + name + '(?:\\s|$)');
                result = this.className.match(regex);
            }

            return result;
        },

        /**
         * Removes the specified class for the HTML object if exists.
         *
         * @param {String} name
         *          The name of the class to remove.
         */
        removeClass: function(name) {
            var regex = new RegExp('(?:\\s|^)' + name + '(?:\\s|$)');
            this.className = this.className.replace(regex, " ");
        },

        /**
         * Updates the specified style property with the given value (replaces the already existing one).
         *
         * @param {String} name
         *          The name of the style property to update.
         * @param {String}
         *          The value of the style property to update.
         */
        updateStyle: function(name, value) {
            this.style[name] = value;
        }
    };
})(this);
