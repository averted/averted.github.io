## Polymorphism (Generics)

### Intro
```ts
type Filter = {
  <T>(array: T[], fn: (item: T) => boolean): T[]
}

let filter: Filter = (arr, f) => { ... }

// T is bound to number
filter([1,2,3], (item) => item > 2)
```

The place where you declare a generic type dictates when TS will bind a concrete type to your generic.
Because we declared <T> as part of call signature, TS will bind a concrete type to T when we actually call `filter`.

If instead we'd scoped <T> to the type alias `Filter`, TS would have required us to bind a type explicitly when we use `Filter`:

```ts
type Filter<T> = {
  (array: T[], fn: (item: T) => boolean): T[]
}

let filter: Filter = (arr, fn) => { ... } // Error: Generic type Filter requires 1 type argument
let another: Filter<number> = (arr, fn) => { ... }
```

You can add a generic for each way of declaring a call signature:

```ts
type Filter = {
  <T>(array: T[], fn: (item: T) => boolean): T[]
}
let filter: Filter = // ...

type Filter<T> = {
  (array: T[], fn: (item: T) => boolean): T[]
}
let filter: Filter<number> = // ...

type Filter = <T>(array: T[], fn: (item: T) => boolean): T[]
let filter: Filter = // ...

type Filter<T> = (array: T[], fn: (item: T) => boolean): T[]
let filter: Filter<number> = // ...

function filter<T>(arr: T[], fn: (item: T) => boolean): T[] {
  // ...
}
filter([1,2,3], x => Boolean(x)) // contextual typing
filter<number>([1,2,3], x => Boolean(x)) // explicit typing
```

Map example:
```ts
function map<T, U>(arr: T[], fn: (item: T) => U): U[] {
  let result = []

  for (let i = 0; i < arr.length; i++) {
    result[i] = fn(arr[i])
  }

  return result
}
```

### Generic Type Aliases
```ts
type MyEvent<T> = {
  target: T
  type: string
}
```

You can use a generic type alias in a function's signature. When TS binds a type to T, it'll also bind it to `MyEvent` for you:
```ts
function triggerEvent<T>(event: MyEvent<T>): void { ... }

function triggerEvent({
  target: document.querySelector('#button'),
  type: 'mouseover'
})
```

### Bounded Polymorphism
