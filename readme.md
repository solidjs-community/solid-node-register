# Solid Register

Node loader for compiling JSX/TSX files using Solid's compiler. Uses [Node's Module Customization Hooks](https://nodejs.org/api/module.html#customization-hooks) to register the loader for `.jsx` and `.tsx` files.

Requires Node `>=20.6.0`.

## Usage

Install the loader

```bash
npm i solid-register # or pnpm, yarn, etc.
```

Run jsx/tsx files in SSR mode

```bash
node --import=solid-register ./index.tsx
```

Run jsx/tsx files in client mode.\
Requires a browser condition to import the browser solid runtime.\
Also requires for the DOM api to be mocked with `jsdom` or similar.

```bash
node --conditions=browser --import=solid-register/client ./index.tsx
```

## TypeScript

This loader only handles the compilation of `.jsx`/`.tsx` files.\
For `.ts` files you can use [`--experimental-strip-types`](https://nodejs.org/docs/v22.15.0/api/typescript.html#type-stripping), [`tsx`](https://github.com/privatenumber/tsx) or [`ts-node`](https://www.npmjs.com/package/ts-node).

## Example

See the [tests](./tests) folder for a client/ssr code example\
and [package.json](.package.json) for a test script to run it.
