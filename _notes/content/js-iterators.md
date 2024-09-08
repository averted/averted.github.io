+++
title = "Iterators / Generators"
date = 2016-11-09

[taxonomies]
tags = ["js"]
+++

### Iterators
**_Iterators_** are **objects** with a specific interface designed for iteration.
All iterator objects have a `next()` method that returns a result object.
The result object has two proerties: `value`, which is the next value, and `done`, which is a Boolean that's `true` when there are no more values to return.
The iterator keeps an internal pointer to a location within a collection of values, and with each call to the `next()` method it returns the next appropriate value.

Manually creating an iterator using ECMAScript 5 spec:
```js
function createIterator(items) {
  let i = 0;

  return {
    next: function() {
      let done = (i >= items.length);
      let value = !done ? items[i++] : undefined;
      return { done, value };
    }
  }
}

let iterator = createIterator([1, 2, 3]);

console.log(iterator.next());     // { value: 1, done: false }
console.log(iterator.next());     // { value: 2, done: false }
console.log(iterator.next());     // { value: 3, done: false }
console.log(iterator.next());     // { value: undefined, done: true }
```

<!-- more -->

Writing iterators manually is a bit complex, fortunately ECMAScript 6 also provides **_generators_**, which make creating iterator objects much simpler.

### Generators
A **_generator_** is a **function** that returns an iterator. Generator functions are indicated by an asterisk (\*) character.

```js
function *createIterator() {
  yield 1;
  yield 2;
  yield 3;
}
// ------------------------------------------
function *createIterator(items) {
  for (let i = 0; i < items.length; i++) {
    yield items[i];
  }
}
// ------------------------------------------
let createIterator = function *(items) {
  for (let i = 0; i < items.length; i++) {
    yield items[i];
  }
}
// ------------------------------------------
let obj = {
  *createIterator(items) {
    for (let i = 0; i < items.length; i++) {
      yield items[i];
    }
  }
}
// ------------------------------------------

let iterator = obj.createIterator([1,2,3]);
console.log(iterator.next().value);   // 1
console.log(iterator.next().value);   // 2
console.log(iterator.next().value);   // 3
```

Perhaps the most interesting aspect generator functions is that they stop execution after each `yield` statement.
You can only use `yield` keyword inside generators, as `yield` cannot cross funciton boundaries.
```js
function *createIterator(items) {
  items.map(function(item) {
    // syntax error
    yield item;
  });
}
```
> Note: Creating an arrow function that is also a generator is not possible.

### For-of Loops
Closely related to iterators, an _iterable_ is an object with a `Symbol.iterator` property, which specifies a function that returns an iterator for the given object.
All collection objects (arrays, sets, maps) and strings are iterables in ECMAScript 6, so they have a default iterator specified.
All iterators created by generators are also iterables, because generators assign the `Symbol.iterator` property by default.

A `for-of` loop calls `next()` on an iterable each time the loop executes, and stores the `value` from result objet in a variable:

```js
let items = [1,2,3];

for (let item of items) {
  console.log(item);
}
```
This `for-of` loop first calls the `Symbol.iterator` method on the `items` array to retrieve an iterator (happens behind the scenes), then `iterator.next()` is called.

### Accessing the Default Iterator
You can use `Symbol.iterator` to access the default iterator for an object, like this:
```js
let values = [1,2,3];
let iterator = values[Symbol.iterator]();

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
```

Because `Symbol.iterator` specifies the default iterator, you can use it to detect whether an objet is iterable or not:
```js
function isIterable(obj) {
  return typeof obj[Symbol.iterator] === 'function';
}
```
The `for-of` loop does a similar check before executing.

### Creating Iterables
Developer-defined objects are not iterable by default, but you can make them iterable by creating a `Symbol.iterator` property containing a generator.
```js
let collection = {
  items: [],
  *[Symbol.iterator]() {
    for (let item of this.items) {
      yield item;
    }
  }
}

collection.items.push(1);
collection.items.push(2);
collection.items.push(3);

for (let x of collection) {
  console.log(x);                   // 1 2 3
}
```

### Spread Operator and Non-Array Iterables
The spread operator works on all iterables, and uses the default iterator to determine which values to include:
```js
let set = new Set([1,2,3,3,3,4,5]);
let arr = [...set];
console.log(arr);     // [1,2,3,4,5]
```

### Advanced Iterator Functionality
Iterators can be used for tasks other than simply iterating over a collection of values.

#### Passing Arguments to Iterators
You can pass arguments to an iterator through the `next()` method. That argument becomes the value of `yield` statement inside a generator:
```js
function *createIterator() {
  let first = yield 1;
  let second = yield first + 2;
  yield second + 3;
}

let iterator = createIterator();
console.log(iterator.next());         // { value: 1, done: false }
console.log(iterator.next(4));        // { value: 6, done: false }
console.log(iterator.next(5));        // { value: 8, done: false }
console.log(iterator.next());         // { value: undefined, done: true }
```
The first call to `next()` is a special case where _any argument passed to is is lost_.
Because arguments passed to `next()` become the values returned by `yield`, an agrument from the first call to `next()` could only replace the first `yield` statement if it could be accessed before that `yield` statement. That's not possible, so there is no point passing an argument the first time `next()` is called.

