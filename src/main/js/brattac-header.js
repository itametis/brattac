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
/**
 * Package containing the header code to include before each standalone module of Brattac.
 *
 * This package has no dependencies.
 *
 * @param {Object} B
 *          The namespace of the Brattac framework into which set all AJAX methods.
 * @param {Undefined} undefined
 *          A hack allowing to create a really "undefined" which is not a string.
 *
 * @author <a href="mailto:social@itametis.com">Davy CLAISSE / ITAMETIS</a>
 */
// This 'if-case' is a "hack". It creates the BRATTAC namespace (called B) only if it hasn't been declared before.
if (!this["B"])
    this.B = {};
