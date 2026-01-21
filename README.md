# OpenCloud Markdown Editor

A WYSIWYG Markdown editor for [OpenCloud](https://opencloud.eu/) using the [Tiptap](https://tiptap.dev/) library. It replaces the default editor for Markdown files (previously the Text Editor, which remains accessible via the "Open with…" menu).

![preview dark](./images/preview-dark.png)

![preview ligh](./images/preview-light.png)

## Setup

Install dependencies using [pnpm](https://pnpm.io/):

```bash
pnpm install
```

## Building & Running with Docker

### Create Docker Stack

Set up the Docker environment stack:

```bash
pnpm env:create
```

### Build and Serve via Docker

Build the application and run it in a Docker container:

```bash
pnpm build:s
```

Once the container is running, access the application at:

**URL:** https://localhost:9200

You can run `pnpm build:s` again to rebuild and restart the container with your latest changes.

**Credentials:**

- Username: `admin`
- Password: `admin`

## Additional Scripts

- `pnpm build` — Production build
- `pnpm run check:types` — Type check with vue-tsc
- `pnpm run lint` — Lint code
- `pnpm run format:write` — Format code
- `pnpm run test:unit` — Run unit tests with vitest
