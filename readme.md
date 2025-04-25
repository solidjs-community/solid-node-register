# Solid Register

Node loader for compiling JSX/TSX files using Solid's compiler.

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

## Example

See the [tests](./tests) folder for a client/ssr code example\
and [package.json](.package.json) for a test script to run it.
