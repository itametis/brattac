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
 * Package containing the code of Brattac API.
 *
 * This package depends of (in the following order) :
 * <ul>
 *      <ol>brattac-header.js</ol>
 * </ul>
 *
 * @param {Object} B
 *          The namespace into which place the Brattac's API method.
 * @param {Undefined} undefined
 *          A hack allowing to create a really "undefined" which is not a string.
 */
(function(B, undefined) {
    /**
     * Determines if the parameter is defined. This means this object has a name space and is correctly initialized in memory.
     * <br />
     * Examples of code :
     * <pre>
     *     <code>
     *          B.isDefined("some value");          // Returns true.
     *          B.isDefined("null");                // Returns true.
     *          B.isDefined("undefined");           // Returns true.
     *          B.isDefined(new Object());          // Returns true.
     *
     *          B.isDefined(undefined);             // Returns false.
     *     </code>
     * </pre>
     *
     * @param {Object} object
     *          The object to check.
     *
     * @return true if the object is defined, false otherwise.
     */
    B.isDefined = function(object) {
        return !B.isUndefined(object);
    };

    /**
     * Determines if the parameter is an empty string. This means the type of the parameter is checked by the method then the the emptiness
     * check is executed.<br />
     * <br />
     * Examples of code :
     * <pre>
     *     <code>
     *          B.isEmpty("");                      // return true.
     *          B.isEmpty(new String(""));          // return true.
     *
     *          B.isEmpty("string with text");      // return false.
     *          B.isEmpty(new Object());            // return false.
     *          B.isEmpty(null);                    // return false.
     *     </code>
     * </pre>
     *
     * @param {Object} object
     *          The object to check.
     *
     *
     * @return true if the object is a string and it is empty, false otherwise.
     */
    B.isEmpty = function(object) {
        return  object === "" || ((typeof object === "object") && (object == ""));
    };

    /**
     * Determines if the parameter is a non-empty string. This means the type of the parameter is checked by the method then the emptiness
     * check is executed.<br />
     * <br />
     * Examples of code :
     * <pre>
     *     <code>
     *          B.isNotEmpty("string with text");   // return true.
     *
     *          B.isNotEmpty("");                   // return false.
     *          B.isNotEmpty(new String(""));       // return false.
     *          B.isNotEmpty(new Object());         // return false.
     *          B.isNotEmpty(null);                 // return false.
     *     </code>
     * </pre>
     *
     * @param {Object} object
     *          The object to check.
     *
     * @return true if the object is a string and it is empty, false otherwise.
     */
    B.isNotEmpty = function(object) {
        return !B.isNull(object) && (typeof object === "object" ? object.length > 0 : object !== "");
    };

    /**
     * Determines if the parameter is not null.<br />
     * <br />
     * Examples of code :
     * <pre>
     *     <code>
     *          B.isNotNull("");                    // return true.
     *          B.isNotNull(new String(""));        // return true.
     *          B.isNotNull(new Object());          // return true.
     *          B.isNotNull("undefined");           // return true.
     *
     *          B.isNotNull(null);                  // return false.
     *          B.isNotNull(undefined);             // return false.
     *     </code>
     * </pre>
     *
     * @param {Object} object
     *          The object to check.
     *
     * @return true if the object is defined and not null, false otherwise.
     */
    B.isNotNull = function(object) {
        return B.isDefined(object) && object !== null;
    };

    /**
     * Determines if the parameter is null.<br />
     * <br />
     * Examples of code :
     * <pre>
     *     <code>
     *          B.isNull(null);                  // return true.
     *
     *          B.isNull("");                    // return false.
     *          B.isNull(new String(""));        // return false.
     *          B.isNull(new Object());          // return false.
     *          B.isNull("undefined");           // return false.
     *          B.isNull(undefined);             // return false.
     *     </code>
     * </pre>
     *
     * @param {Object} object
     *          The object to check.
     *
     * @return true if the object is defined and null, false otherwise.
     */
    B.isNull = function(object) {
        return B.isDefined(object) && object === null;
    };

    /**
     * Determines if the parameter is defined. This means this object has a name space and is correctly initialized in memory.
     * <br />
     * Examples of code :
     * <pre>
     *     <code>
     *          B.isDefined(undefined);             // Returns true.
     *
     *          B.isDefined("some value");          // Returns false.
     *          B.isDefined("null");                // Returns false.
     *          B.isDefined("undefined");           // Returns false.
     *          B.isDefined(new Object());          // Returns false.
     *     </code>
     * </pre>
     *
     * @param {Object} object
     *          The object to check.
     *
     * @return true if the object is defined, false otherwise.
     */
    B.isUndefined = function(object) {
        return object === undefined;
    };
})(B);
