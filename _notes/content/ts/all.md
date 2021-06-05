## TypeScript

### Index Signature
The `[key: T]: U` is called an __index signature__, and is the way you tell TS that an object might contain more keys.

```ts
let a: {
  b: number
  c?: string
  [key: string]: boolean
}
```

### Function overloading
```ts
type SomeFunction = {
  (from: Date, destination: string): Reservation
  (from: Date, to: Date, destination: string): Reservation
}

let reserve: SomeFunction = (
  from: Date,
  toOrDestination: Date | string,
  destination?: string
) => { ... }

type CreateElement = {
  (tag: 'a'): HTMLAnchorElement
  (tag: 'canvas'): HTMLCanvasElement
  (tag: 'table'): HTMLTableElement
  (tag: string): HTMLElement
}

let createElement: CreateElement = (tag: string): HTMLElement => { ... }
```
