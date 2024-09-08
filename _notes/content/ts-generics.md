+++
title = "TS Generics"
date = 2018-07-17

[taxonomies]
tags = ["ts"]
+++

### Polymorphism (Generics)

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

<!--more-->

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
"Type U should be *at least T*" - putting an *upper bound* on U.o

```ts
type TreeNode = {
  value: string
}

type LeafNode = TreeNode & {
  isLeaf: true
}

type InnerNode = TreeNode & {
  children: [TreeNode] | [TreeNode, TreeNode]
}
```

Now let's write a `map` function that maps over node's value.
```ts
function mapNode<T extends TreeNode>(
  node: T,
  fn: (value: string) => string
): T {
  return {
    ...node,
    value: fn(node, value)
  }
}
```

`mapNode` now returns a value of type T, which might be a TreeNode or any subtype of TreeNode. If we would've left off T entirely, return type would always be just TreeNode (no subtypes).

Example with multiple constraints:
```ts
type HasSides = { numberOfSides: number }
type SidesHaveLength = { sideLength: number }

function getPerimeter<
  Shape extends HasSides & SidesHaveLength
>(s: Shape): Shape {
  return s
}
```

### Generic Type Defaults
```ts
type MyEvent<T> = {
  target: T,
  type: string
}
```

can be rewritten as:
```ts
type MyEvent<T = HTMLElement> = {
  target: T,
  type: string
}
```

and given an upper bound as:
```ts
type MyEvent<T extends HTMLElement = HTMLElement> = {
  target: T,
  type: string
}

let myEvent: MyEvent = {
  target: exampleNode,
  type: string
}
```