#### Throwing Errors in Iterators
You can catch errors inside the generator using a `try-catch` block:
```js
function *createIterator() {
  let first = yield 1;
  let second;

  try {
    second = yield first + 2;
  } catch () {
    second = 6;
  }

  yield second + 3;
}

let iterator = createIterator();
console.log(iterator.next());                 // { value: 1, done: false }
console.log(iterator.next(4));                // { value: 6, done: false }
console.log(iterator.throw(new Error()));     // { value: 9, done: false }
console.log(iterator.next());                 // { value: undefined, done: true }
```

#### Generator Return Statements
Because generators are functions, you can use the `return` statement to exit early, and specify a return value for the **last call** to the `next()` method.
```js
function *createIterator() {
  yield 1;
  return 42;
}

let iterator = createIterator();
console.log(iterator.next());       // { value: 1, done: false }
console.log(iterator.next());       // { value: 42, done: true }
```

> Note: The spread operator and `for-of` loop ignore any value specified by a `return` statement.

#### Delegating Generators
Generators can delegate to other generator using a special form of `yield` with an asterisk (\*). I.e:
```js
function *createNumberIterator() {
  yield 1;
  yield 2;
}

function *createColorIterator() {
  yield 'red';
  yield 'green';
}

function *createCombinedIterator() {
  yield *createNumberIterator();
  yield *createColorIterator();
  yield true;
}

let iterator = createCombinedIterator();
console.log(iterator.next());           // { value: 1, done: false }
console.log(iterator.next());           // { value: 2, done: false }
console.log(iterator.next());           // { value: 'red', done: false }
console.log(iterator.next());           // { value: 'green', done: false }
console.log(iterator.next());           // { value: true, done: false }
console.log(iterator.next());           // { value: undefined, done: true }
```

Generator delegation also lets you make further use of generator return values.
It's the easiest way to access returned values and can be useful when performing complex tasks.
```js
function *createNumberIterator() {
  yield 1;
  yield 2;
  return 4;
}

function *createRepeatingIterator(count) {
  for (let i = 0; i < count; i++) {
    yield 'repeat';
  }
}

function *createCombinedIterator() {
  let result = yield *createNumberIterator();
  yield result;
  yield *createRepeatingIterator(result);
}

let iterator = createCombinedIterator();
console.log(iterator.next());           // { value: 1, done: false }
console.log(iterator.next());           // { value: 2, done: false }
console.log(iterator.next());           // { value: 4, done: false }
console.log(iterator.next());           // { value: 'repeat', done: false }
console.log(iterator.next());           // { value: 'repeat', done: false }
console.log(iterator.next());           // { value: 'repeat', done: false }
console.log(iterator.next());           // { value: 'repeat', done: false }
console.log(iterator.next());           // { value: undefined, done: true }
```

> Note: You can use `yield *` directly on strings (ie. `yield * 'hello'`), and string's default iterator will be used.

#### Asynchronous Task Running
Much of the excitement around generators is related to async programming, especially when you're trying to run a **sequence** of async calls.
Because `yield` stops executiong and wiats for the `next()` method to be called before starting again, you can implement async calls without managing callbacks.

Example of a simple synchronous task runner:
```js
functino run (taskGenerator) {
  let task = taskGenerator();

  // start task
  let result = task.next();

  // recursion to keep calling next()
  function step() {
    if (!result.done) {
      result = task.next(result.value);
      step();
    }
  }

  step();
}
```
Passing `result.value` into `task.next` as an argument, it's possible to pass data between `yield` calls like this:
```js
run(function*() {
  let value = yield 1;
  value = yield value + 3;
});
```

Example of async task runner (just pass a callback Fn into result.value):
```js
let fs = require('fs');

function run(taskGenerator) {
  let task = taskGenerator();
  let result = task.next();

  function step() {
    if (!result.done) {
      if (typeof result.value === 'function') {
        result.value((err, data) => {
          if (err) {
            result = task.throw(err);
            return;
          }

          result = task.next(data);
          step();
        });
      } else {
        result = task.next(result.value);
        step();
      }
    }
  }

  step();
}

const readFile = (filename) => (cb) => { fs.readFile(filename, cb) }
run(function*() {
  let contents = yield readFile('config.json'):
  console.log('Done');
});
```
Above example performs async `readFile()` operation withou making any callbakcs visible in the main code.
Aside from `yield` the code looks the same as synch code.


### Experiments
```js
class Collection {
  constructor(items) {
    this.items = items || [];
  }

  *[Symbol.iterator]() {
    for (let i = 0; i < this.items.length; i++) {
      yield this.items[i];
    }

    // OR
    // yield *this.items.values();
  }

  map(fn) {
    let result = [];

    if (typeof fn === 'function') {
      for (let item of this) {
        result.push(fn(item, this.items.indexOf(item)));
      }
    }

    return result;
  }

  add(item) {
    this.items.push(item);
  }

  remove(item) {
    const idx = this.items.indexOf(item);

    if (idx > -1) {
      this.items.splice(idx, 1);
    }
  }

  removeAt(idx) {
    if (this.items[idx]) {
      this.items.splice(idx, 1);
    }
  }
}

class PaginatedCollection extends Collection {
  constructor(props) {
    super(props);

    this.pagination = {
      pages: 10,
      current: 0,
    }
  }
}

const objects = [{ a: 'a' }, { b: 'b' }, { c: 'c' }];
let p = new PaginatedCollection(objects);
let added = { added: 'added' };
p.add(added);
p.add({ d: 'd' });
p.remove(added);

console.log('-- paginated', p)

let test = p.map((item, idx) => {
  console.log(item, idx);
  if (item.a) {
    return item;
  }
});

console.log('-- test', test)
```
