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
 * along with BRATTAC.  If not, see <http://www.gnu.org/licenses/>.
 */

/* global expect, B */

/**
 * @author © ITAMETIS
 */
describe("================================================================", function() {
    describe("BRATTAC-API - Function B.isDefined() :", function() {
        it("Give a valid string as parameter", function() {
            expect(B.isDefined("regular parameter")).toBe(true);
        });
        it("Give 'null' as parameter", function() {
            expect(B.isDefined("null")).toBe(true);
        });
        it("Give 'undefined' as parameter", function() {
            expect(B.isDefined("undefined")).toBe(true);
        });
        it("Give 'new Object()' as parameter", function() {
            expect(B.isDefined(new Object())).toBe(true);
        });
        it("Give 'undefined' as parameter", function() {
            expect(B.isDefined(undefined)).toBe(false);
        });
    });


    describe("BRATTAC-API - Function B.isEmpty() :", function() {
        it("Give an empty string (i.e. \"\") as parameter", function() {
            expect(B.isEmpty("")).toBe(true);
        });
        it("Give an empty string (i.e. new String(\"\")) as parameter", function() {
            expect(B.isEmpty(new String(""))).toBe(true);
        });
        it("Give a regular string as parameter", function() {
            expect(B.isEmpty("non empty string")).toBe(false);
        });
        it("Give an Object as parameter", function() {
            expect(B.isEmpty(new Object())).toBe(false);
        });
        it("Give null as parameter", function() {
            expect(B.isEmpty(null)).toBe(false);
        });
    });


    describe("BRATTAC-API - Function B.isNotEmpty() :", function() {
        it("Give a regular string as parameter", function() {
            expect(B.isNotEmpty("non empty string")).toBe(true);
        });
        it("Give an empty string (i.e. \"\") as parameter", function() {
            expect(B.isNotEmpty("")).toBe(false);
        });
        it("Give an empty string (i.e. new String(\"\")) as parameter", function() {
            expect(B.isNotEmpty(new String(""))).toBe(false);
        });
        it("Give an Object as parameter", function() {
            expect(B.isNotEmpty(new Object())).toBe(false);
        });
        it("Give null as parameter", function() {
            expect(B.isNotEmpty(null)).toBe(false);
        });
    });


    describe("BRATTAC-API - Function B.isNotNull() :", function() {
        it("Give an empty string '\"\"' as parameter", function() {
            expect(B.isNotNull("")).toBe(true);
        });
        it("Give an empty string 'new String(\"\")' as parameter", function() {
            expect(B.isNotNull(new String(""))).toBe(true);
        });
        it("Give an object 'new Object()' as parameter", function() {
            expect(B.isNotNull(new Object())).toBe(true);
        });
        it("Give the string '\"undefined\"' as parameter", function() {
            expect(B.isNotNull("undefined")).toBe(true);
        });
        it("Give an object 'null' as parameter", function() {
            expect(B.isNotNull(null)).toBe(false);
        });
        it("Give an object '\"null\"' as parameter", function() {
            expect(B.isNotNull("null")).toBe(false);
        });
        it("Give an object 'undefined' as parameter", function() {
            expect(B.isNotNull(undefined)).toBe(false);
        });
    });


    describe("BRATTAC-API - Function B.isNull() :", function() {
        it("Give an object 'null' as parameter", function() {
            expect(B.isNull(null)).toBe(true);
        });
        it("Give an object '\"null\"' as parameter", function() {
            expect(B.isNull("null")).toBe(true);
        });
        it("Give an empty string '\"\"' as parameter", function() {
            expect(B.isNull("")).toBe(false);
        });
        it("Give an empty string 'new String(\"\")' as parameter", function() {
            expect(B.isNull(new String(""))).toBe(false);
        });
        it("Give an object 'new Object()' as parameter", function() {
            expect(B.isNull(new Object())).toBe(false);
        });
        it("Give the string '\"undefined\"' as parameter", function() {
            expect(B.isNull("undefined")).toBe(false);
        });
        it("Give an object 'undefined' as parameter", function() {
            expect(B.isNull(undefined)).toBe(false);
        });
    });


    describe("BRATTAC-API - Function B.isUndefined() :", function() {
        it("Give 'undefined' as parameter", function() {
            expect(B.isUndefined(undefined)).toBe(true);
        });
        it("Give a valid string as parameter", function() {
            expect(B.isUndefined("regular parameter")).toBe(false);
        });
        it("Give 'null' as parameter", function() {
            expect(B.isUndefined("null")).toBe(false);
        });
        it("Give 'undefined' as parameter", function() {
            expect(B.isUndefined("undefined")).toBe(false);
        });
        it("Give 'new Object()' as parameter", function() {
            expect(B.isUndefined(new Object())).toBe(false);
        });
    });
});
