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
 * @author <a href="mailto:social@itametis.com">Davy CLAISSE / ITAMETIS</a>
 */
describe("================================================================", function() {
    describe("BRATTAC-OOP - Test of B.Class() :", function() {
        it("Class is created with default constructor", function() {
            B.Class({
                name: "Person"
            });
            expect(typeof Person).toEqual("function");
        });

        it("Methods are correctly injected with default constructor", function() {
            B.Class({
                name: "Person",

                methods: {
                    display: function() {
                        return "Deadpool";
                    }
                }
            });
            expect(new Person().display()).toEqual("Deadpool");
        });

        it("Class is created with specified constructor", function() {
            B.Class({
                name: "Person",
                builder: function(name) {
                    this.name = name;
                }
            });
            var p = new Person("Batman");
            expect(p.name).toEqual("Batman");
        });

        it("Methods are correctly injected with specified constructor", function() {
            B.Class({
                name: "Person",

                builder: function(name) {
                    this.name = name;
                },

                methods: {
                    getName: function() {
                        return this.name;
                    }
                }
            });
            var p = new Person("Batman");
            expect(p.getName()).toEqual("Batman");
        });

        it("Methods can call each other", function() {
            // Given
            B.Class({
                name: "Person",

                builder: function(name) {
                    this.name = name;
                },

                methods: {
                    duplicateName: function() {
                        return this.getName() + this.getName();
                    },

                    getName: function() {
                        return this.name;
                    }
                }
            });

            // When
            var p = new Person("Batman");

            // Then
            expect(p.duplicateName()).toEqual("BatmanBatman");
        });

        it("Methods ordering declaration has no impact on method calls", function() {
            // Given
            B.Class({
                name: "Person",

                builder: function(name) {
                    this.name = name;
                },

                // Here, method declaration ordering is different from the previous case
                methods: {
                    getName: function() {
                        return this.name;
                    },

                    duplicateName: function() {
                        return this.getName() + this.getName();
                    }
                }
            });

            // When
            var p = new Person("Batman");

            // Then
            expect(p.duplicateName()).toEqual("BatmanBatman");
        });


        it("Namespace of one depth level is correctly created and class injected into it", function() {
            B.Class({
                name: "Person",
                namespace: "itametis",

                builder: function(name) {
                    this.name = name;
                },

                methods: {
                    getName: function() {
                        return this.name;
                    }
                }
            });
            expect(typeof itametis.Person).toEqual("function");
        });

        it("Namespaces with more than one depth level are created recursively and class injected into it", function() {
            B.Class({
                name: "Person",
                namespace: "itametis.sample.subspace",

                builder: function(name) {
                    this.name = name;
                },

                methods: {
                    getName: function() {
                        return this.name;
                    }
                }
            });
            expect(typeof itametis.sample.subspace.Person).toEqual("function");
            expect(typeof new itametis.sample.subspace.Person("test")).not.toBeNull();
        });

        it("Inheritance of methods is working with existing mother class", function() {
            // Given
            B.Class({
                name: "Person",
                namespace: "itametis",

                builder: function(name) {
                    this.name = name;
                },

                methods: {
                    getName: function() {
                        return this.name;
                    }
                }
            });

            B.Class({
                inherits: itametis.Person,
                name: "Student",
                namespace: "itametis",

                builder: function(name, degree) {
                    itametis.Person.call(this, name);
                    this.degree = degree;
                },

                methods: {
                    getDegree: function() {
                        return this.degree;
                    }
                }
            });

            // When
            var student = new itametis.Student("Batman", "MBA");

            // Then
            expect(student.getName()).toEqual("Batman");
            expect(student.getDegree()).toEqual("MBA");
        });

        it("Inherits can be used with string instead of class reference", function() {
            // Given
            B.Class({
                name: "Person",
                namespace: "itametis",

                builder: function(name) {
                    this.name = name;
                },

                methods: {
                    getName: function() {
                        return this.name;
                    }
                }
            });

            B.Class({
                inherits: "itametis.Person",
                name: "Student",
                namespace: "itametis",

                builder: function(name, degree) {
                    itametis.Person.call(this, name);
                    this.degree = degree;
                },

                methods: {
                    getDegree: function() {
                        return this.degree;
                    }
                }
            });

            // When
            var student = new itametis.Student("batman", "MBA");

            // Then
            expect(student.getName()).toEqual("batman");
            expect(student.getDegree()).toEqual("MBA");
        });

        it("Static methods are correctly set", function() {
            B.Class({
                name: "Person",
                namespace: "itametis",

                static_methods: {
                    isHuman: function() {
                        return true;
                    }
                }
            });

            expect(itametis.Person.isHuman()).toEqual(true);
        });

        it("Static methods are not inherited by sub-classes", function() {
            // Given
            B.Class({
                name: "Human",
                namespace: "itametis",

                static_methods: {
                    isHuman: function() {
                        return true;
                    }
                }
            });

            B.Class({
                inherits: itametis.Human,
                name: "Person",
                namespace: "itametis"
            });

            // Then
            expect(itametis.Person.isHuman).toEqual(undefined);
        });

        it("Constants are correctly set", function() {
            // Given
            B.Class({
                name: "Enterprise",
                builder: {},
                constants: {
                    NAME: "ITAMETIS",
                    NB_FRAMEWORK: 1
                }
            });

            // Then
            expect(Enterprise.constants.NAME).toEqual("ITAMETIS");
            expect(Enterprise.constants.NB_FRAMEWORK).toEqual(1);
        });

        it("Constants are immutabe", function() {
            // Given
            B.Class({
                name: "Enterprise",

                constants: {
                    NAME: "ITAMETIS"
                }
            });

            // Then
            Enterprise.constants.NAME = "Change ignored because constants are immutable";
            expect(Enterprise.constants.NAME).toEqual("ITAMETIS");
        });

        it("Invalid keywords are detected by framework during initialization of class", function() {
            // Given
            var exceptionMessage = "Class initialization error : one keyword used is not authorized please check spelling. List of authorized"
                + " keyword : builder,constants,inherits,methods,name,namespace,static_methods";
            var msg = null;

            // When
            try {
                B.Class({
                    name: "MotherClass",
                    namespace: "itametis",
                    methods: {
                        fakeMethod: function() {
                        }
                    }

                });

                B.Class({
                    inherits: "itametis.MotherClass",
                    name: "DaughterClass",
                    namespace: "itametis",
                    constants: {},
                    builder: {},
                    methods: {
                    },
                    static_methods: {
                    },
                    badKeyword: {}
                });
            }
            catch (ex) {
                msg = ex;
            }

            // Then
            expect(msg).toEqual(exceptionMessage);
        });
    });
});
