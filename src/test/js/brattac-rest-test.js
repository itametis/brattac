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
 * along with BRATTAC.  If not, see <http://www.gnu.org/licenses/gpl.txt >.
 *
 * If you need to develop a closed-source software, please contact us
 * at 'social@itametis.com' to get a commercial version of BRATTAC,
 * with a proprietary license instead.
 */
/* global expect, B */

/**
 * @author <a href="mailto:social@itametis.com">Davy CLAISSE / ITAMETIS</a>
 */
describe("================================================================", function() {
    describe("BRATTAC-REST - Test of B.formatQueryParams() :", function() {
        it("should return empty string with null parameters map", function() {
            // Given
            var paramMap = null;

            // When
            var result = B.formatQueryParams(paramMap);

            // Then
            expect(result).toEqual("");
        });

        it("should return empty string with undefined parameters map", function() {
            // Given
            var paramMap = null;

            // When
            var result = B.formatQueryParams(undefined);

            // Then
            expect(result).toEqual("");
        });

        it("should return empty string with a not setted parameters map", function() {
            // Given
            var paramMap = null;

            // When
            var result = B.formatQueryParams();

            // Then
            expect(result).toEqual("");
        });

        it("should return unique parameters as string", function() {
            // Given
            var paramsMap = Array();
            paramsMap["key1"] = "value1";

            // When
            var result = B.formatQueryParams(paramsMap);

            // Then
            expect(result).toEqual("key1=value1&");
        });

        it("should return regular parameters concatenated into string", function() {
            // Given
            var paramsMap = Array();
            paramsMap["key1"] = "value1";
            paramsMap["key2"] = "value2";

            // When
            var result = B.formatQueryParams(paramsMap);

            // Then
            expect(result).toEqual("key1=value1&key2=value2&");
        });

        it("should ignore null key during concatenation", function() {
            // Given
            var paramsMap = Array();
            paramsMap["A1"] = "AAA";
            paramsMap[null] = "BBB";
            paramsMap["C3"] = "CCC";

            // When
            var result = B.formatQueryParams(paramsMap);

            // Then
            expect(result).toEqual("A1=AAA&C3=CCC&");
        });
    });
});
