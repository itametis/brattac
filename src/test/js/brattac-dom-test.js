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
/**
 * @author © ITAMETIS
 */
describe("================================================================", function() {
    describe("BRATTAC-DOM : Function B.isIdQuery() :", function() {
        it("Give valid ID in lower case as parameter", function() {
            expect(B.isIdQuery("#lowercaseid")).toBe(true);
        });
        it("Give valid ID in UPPER CASE as parameter", function() {
            expect(B.isIdQuery("#UPPERCASEID")).toBe(true);
        });
        it("Give valid ID containing mixed case as parameter", function() {
            expect(B.isIdQuery("#mixedCase")).toBe(true);
        });
        it("Give valid ID containing digits as parameter", function() {
            expect(B.isIdQuery("#3miDDed7Case34")).toBe(true);
        });
        it("Give valid ID containing minus '-' character as parameter", function() {
            expect(B.isIdQuery("#an-other-id")).toBe(true);
        });
        it("Give valid ID containing underscore '_' character as parameter", function() {
            expect(B.isIdQuery("#an_other_id")).toBe(true);
        });
        it("Give invalid ID not starting by a sharp '#'", function() {
            expect(B.isIdQuery("invalidIdWithoutSharp")).toBe(false);
        });
        it("Give invalid ID containing spaces", function() {
            expect(B.isIdQuery("#invalidId with spaces")).toBe(false);
        });
        it("Give invalid ID containing invalid CSS selection characters", function() {
            expect(B.isIdQuery("#invalidId span")).toBe(false);
            expect(B.isIdQuery("#invalidId>div")).toBe(false);
            expect(B.isIdQuery("#invalidId.ul")).toBe(false);
            expect(B.isIdQuery("#invalidId,ul")).toBe(false);
        });
    });

    describe("BRATTAC-DOM : Function B.isClassQuery() :", function() {
        it("Give valid class in lower case as parameter", function() {
            expect(B.isClassQuery(".lowercaseclass")).toBe(true);
        });
        it("Give valid class in UPPER CASE as parameter", function() {
            expect(B.isClassQuery(".UPPERCASECLASS")).toBe(true);
        });
        it("Give valid class containing mixed case as parameter", function() {
            expect(B.isClassQuery(".mixedCase")).toBe(true);
        });
        it("Give valid class containing digits as parameter", function() {
            expect(B.isClassQuery(".3mb3DDed7Case34")).toBe(true);
        });
        it("Give valid class containing minus '-' character as parameter", function() {
            expect(B.isClassQuery(".an-other-class")).toBe(true);
        });
        it("Give valid class containing underscore '_' character as parameter", function() {
            expect(B.isClassQuery(".an_other_class")).toBe(true);
        });
        it("Give invalid class not starting by a dot '.'", function() {
            expect(B.isClassQuery("invalidClassWithoutDot")).toBe(false);
        });
        it("Give invalid class containing spaces", function() {
            expect(B.isClassQuery(".invalidClass with spaces")).toBe(false);
        });
        it("Give invalid class containing invalid CSS selection characters", function() {
            expect(B.isClassQuery(".invalidClass span")).toBe(false);
            expect(B.isClassQuery(".invalidClass>div")).toBe(false);
            expect(B.isClassQuery(".invalidClass.ul")).toBe(false);
            expect(B.isClassQuery(".invalidClass,ul")).toBe(false);
        });
    });


    describe("BRATTAC-DOM : Function B.isTagQuery() :", function() {
        it("Give valid tag in lower case as parameter", function() {
            expect(B.isTagQuery("<div>")).toBe(true);
        });
        it("Give valid tag in UPPER CASE as parameter", function() {
            expect(B.isTagQuery("<DIV>")).toBe(true);
        });
        it("Give valid tag containing mixed case as parameter", function() {
            expect(B.isTagQuery("<SpAn>")).toBe(true);
        });
        it("Give valid tag containing digits as parameter", function() {
            expect(B.isTagQuery("<3miDDed7Case34>")).toBe(true);
        });
        it("Give valid tag containing minus '-' character as parameter", function() {
            expect(B.isTagQuery("<an-other-tag>")).toBe(true);
        });
        it("Give valid tag containing underscore '_' character as parameter", function() {
            expect(B.isTagQuery("<an_other_tag>")).toBe(true);
        });
        it("Give invalid tag not starting by '<'", function() {
            expect(B.isTagQuery("invalidTag>")).toBe(false);
        });
        it("Give invalid tag not ending by '>'", function() {
            expect(B.isTagQuery("<invalidTag")).toBe(false);
        });
        it("Give invalid tag containing spaces", function() {
            expect(B.isTagQuery("<invalid tag with spaces>")).toBe(false);
        });
        it("Give invalid tag containing invalid CSS selection characters", function() {
            expect(B.isTagQuery("<invalidClass span>")).toBe(false);
            expect(B.isTagQuery("<invalidClass>div>")).toBe(false);
            expect(B.isTagQuery("<invalidClass.ul>")).toBe(false);
            expect(B.isTagQuery("<invalidClass,ul>")).toBe(false);
        });
    });
});
