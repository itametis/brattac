# What is Brattac ?
Just another framework helping people to use "classes" in JavaScript (while EcmaScript 6 is not implemented everywhere). By "classes" I mean reproduce the behavior of classes in EcmaScript 5 but using JavaScript's Prototype like some other frameworks are doing it.

# Why did you developed Brattac ?
Firstly because it was fun ! But also because I would like to use the JavaScript's keyword "prototype" to declare my methods but this one was forcing me to split my class definitions from their method declarations. Using this way JavaScript "classes" doesn't look encapsulated and it is a little bit more difficult to read code for Java, Python, PHP or C# developer (what I am).

Moreover, I would like to provide a very easy way for my friends (which are not JavaScript developers at all) to use JavaScript inside their project but with the fastest learning curve possible. Basically, it should take you 5 minutes to learn it.

# What is the Brattac license ?
Brattac is provided under two licenses :
* The GNU/GPL version 3 (or at your option any later version) for free software and open-source community.
* A commercial license for closed-source software.

# Ok how does it work ?
Create empty class :
```javascript
B.Class({
    name: "Person"                                      // The class name
});

// Usage :
var colonel = new Person();
```





Create class with constructor :
```javascript
B.Class({
    name: "Person",                                     // The class name

    builder : function(gender, name, firstName) {       // Constructor
        // Attributes :
        this.name = name;
        this.firstName = firstName;
    }
});


// Usage :
var colonel = new Person("male", "O'Neil", "Jack");
```





Create class with constructor in 'com.itametis' package :
```javascript
B.Class({
    name: "Person",                                     // The class name
    namespace : "com.itametis",                         // The package where this class will be

    builder : function(gender, name, firstName) {       // Constructor
        // Attributes :
        this.name = name;
        this.firstName = firstName;
    }
});

// Usage :
var colonel = new com.itametis.Person("male", "O'Neil", "Jack");
```





How to add instance methods :
```javascript
B.Class({
    name: "Person",                                     // The class name
    namespace : "com.itametis",                         // The package where this class will be

    builder : function(gender, name, firstName) {       // Constructor
        // Attributes :
        this.name = name;
        this.firstName = firstName;
    },

    methods : {
        getName : function() {
            return this.name;
        },

        toString : function() {
            // You can call either an attribute or a method with the 'this' keyword :
            return this.firstName + " " + this.getName();
        },

        walk : function(destination) {
            // Just a walking algorithm...
        }
    },
});

// Usage :
var colonel = new Person("male", "O'Neil", "Jack");     // Builds instance
colonel.getName();                                      // Returns "O'Neil"
```





How to inherits :
```javascript
B.Class({
    name: "Person",                                     // The class name
    namespace : "com.itametis",                         // The package where this class will be

    builder : function(gender, name, firstName) {       // Constructor
        // ...
    },

    methods : {
        // ...
    },

    static_methods : {
        // ...
    }
});

B.Class({
    name: "Male",                                       // The class name
    namespace : "com.itametis",                         // The package where this class will be
    // inherits : "com.itametis.Person",                // How to inherit methods
    
    builder : function(name, firstName) {
        com.itametis.Human.call(this, "male", name, firstName); //  How to inherit attributes
    }
});


// Usage :
var colonel = new com.itametis.Male("O'Neil", "Jack");     // Builds instance
colonel.getName();                                         // Returns "O'Neil" from inherited method 'Person::getName()'
```





How to add static methods :
```javascript
B.Class({
    name: "Person",                                     // The class name
    namespace : "com.itametis",                         // The package where this class will be

    builder : function(gender, name, firstName) {       // Constructor
        // ...
    },

    methods : {
        // ...
    },

    static_methods : {
        isHumanBeing : function() {
            return true;
        }
    }
});

// Usage :
Person.isHumanBeing();   // Returns true
```





How to use constants in JavaScript :
```javascript
B.Class({
    name: "Person",                                     // The class name
    namespace : "com.itametis",                         // The package where this class will be

    builder : function(gender, name, firstName) {       // Constructor
        // ...
    },

    methods : {
        // ...
    },

    static_methods : {
        // ...
    },

    constants : {
        FIRST_CONST = "STARGATE",
        SECOND_CONST = "SG1"
    }
});


// Usage :
Person.constants.FIRST_CONST;                       // Returns "STARGATE"
Person.constants.FIRST_CONST = "something";         // Change simply ignored by Brattac
Person.constants.FIRST_CONST;                       // Returns "STARGATE"
```
