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
/* global B */

/**
 * Package containing the AJAX/REST code of Brattac.
 *
 * This package depends of (in the following order) :
 * <ul>
 *      <ol>brattac-dom.js</ol>
 *      <ol>brattac-logger.js</ol>
 * </ul>
 *
 * @param {Object} B
 *          The namespace of the Brattac framework into which set all AJAX/REST methods.
 * @param {Undefined} undefined
 *          A hack allowing to create a really "undefined" which is not a string.
 */
(function(B, undefined) {
    /**
     * Converts a map of parameters into a String using the following format : key1=value1&key2=value2&... Parameter
     * with null or empty name are ignored.
     *
     * @param {Array<String, String>} paramsMap
     *          The map of parameter to convert as POST / PUT / DELETE HTTP parameters format (i.e concatenated as a
     *          String).
     * @returns {String} All the parameter concatenated into a String only if there key is not null and defined. Returns
     *                   an empty String if specified parameter is null, undefined or empty.
     */
    B.formatQueryParams = function(paramsMap) {
        var res = "";

        if (B.isNotNull(paramsMap)) {
            for (var key in paramsMap) {
                if (B.isNotNull(key)) {
                    res += key + "=" + encodeURIComponent(paramsMap[key]) + "&";
                }
            }
        }

        return res;
    };
})(B);

