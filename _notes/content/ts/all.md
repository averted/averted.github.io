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
