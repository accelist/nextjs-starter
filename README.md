# Accelist Next.js Starter

> Next.js project starter template for PT. Accelist Lentera Indonesia

## Features

- Pure Next.js: Zero framework customization

- TypeScript + ESLint configured

- Check-as-You-Type development experience (just like instapack!)

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

- Batteries included: `jotai`, Bootstrap 5, `react-bootstrap`, FontAwesome 5, `sweetalert2`

## How to Use?

[Download The Template as Zip File](https://github.com/accelist/nextjs-starter/archive/refs/heads/master.zip)

Unzip and rename the folder to your actual project name.

Run `npm ci` in the project root folder, then `npm run dev`

The web app should be accessible at http://localhost:3000

## Project Structure

### `components` folder
Use this folder to store all reusable functions across the project here.

### `css` folder
Use this folder to store all CSS or styling definition files here.

### `functions` folder
Use this folder to store all reusable functions across the project here.

### `pages` folder
The standard folder from Next.js template to store your page components in here. You can read more in [here](https://nextjs.org/docs/basic-features/pages).

### `public` folder
The standard folder from Next.js template for storing all static files like image files. You can read more in [here](https://nextjs.org/docs/basic-features/static-file-serving).

### `types` folder
Use this folder to store all your custom TypeScript definitions, such as `interface` or `type` in here.

### `.eslintrc.json` file
ESLint configuration file. You can customize your ESLint rules in here.

### `package.json` & `package.lock.json` file
`package.json` is the primary front-end metadata file. All of your installed packages are listed in here, along with the `npm` scripts. The locked dependencies' references will be stored in `package-lock.json` file. If you want to to use other package such as [Yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/), ensure you have deleted the `package-lock.json` and use the dedicated lock file based on the package manager you'll be using.

### `tsconfig.json`
TypeScript compiler configuration file. You can customize your TypeScript compiler options in here.

### `_app.tsx` file
Located inside `pages` folder. The standard default component from Next.js template. This component is responsible for initializing all pages in your project and behave as the entry point of your front-end app. You can read more in [here](https://nextjs.org/docs/advanced-features/custom-app).

## Building and Running as Container

You can build the Docker image, including the necessary environment variables of this app by running this following command:

`docker run -p 80:80 -e WEBSITE_NAME="Accelist Next.js Starter" -e AZURE_AD_B2C_TENANT_NAME=accelistadb2c -e AZURE_AD_B2C_CLIENT_ID=8234d7c5-e1ce-4dc5-a4b8-f8c85b73f759 -e AZURE_AD_B2C_PRIMARY_USER_FLOW=B2C_1_AccelistNextjsStarter -e BACKEND_HOST=http://localhost:5000 -d --name next-starter next-starter`

> The above environment variable values can be changed to suits your needs.

Below are the necessary files to build the Docker image of this app:
### `Dockerfile`
The Docker build configuration for the app.

### `.dockerignore`
Store the list of folders and files to be ignored when building the Docker image for this app.

## Deploying Container to Kubernetes

> TODO add Deployment and Services `yaml` here with environment variables

## `AppSettings` API

Before using the the `AppSettings` API on this template, we must understand how configuration flow works:
```
Environment Variables -> `next.config.js` -> `AppSettings` -> Client Codes
``` 

Below are the explanation for each component of the flow:
### Environment Variables
The environment variable values are obtained depends on where do you run the app:
* Development: values will be obtained from `.env.development` file. If you have created the `.env.local` file locally, Next.js will use this file instead
* Production: values will be obtained from the system environment variables
You can read more in [here](https://nextjs.org/docs/basic-features/environment-variables).

### `next.config.js`
This file will primary serves as environment variables registration into your front-end app. There are 2 different settings that you must be aware of:
* `serverRuntimeConfig`: The setting values will be hidden from browser (client-side), and only accessible from the back-end side of Next.js server. Register all private values (secrets) on this object
* `publicRuntimeConfig`: The setting values will be exposed into browser and the back-end side of Next.js server. **ONLY PUT PUBLIC SETTING VALUES IN HERE, DO NOT PUT ANY SENSITIVE VALUES IN HERE!**

To register an environment variable, declare the value on either of `serverRuntimeConfig` or `publicRuntimeConfig`, for example, to register the `WEBSITE_NAME` environment variable value:
```js
publicRuntimeConfig: {
    websiteName: process.env['WEBSITE_NAME']
}
```
> The property name can be whatever you want to name it, but must have a corresponding property name as the one you define in `RuntimeAppSettings` definition in `AppSettings.ts` file.

You also can configure your `webpack` configuration here, but tread it with caution since the included configurations are already robust for production usage. You can read more in [here](https://nextjs.org/docs/api-reference/next.config.js/introduction).

### `AppSettings`
The application settings object which return the registered environment variables that has been configured in `next.config.js` upon accessing its `current` property. All client codes must access this object to access the environment variables.

**You must define all properties on `RuntimeAppsettings` with the same properties' name that you have registered on `next.config.js`**. All mismatching properties will not be binded.

### Client Codes
All client codes must import the `AppSettings` object to access any registered environment variables. Codes example on `index.tsx` page:
```tsx
// pages/index.tsx
// Other imports are removed for abbreviation.
import { AppSettings } from '../functions/AppSettings';

const Index: Page = () => {
    return (<div>
        <h1>Website Name: {AppSettings.current.websiteName}</h1>
    </div>);
}

Index.layout = WithDefaultLayout;
export default Index;
```

## `Page` Component Type
The `Page` type / interface extends the standard `React.FunctionComponent` interface, with an additional property named `layout`. The `layout` property allows attaching another component by assigning the said component into this property.

By utilizing this feature, you can do conditional layouting on different pages, while still enables the state persistence because the React component tree is maintained between page transitions. The implementation of this feature follows the recommended layouting pattern by Next.js's author in this [document](https://nextjs.org/docs/basic-features/layouts#per-page-layouts).

Below are the example codes for applying a different layout between 2 page component, while we have 2 different layout components, `WithDefaultLayout` (you can see this on `DefaultLayout.tsx` file) and `WithAboutLayout`:

Codes on `index.tsx` file:
```tsx
// pages/index.tsx

import { Page } from '../types/Page';

const Index: Page = () => {
    return (<div>
        <h1>Index</h1>
    </div>);
}

Index.layout = WithDefaultLayout;
export default Index;
```

Codes on `about.tsx` file:
```tsx
// pages/about.tsx

import { Page } from '../types/Page';

const About: Page = () => {
    return (<div>
        <h1>About</h1>
    </div>);
}

About.layout = WithAboutLayout;
export default About;
```

## Azure AD B2C Configuration

> TODO, explain step by step how to create Azure AD B2C tenant, web app, web API, scope / API permission, and environment variables setting

## `Authorize` Component

> TODO, explain Role-Based Access Control

## Default SWR Fetcher

> TODO, add simple SWR call example using `DefaultSwrFetcher` here

## Using Access Token for Web API

> TODO, explain `useAuthorizedAxios` and `useAuthorizedSwrFetcher` hooks

## API Gateway

> TODO, explain proxying requests to back-end web API

## Navbar and Sidebar Customization

> TODO, explain about `NavLink` component API

## Theme Customization

> TODO, explain how to customize `Navbar`, `Sidebar`, and progress bar color

## Step Debugging with Visual Studio Code

> TODO
