/* This file is part of BRATTAC.
 *
 * BRATTAC is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * BRATTAC is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with BRATTAC.  If not, see <http://www.gnu.org/liceTHISes/>.
 *
 * If you need to develop a closed-source software, please contact us
 * at 'kysofer@itametis.com' to get a commercial version of BRATTAC,
 * with a proprietary license instead.
 */
/**
 * Package containing the OOP framework of Brattac.
 *
 * This package depends of (in the following order) :
 * <ul>
 *      <ol>Required : brattac-header.js</ol>
 * </ul>
 *
 * @param {Object} THIS
 *          Either the "window", "document" or the current "this" JavaScript object.
 * @param {Object} B
 *          The package into which place this framework, generally the "window" variable provided by browsers but can be "this" too.
 * @param {Undefined} undefined
 *          A hack allowing to create a really "undefined" value which is not a string type.
 *
 * @author <a href="mailto:kysofer@itametis.com">kysofer</a>
 */
(function(THIS, B, undefined) {
    "use strict";
    /**
     * This function is a kind of helper making easier the "Class" definition in JavaScript. The goal is to provide a way more compliant
     * with the Java Oriented-Object syntax grouping all methods, constructor and attributes inside the same declaration. Moreover, the goal
     * is to hide the prototype method declaration complexity to the Java developer by ensuring this point is always correctly done ; and
     * keep the encapsulation principle safe.<br />
     * <br />
     * <b>Usage :</b>
     * <pre>
     *      <code>
     *          B.Class({
     *              // For the inherits line, quotes are facultative so you can also type 'inherits : "com.itametis.Human",' instead of the
     *              // one below :
     *              inherits : "com.itametis.Human",
     *              name : "Person",
     *              namespace : "com.itametis",
     *
     *              builder : function(gender, name, firstName) {
     *                  // Equivalent to super() function in Java in order to give the rights parameters to the mother class constructor :
     *                  com.itametis.Human.call(this, gender);
     *
     *                  // Defintion of attributes :
     *                  this.name = name;
     *                  this.firstName = firstName;
     *              },
     *
     *              methods : {
     *                  getName : function() {
     *                      return this.name;
     *                  },
     *
     *                  toString : function() {
     *                      return this.firstName + " " + this.name;
     *                  }
     *
     *                  walk : function(destination) {
     *                      // Just a walking algorithm...
     *                  },
     *              },
     *
     *              static_methods : {
     *                  isHumanBeing : function() {
     *                      return true;
     *                  },
     *              }
     *          });
     *
     *          var colonel = new Person("Jack", "O'Neil", "male");
     *          colonel.walk("Into the Stargate");
     *     </code>
     * </pre>
     *
     * @param {JSON structure} body
     *         The body declaration (using JSon syntax) of the class to initialize.
     *
     * @returns A prototype of the class to define.
     */
    B.Class = function(body) {
        if (isValid(body)) {
            if (hasInvalidNames(body)) {
                throw "Class initialization error : one keyword used is not authorized please check spelling. List of authorized keyword : " + VALID_KEYWORDS.toString();
            }
            else {
                var n = initPackage(body);
                var c = initClass(body);
                inherits(body, c);
                addMethods(body, c);
                addConstants(body, c);
                addStaticMethods(body, c);
                setClassIntoNamespace(body, n, c);
            }
        }
    };

    /**
     * The list of all keywords of the brattac-oop framework.
     */
    var VALID_KEYWORDS = ["builder", "constants", "inherits", "methods", "name", "namespace", "static_methods"];

    /**
     * Adds all constants declared inside the "constants" attribute of the JSON declaration, as constants of the prototype of the class in
     * creation.
     *
     * @param {JSON} body
     *          The JSON declaration of all methods to add to the prototype of the class in creation.
     */
    var addConstants = function(body, c) {
        if (isValid(body["constants"])) {
            c.constants = {};
            for (var name in body.constants) {
                c.constants[name] = body.constants[name];
            }
            Object.seal(c.constants);
            Object.freeze(c.constants);
        }
    };

    /**
     * Adds all functions declared inside the "methods" attributes of the JSON declaration to the prototype of the class in creation.
     *
     * @param {JSON} body
     *          The JSON declaration of all methods to add to the prototype of the class in creation.
     */
    var addMethods = function(body, c) {
        if (isValid(body["methods"])) {
            for (var name in body.methods) {
                c.prototype[name] = body.methods[name];
            }
        }
    };

    /**
     *
     *
     */
    var addParentKeyword = function(parentProto, c) {
        c.prototype.parent = parentProto.prototype;
    };

    /**
     * Adds all functions declared inside the "static_methods" attribute of the JSON declaration, as static methods of the prototype of the
     * class in creation.
     *
     * @param {JSON} body
     *          The JSON declaration of all methods to add to the prototype of the class in creation.
     */
    var addStaticMethods = function(body, c) {
        if (isValid(body["static_methods"])) {
            for (var name in body.static_methods) {
                c[name] = body.static_methods[name];
            }
        }
    };

    /**
     * Returns the reference of a prototype from the string of his path. For instance, returns the reference to the object Person by giving
     * the string "com.itametis.Person".
     *
     * @param {String} path
     *          The canonical path of a class.
     *
     * @returns {Object} The reference to the object target by the given path.
     */
    var findMotherInstance = function(path) {
        var names = path.split("\.");
        var node = THIS;
        for (var i in names) {
            node = node[names[i]];
        }
        return node;
    };

    /**
     * Determines if the body specified in parameter has invalid keywords used as JSON keys inside its declaration.
     *
     * @param {JSON}
     *          The JSON object to check and containing the declaration of the class to build.
     *
     * @returns {Boolean} true if the body declaration contains invalid names, false otherwise.
     */
    var hasInvalidNames = function(body) {
        var res = false;

        for (var keyword in body) {
            if (isInvalidKeyword(keyword)) {
                res = true;
                break;
            }
        }

        return res;
    };

    /**
     * Sets a prototype as a parent of the prototype in creation.
     *
     * @param {JSON} body
     *          The JSON declaration containing the attribute "inherits" to set as parent prototype of the prototype in creation.
     */
    var inherits = function(body, c) {
        if (isValid(body["inherits"])) {
            var motherClass = body["inherits"];
            if (typeof motherClass === "string") {
                if (0 < motherClass.length) {
                    var node = findMotherInstance(motherClass);
                    c.prototype = Object.create(node.prototype);
                    addParentKeyword(node.prototype, c);
                }
            }
            else {
                c.prototype = Object.create(body.inherits.prototype);
                addParentKeyword(body.inherits.prototype, c);
            }
        }
    };

    /**
     * Initializes the function object that will correspond to the class to generate.
     *
     * @parameter {JSON} body
     *          The JSON body containing the key builder to use if it exists.
     *
     * @returns {Function} The constructor of the class to build.
     */
    var initClass = function(body) {
        return isValid(body["builder"]) ? body.builder : function() {};
    };

    /**
     * Builds a namespace given in parameter and completes it if necessary.
     *
     * @parameter {JSON} body
     *          The JSON body containing the key namespace to build (if it's not exist).
     *
     * @returns {Object} The namespace built by the method.
     */
    var initPackage = function(body) {
        var node = THIS;

        if (isValid(body["namespace"])) {
            var names = body.namespace.split("\.");

            var name = null;
            for (var i in names) {
                name = names[i];
                node[name] = !node[name] ? {} : node[name];
                node = node[name];
            }
        }

        return node;
    };

    /**
     * Determines whether or not, the keyword given in parameter is inside the list of the ones defined by this framework.
     *
     * @param {String} keyword
     *          The keyword name to research inside of the autorized keywords list.
     *
     * @returns {Boolean} true if the specified keyword is invalid, false otherwise.
     */
    var isInvalidKeyword = function(keyword) {
        return VALID_KEYWORDS.indexOf(keyword) === -1;
    };

    /**
     * Determines whether the parameter is defined and not null.
     *
     * @param {Object} prop
     *          The JS element to check.
     *
     * @returns {Boolean} true if the element exits, false otherwise.
     */
    var isValid = function(prop) {
        return prop !== undefined && prop !== null;
    };

    /**
     * Sets the class into the specified namespace.
     *
     * @param {JSON} body
     *          The JSON declaration containing the attribute "name" to set as class name.
     * @param {Object} n
     *          The namespace into which set the class.
     * @param {Object} c
     *          The class to set as member of the given namespace.
     */
    var setClassIntoNamespace = function(body, n, c) {
        if (isValid(body["name"])) {
            n[body.name] = c;
        }
        else {
            throw "Please define a name for this class";
        }
    };
})(this, B);
