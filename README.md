# Accelist Next.js Starter

> Next.js project starter template for PT. Accelist Lentera Indonesia

## Features

- Pure Next.js: Zero framework customization

- TypeScript + ESLint configured

- Type-check and lint as you type!

- Visual Studio Code breakpoint and debugging configured

- Responsive dashboard (top and side navigation bar) template

- `Page` Component Type: Supports variable layout

- The Twelve-Factor App principled: Multi-Stage Docker build

- `AppSettings` API: Supports Runtime Environment Variables for Kubernetes deployment

- OAuth to Azure Active Directory B2C configured

- `Authorize` component: Supports Role-Based Access Control (RBAC)

- API Gateway for proxying HTTP requests to back-end web API

- Automatic progress bar during page navigation

- Default `SwrFetcher` function based on `axios` included for `swr` library

- `UseAuthorizedAxios` and `UseAuthorizedSwrFetcher` hooks for acquiring HTTP clients with Authorization Bearer header set

- Enabled container builds on GitLab CI or GitHub CI

- Batteries included: `jotai`, Bootstrap 5, `react-bootstrap`, FontAwesome 5, `sweetalert2`

## Getting Started

[Download The Template as Zip File](https://github.com/accelist/nextjs-starter/archive/refs/heads/master.zip)

Unzip and rename the folder to your actual project name.

Run `npm ci` in the project root folder, then `npm run dev`

The web app should be accessible at http://localhost:3000

To display ESLint errors in Visual Studio Code, install the official ESLint extension: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

## Project Structure

### `components` Folder

Place reusable React components in this folder.

It is recommended to write newer components as [Functional Components](https://reactjs.org/docs/components-and-props.html) (with [Hooks](https://reactjs.org/docs/hooks-intro.html)) instead of Class Components for simplicity.

### `css` Folder

Place plain `.css` files in this folder.

If there are [reusable JS style objects](https://reactjs.org/docs/dom-elements.html#style) (CSS-in-JS), it is recommended to place them in `components` folder instead.

### `functions` Folder

Place reusable plain JS functions in this folder.

### `pages` Folder

In Next.js, a page is a default-exported React Component from a `.js`, `.jsx`, `.ts`, or `.tsx` file in the `pages` directory. Each page is associated with a route based on its file name.

> **Example:** If `pages/about.tsx` is created, it will be accessible at `/about`.

Next.js supports pages with dynamic routes. For example, if a file is called `pages/posts/[id].tsx`, then it will be accessible at `posts/1`, `posts/2`, etc.

> Read more about pages: https://nextjs.org/docs/basic-features/pages

> Read more about dynamic routes: https://nextjs.org/docs/routing/dynamic-routes

### `pages/_app.tsx` File

Next.js uses the `App` component to initialize pages which can be overridden to allow:

- Persisting layout between page changes

- Keeping state when navigating pages

- [Custom error handling using `componentDidCatch`](https://reactjs.org/docs/error-boundaries.html)

- Inject additional data into pages

- [Add global CSS](https://nextjs.org/docs/basic-features/built-in-css-support#adding-a-global-stylesheet)

This template ships with `_app.tsx` file which implements some of the above mentioned behaviors, including additional features:

- Progress bar on navigation

- [MSAL.js integration](https://docs.microsoft.com/en-us/azure/active-directory/develop/tutorial-v2-react)

- Opting-out from [Automatic Static Optimization](https://nextjs.org/docs/advanced-features/automatic-static-optimization) to allow the use of [Runtime Environment Variables](https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration) in container-based deployments

> Read more about custom `App`: https://nextjs.org/docs/advanced-features/custom-app

### `public` Folder

Next.js can serve static files, like images, under a folder called `public` in the root directory. Files inside `public` can then be referenced by your code starting from the base URL (`/`).

> Read more about static files: https://nextjs.org/docs/basic-features/static-file-serving

### `types` Folder

Place type declarations in this folder. For example: `interface` or `type` or [`.d.ts`](https://www.typescriptlang.org/docs/handbook/declaration-files/by-example.html) files.

### `.eslintrc.json` File

ESLint configuration file for TypeScript and Next.js (`next/core-web-vitals` including `react` and `react-hooks` ESLint plugins).

> Read more about ESLint configuration: https://eslint.org/docs/user-guide/configuring/

| Rules         | Documentation                                                     |
| ------------- | ----------------------------------------------------------------- |
| TypeScript    | https://www.npmjs.com/package/@typescript-eslint/eslint-plugin    |
| React         | https://www.npmjs.com/package/eslint-plugin-react                 |
| React Hooks   | https://www.npmjs.com/package/eslint-plugin-react-hooks           |
| Next.js       | https://nextjs.org/docs/basic-features/eslint#eslint-plugin       |

### `package.json` & `package.lock.json` Files

The `package.json` file is a manifest for the project. It is where `npm` store the names and versions for all the installed packages. The `package.json` shipped with the template describes the following (but not limited to) metadata:

- `private` if set to `true` prevents the app to be accidentally published on `npm`

- `scripts` defines a set of scripts runnable via [`npm run`](https://docs.npmjs.com/cli/v8/commands/npm-run-script)

- `dependencies` sets a list of npm packages installed as runtime dependencies

- `devDependencies` sets a list of npm packages installed as development dependencies, which are not installed in Production environments.

> Read more about `package.json`: https://docs.npmjs.com/cli/v8/configuring-npm/package-json https://nodejs.dev/learn/the-package-json-guide

`package-lock.json` is automatically generated for any operations where npm modifies either the `node_modules` tree, or `package.json`. It describes the exact tree that was generated, such that subsequent installs are able to generate identical trees, regardless of intermediate dependency updates. This file is intended to be committed into source repositories.

> Read more about `package.lock.json`: https://docs.npmjs.com/cli/v8/configuring-npm/package-lock-json https://nodejs.dev/learn/the-package-lock-json-file

**Restoring packages should be done using `npm ci` NOT `npm install` command to prevent accidentally modifying the `package.json` and `package.lock.json`**

### `tsconfig.json` File

The presence of a `tsconfig.json` file in a directory indicates that the directory is the root of a TypeScript project. The `tsconfig.json` file specifies the root files and the compiler options required to compile the project.

The `tsconfig.json` shipped with the template has been fine-tuned for strict Next.js project type-checking.

> List of all supported TypeScript compiler options: https://www.typescriptlang.org/tsconfig https://www.typescriptlang.org/docs/handbook/compiler-options.html

### `next.config.js` File

For custom advanced configuration of Next.js (such as webpack), `next.config.js` in the root of the project directory (next to package.json) can be modified.

`next.config.js` is a regular Node.js module and gets used by the Next.js server and build phases. It is not included in the browser build.

> Read more: https://nextjs.org/docs/api-reference/next.config.js/introduction

> Read more about custom webpack configuration: https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config

## Building and Running as Container

This template ships with `Dockerfile` and `.dockerignore` for building the app as a standard container image. To proceed, please [install Docker](https://docs.docker.com/get-docker/) or any OCI container CLI such as [`podman`](https://podman.io/) in your machine. (The examples given will use Docker)

To build the container image, use this command:

```sh
docker build -t app-name .
```

> Run this command on the same directory level as `Dockerfile` file. 

> Note that all `.env` and `.env.*` files are listed as ignored files in `.dockerignore` to prevent unwanted Environment Variables leaking to Production environment.

When running container locally, it is recommended to create a dedicated network for containers inside to connect to each other: 

```sh
docker network create network-name
```

```sh
docker run \
-e WEBSITE_NAME="Accelist Next.js Starter" \
-e AZURE_AD_B2C_TENANT_NAME=accelistadb2c \
-e AZURE_AD_B2C_CLIENT_ID=8234d7c5-e1ce-4dc5-a4b8-f8c85b73f759 \
-e AZURE_AD_B2C_PRIMARY_USER_FLOW=B2C_1_AccelistNextjsStarter \
-e BACKEND_HOST=http://localhost:5000 \
-p 80:80 \
--network network-name \
--restart always \
--name instance-name \
-d app-name
```

## `AppSettings` API

[Next.js allows using `process.env` to read Environment Variables](https://nextjs.org/docs/basic-features/environment-variables), but it is not suitable for container-based deployment because the Environment Variables are burned during build-time (non-changeable).

This technique does not adhere to [The Twelve-Factor App](https://12factor.net/build-release-run) methodology: a release is defined as a combination of a build (i.e. Container) + a config (i.e. Environment Variables).

![Build, Release, Run](https://raw.githubusercontent.com/accelist/nextjs-starter/master/public/release.png)

For this reason, [Runtime Configuration](https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration) is recommended to be used instead.

This project template ships [`AppSettings`](https://github.com/accelist/nextjs-starter/blob/master/functions/AppSettings.ts) API as a high-level abstraction of the runtime Environment Variables:

```
Environment Variables --> next.config.js --> AppSettings
``` 

### Environment Variables

The values of Environment Variables are sourced differently depending on how the app is being run:

* Development environment using `npm run dev`: values will be obtained from `.env` files such as `.env.development` or `.env.local`

> Read more about Environment Variables Load Order: https://nextjs.org/docs/basic-features/environment-variables#environment-variable-load-order

* Production environment using container (build with `Dockerfile` and `.dockerignore` in this template): values will be obtained from Machine Environment Variables supplied via `-e` or `--env` flag.

> Read more about Environment Variables in Docker: https://docs.docker.com/engine/reference/commandline/run/#set-environment-variables--e---env---env-file

### Add Environment Variables to `next.config.js`

To register Environment Variables into the app, open `next.config.js` and add the `publicRuntimeConfig` or `serverRuntimeConfig` configs:

- `serverRuntimeConfig`: Will only be available on the server side. (in `getServerSideProps` or `getInitialProps` or in API routes)

- `publicRuntimeConfig`: Will be available on both server-side and client-side (in browser). **ONLY PUT PUBLIC SETTING VALUES IN HERE, DO NOT PUT ANY SENSITIVE VALUES IN HERE!!**

For example:

```ts
{
    publicRuntimeConfig: {
        websiteName: process.env['WEBSITE_NAME']
    }
}
```

### Add Environment Variables to `AppSettings`

To enable TypeScript intellisense working against the registered Environment Variable, the interface `RuntimeAppSettings` in the file `functions/AppSettings.ts` can be modified:

```ts
export interface RuntimeAppSettings {
    websiteName: string;
}
```

> Environment Variables have `string` data type

### Using `AppSettings`

Import the `AppSettings` object to read registered Environment Variables. For example:

```tsx
import { AppSettings } from '../functions/AppSettings';

const MyPage: Page = () => {
    return (
        <div>
            <h1>{AppSettings.current.websiteName}</h1>
        </div>
    );
}
```

## `Page` & Layout

The `Page` interface shipped with this project template extends the standard `React.FunctionComponent` interface, with an additional static property named `layout`. The `layout` property allows attaching a render function which returns the layout for a specific page.

The below example illustrates how to develop a layout function and attach it to a page:

```tsx
// components/MyLayout.tsx

import React from "react";

const MyLayout: React.FC = ({ children }) => {
    return (
        <React.Fragment>
            <main className="container py-4">
                {children}
            </main>
        </React.Fragment>
    );
}

// This layout pattern enables state persistence because the React component tree is maintained between page transitions.
// With the component tree, React can understand which elements have changed to preserve state.
export const WithMyLayout = (page: React.ReactElement) => <MyLayout>{page}</MyLayout>;
```

```tsx
// pages/MyPage.tsx

import { Page } from '../types/Page';
import { WithMyLayout } from '../components/MyLayout';

const MyPage: Page = () => {
    return (
        <div>
            <h1>Hello World!</h1>
        </div>
    );
}

MyPage.layout = WithMyLayout;
export default MyPage;
```

> Read more about Per-Page Layouts: https://nextjs.org/docs/basic-features/layouts#per-page-layouts

## Default SWR Fetcher

```tsx
import React from 'react';
import useSWR from 'swr';
import { DefaultSwrFetcher } from "../../functions/DefaultSwrFetcher";
import { WithDefaultLayout } from '../../components/DefautLayout';
import { Page } from '../../types/Page';

const Test: React.FC = () => {
    const { data, error } = useSWR('/api/demo/api/Values', DefaultSwrFetcher);

    return (
        <div>
            <p>Test Page</p>
            <p>
                {JSON.stringify(data)}
            </p>
            <p>
                {error?.toString()}
            </p>
        </div>
    );
}
```

## API Gateway

For security reasons, browsers restrict cross-origin HTTP requests initiated from scripts. For example, `XMLHttpRequest` and the `Fetch API` follow the `same-origin policy`. An example of a cross-origin request: the front-end JavaScript code served from `https://domain-a.com` uses `XMLHttpRequest` to make a request for `https://domain-b.com/data.json`.

Use `http-proxy` to bypass CORS policy setup in back-end application.

```tsx
// /pages/api/demo/[...apiGateway].ts
import Proxy from 'http-proxy';
import type { NextApiRequest, NextApiResponse } from 'next';
import { AppSettings } from '../../../functions/AppSettings';

// Great way to avoid using CORS and making API calls from HTTPS pages to back-end HTTP servers
// Recommendation for projects in Kubernetes cluster: set target to Service DNS name instead of public DNS name
const server = Proxy.createProxyServer({
    target: AppSettings.current.backendHost,
    changeOrigin: true,
    xfwd: true,
    // https://github.com/http-party/node-http-proxy#proxying-websockets
    ws: false,
});

server.on('proxyReq', (proxyReq, req) => {
    // Proxy requests from /api/demo/... to http://my-web-api.com/...
    const urlRewrite = req.url?.replace(new RegExp('^/api/demo'), '');
    if (urlRewrite) {
        proxyReq.path = urlRewrite;
    } else {
        proxyReq.path = '/';
    }
    // console.log('Proxying:', req.url, '-->', AppSettings.current.backendHost + urlRewrite);
});

const apiGateway = async (req: NextApiRequest, res: NextApiResponse) => {
    server.web(req, res, {}, (err) => {
        if (err instanceof Error) {
            throw err;
        }

        throw new Error(`Failed to proxy request: '${req.url}'`);
    });
}

export default apiGateway;

export const config = {
    api: {
        externalResolver: true,
        bodyParser: false
    },
}
```

With this configuration, every back-end API route, need to be prepended with `api/demo`. For example this code:

```tsx
const { data, error } = useSWR('/api/demo/api/Values', swrFetcher);
```

the client will fetch data from `api/Values` route in the back-end application.

## Azure AD B2C Configuration

> TODO, explain step by step how to create Azure AD B2C tenant, web app, web API, scope / API permission, and environment variables setting

## `Authorize` Component

`Authorize` component will validate access to the component. Access will be granted if the mapped role for the user match at least one role passed on `Authorize` component.

## Using Access Token for Web API

Use `useAuthorizedAxios` and `useAuthorizedSwrFetcher` when need to fetch or post data with access token. Only use them inside `Authorize` component, because the access token passed from the context on `Authorize` component.

> TODO, explain `useAuthorizedAxios` and `useAuthorizedSwrFetcher` hooks

## Navbar and Sidebar Customization

`Navbar` and `Sidebar` use `NavLink` component to display each navigation. `NavLink` use `Link` component from `next/link` for navigation between pages routes.

```tsx
...
    return (
        <div className={sideBarClass()} >
            <ul className="nav nav-pills d-flex flex-column p-3">
                <li className="nav-item">
                    <NavLink style={textWhite} href='/'>
                        <FontAwesomeIcon fixedWidth icon={faHome} className='me-2'></FontAwesomeIcon>
                        Home
                    </NavLink>
                </li>
...
```

`NavLink` has 3 props `href`, `style`, and `children`.

`href` is the destination route for the navigation.

`style` is additional styling for the navigation label.

`children` is what will be displayed as the navigation label that written between the `NavLink` tag.

## Theme Customization

To customize theme on DefaultLayout, change values on `/css/default-layout.css`. For example:

```css
/*
    Sidebar NavLink background color.
*/
.sidebar .nav-link.active {
    background-color: rgba(255, 255, 255, 0.25);
}

.sidebar .nav-link:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

/*  
    Color of progress bar.
*/
#nprogress .bar {
    background: limegreen !important;
}
```

## Step Debugging with Visual Studio Code

Create a file named .vscode/launch.json at the root of your project with the following content:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev"
    },
    {
      "name": "Next.js: debug client-side",
      "type": "pwa-chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    },
    {
      "name": "Next.js: debug full stack",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev",
      "console": "integratedTerminal",
      "serverReadyAction": {
        "pattern": "started server on .+, url: (https?://.+)",
        "uriFormat": "%s",
        "action": "debugWithChrome"
      }
    }
  ]
}
```

Press F5 to start debugging.

## GitHub CI Integration

This project template ships with GitHub Action workflow for Docker Images enabled. Example: https://github.com/accelist/nextjs-starter/actions

When a commit is pushed or a merge request is performed against the `master` or `main` branch, a container image will be build. If a commit is pushed, then the container image will also be pushed into the GitHub Container Registry of the project as `master` or `main` tag.

Upon tagging a commit (if using GitHub web, go to [Releases](https://github.com/accelist/nextjs-starter/releases) page then [draft a new release](https://github.com/accelist/nextjs-starter/releases/new)) with version number string such as `v1.0.0` (notice the mandatory `v` prefix), a new container image will be build and tagged as the version number (in this example, resulting in `1.0.0` image tag, notice the lack of `v` prefix) and `latest`.

The container images are available via the project [GitHub Container Registry](https://github.com/accelist/nextjs-starter/pkgs/container/nextjs-starter). For example: 

```sh
docker pull ghcr.io/accelist/nextjs-starter:master
```

If working with private repository (hence private container registry), [create a new GitHub personal access token](https://github.com/settings/tokens) with `read:packages` scope to allow downloading container images from Kubernetes cluster.

> Read more: https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry

## GitLab CI Integration

This project template ships with GitLab CI pipeline for container builds enabled. Example: https://gitlab.com/ryanelian/nextjs-starter/-/pipelines

When a commit is pushed or a merge request is performed against the `master` or `main` branch, a container image will be build. If a commit is pushed, then the container image will also be pushed into the GitLab Container Registry of the project as `master` or `main` tag.

Upon tagging a commit (if using GitLab web, go to [Tags](https://gitlab.com/ryanelian/nextjs-starter/-/tags) page then [create a new tag](https://gitlab.com/ryanelian/nextjs-starter/-/tags/new)) with version number string such as `1.0.0`, a new container image will be build and tagged as the version number (in this example, resulting in identical `1.0.0` image tag) and `latest`.

The container images are available via the project [GitLab Container Registry](https://gitlab.com/ryanelian/nextjs-starter/container_registry). For example: 

```sh
docker pull registry.gitlab.com/ryanelian/nextjs-starter:master
```

If working with private repository (hence private container registry), [create a new GitLab personal access token](https://gitlab.com/-/profile/personal_access_tokens) with `read_registry` scope to allow downloading container images from Kubernetes cluster.

> Read more: https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html

## Deploying Container to Kubernetes

> TODO add guide for adding GitHub / GitLab personal access token to Kubernetes for pulling from private registry: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/

> TODO add Deployment and Services `yaml` here with Environment Variables

## Git Pre-Commit Compile Check

Upon launching development server via `npm run dev`, git pre-commit hook will be installed into the local repository.

This hook will perform TypeScript and ESLint checks when a developer attempts to commit into the git repository and fail the commit if any errors are detected.
