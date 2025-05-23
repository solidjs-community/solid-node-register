<p>
  <img width="100%" src="https://assets.solidjs.com/banner?type=Community&background=tiles&project=node-register" alt="Solid Node Register">
</p>

# Solid Node Register

[![version](https://img.shields.io/npm/v/solid-node-register?style=for-the-badge)](https://www.npmjs.com/package/solid-node-register)

Node loader for compiling JSX/TSX files using Solid's compiler. Uses [Node's Module Customization Hooks](https://nodejs.org/api/module.html#customization-hooks) to register the loader for `.jsx` and `.tsx` files.

Requires Node `>=20.6.0`.

## Usage

Install the loader

```bash
npm i solid-node-register # or pnpm, yarn, etc.
```

Run jsx/tsx files in SSR mode

```bash
node --import solid-node-register ./index.tsx
```

Run jsx/tsx files in client mode.\
Requires a `"browser"` condition to import the browser solid runtime.\
Also requires the DOM API to be mocked with `jsdom` or similar.

```bash
node -C browser --import solid-node-register ./index.tsx
```

## TypeScript

This loader only handles the compilation of `.jsx`/`.tsx` files.\
For `.ts` files you can use [`--experimental-strip-types`](https://nodejs.org/docs/v22.15.0/api/typescript.html#type-stripping), [`tsx`](https://github.com/privatenumber/tsx) or [`ts-node`](https://www.npmjs.com/package/ts-node).

## Example

See the [tests](./tests) folder for a client/ssr code example\
and [package.json](.package.json) for a test script to run it.
