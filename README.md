# Untitled Musical App

> ...

## Development

The **Untitled Musical App** is a React application built using [Parcel](https://parceljs.org/).

To start, clone the repository and run:

```sh
npm start
```

This will install dependencies, copy the `pre-commit` hook and spin up a development server.

### Conformance

We use ESLint, Prettier and TypeScript to maintain code quality. Run:

```sh
npm run format -- --write
npm run lint -- --fix
```

To fix most issues automatically, and:

```sh
npm run typecheck
```

To check types.

### Deployment

Build the production bundle by running:

```sh
npm run build
```

Serve the `dist` directory.

## License

Apache-2.0 © Arthur, Matheus and collaborators.
