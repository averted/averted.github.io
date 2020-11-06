## Classes

### Overview
- Class declarations, unlike functions, are not hoisted
- All methods are nonenumerable
- Calling class constructor without new throws an error (`new.target` always exists)

### Classes as First-Class Citizens
A **first-class citizen** is a value that can be passed into a function, returned from a function, and assigned to a variable.
Every JS Function is a first-class citizen, and Classes are as well (can be passed around as arguments inside a fn).

### Accessor Properties
Classes allow you to define **accessor properties** on the prototype. Ie:

```js
class CustomHTMLElement {
  constructor(elment) {
    this.element = element;
  }

  get html() {
    return this.element.innerHTML;
  }

  set html(value) {
    this.element.innerHTML = value;
  }
}
```

### Computed Member Names
Class methods and accessor properties can also have computed names: Ie:

```js
const methodName = 'sayName';
const propertyName = 'html';

class Person {
  constructor(name, element) {
    this.name = name;
    this.element = element;
  }

  [methodName]() {
    console.log(this.name);
  }

  get [propertyName]() {
    return this.element.innerHTML;
  }

  set [propertyName](value) {
    this.element.innerHTML = value;
  }
}
```

### Inheritance with Derived Classes
Classes that inherit from other classes are called *derived classes*.
Derived classes require you to use `super()` if you specify a constructor.

Accepting any type of expression after `extends` offers powerful possibilities, such as dynamically determining what to inherit from. Ie:
```js
class Animal {

}

function getBase() {
  return Animal;
}

class Dog extends getBase() {

}
```

And because you can determine the base class dynamically, it's possible to create different inheritance approaches - for example *mixins*.
```js
const SerializableMixin = {
  serialize() {
    return JSON.stringify(this);
  }
}

const AreaMixin = {
  getArea() {
    return this.lenght * this.width;
  }
}

function mixin(...mixins) {
  const base = function() {};
  Object.assign(base.prototype, ...mixins);
  return base;
}

class Square extends mixin(AreaMixin, SerializableMixin) {
  constructor(length) {
    super();
    this.width = length;
    this.length = length;
  }
}

let x = new Square(3);
x.getArea();
x.serialize();
```

### `Symbol.species` property
Any method that returns an instance of a build-in (i.e. Array), will automatically return a derived class instance instead.
```js
class MyArray extends Array {

}

let items = new MyArray(1,2,3,4)
  , subitems = items.slice(1, 3);

console.log(items instance of MyArray);               // true
console.log(subitems instance of MyArray);            // true
```

The `Symbol.species` is used to define a static accessor property that returns a function.
```js
// several built-ins use species similar to this
class MyClass {
  static get [Symbol.species]() {
    return this;
  }

  constructor(value) {
    this.value = value;
  }

  clone() {
    return new this.constructor[Symbol.species](this.value);
  }
}
```
The `clone()` method uses species to return a new instance rather than directly using `MyClass`, which allows direved classes to override that value.
In general, you should use `Symbol.species` property whenever you might want to use `this.contructor` in a class method.
Doing so allows deived classes to override the return type easily.

### `new.target` in Class Constructors
You can use `new.target` in class constructors to determine how the class is being invoked.
This is useful because it gives each sontructor the ability to alter it's behaviour.
For example you can create an *abstract class* (a class that can't be initialized directly):
```js
class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error('Abstract class: cannot initialize directly');
    }
  }
}

class Rect extends Shape {

}

let x = new Shape();                  // error
let y = new Rect(3, 4);               // no error
console.log(y instance of Shape);     // true
```

### Experiments

```js
class SomeElement {
  constructor() {
    this.element = {
      value: 'something',
      another: 'another',
    }
  }

  get html() {
    return this.element.value;
  }

  set html(value) {
    this.element.value = value;
  }
}

let some = new SomeElement();
some.html = 'test'
console.log(some)
```

