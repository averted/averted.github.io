## Dynamic Imports

### The import() expression
The `import(module)` expression loads the module and returns a promise that resolves into a module object that contains all its exports. It can be called from any place in the code.

We can use it dynamically in any place of the code, for instance:

```js
let modulePath = prompt("Which module to load?");

import(modulePath)
  .then(obj => <module object>)
  .catch(err => <loading error, e.g. if no such module>)
```

Or, we could use `let module = await import(modulePath)` if inside an async function.

For instance, if we have the following module `say.js`:

```js
// 📁 say.js
export function hi() {
  alert(`Hello`);
}

export function bye() {
  alert(`Bye`);
}
```

…Then dynamic import can be like this:

```js
let {hi, bye} = await import('./say.js');

hi();
bye();
```

Or, if `say.js` has the default export:

```js
let obj = await import('./say.js');
let say = obj.default;
// or, in one line: let {default: say} = await import('./say.js');

say();
```

#### Notes
- Dynamic imports work in regular scripts, they don’t require `script type="module"`.
- Although `import()` looks like a function call, it’s a special syntax that just happens to use parentheses (similar to `super()`). So we can’t copy `import` to a variable or use `call/apply` with it. It’s not a function.
