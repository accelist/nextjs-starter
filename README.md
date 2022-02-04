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

- API Gateway for proxying HTTP requests to back-end web API with Access Token

- Automatic progress bar during page navigation

- Default `SwrFetcher` function based on `axios` included for `swr` library

- Batteries included: `jotai`, Bootstrap 5, `react-bootstrap`, FontAwesome 5

## How to Use?

[Download as Zip File](https://github.com/accelist/nextjs-starter/archive/refs/heads/master.zip)

Unzip the template folder, rename the folder to your project name.

Run `npm install` in the project root folder, then `npm run dev`

The web app should be accessible at http://localhost:3000

## Project Structure

### `pages`
The standard folder from Next.js template to store your page components in here. You can read more in [here](https://nextjs.org/docs/basic-features/pages).

### `_app.tsx`
Located inside `pages` folder. The standard default component from Next.js template. This component is responsible for initializing all pages in your project and behave as the entry point of your front-end app. You can read more in [here](https://nextjs.org/docs/advanced-features/custom-app).

### `functions`
Use this folder to store all reusable functions here.

### `types`
Use this folder to store all your custom TypeScript definitions, such as `interface` or `type` in here.

### `public`
The standard folder from Next.js template for storing all static files like image files. You can read more in [here](https://nextjs.org/docs/basic-features/static-file-serving).

### `.env.development`
Customize your environment variable values in this file. If you need to only modify the existing value of each property in this file, create a `.env.local` file (this will act as a secrets), copy and paste the content of `.env.development`, and modify this file according to your needs.

### `next.config.js`
Customize advanced Next.js configuration in this file. This file will primary serves as environment variables registration into your front-end app. You also can configure your `webpack` configuration here, but tread it with caution since the included configurations are already robust for production usage. You can read more in [here](https://nextjs.org/docs/api-reference/next.config.js/introduction).

### `package.json`
The primary front-end metadata file. All of your installed packages are listed in here, along with the `npm` scripts. The locked dependencies' references will be stored in `package-lock.json` file. 

### `tsconfig.json`
TypeScript compiler configuration file. You can customize your TypeScript compiler options in here.

### `.eslintrc.json`
ESLint configuration file. You can customize your ESLint rules in here.

### `Dockerfile`
The Docker build configuration for the app.

## `Page` Component Type
The `Page` type / interface extends the standard `React.FunctionComponent` interface, with an additional property named `layout`. The `layout` property allows attaching another component by assigning the said component into this property.

By utilizing this feature, you can do conditional layouting on different pages, while still enables the state persistence because the React component tree is maintained between page transitions. The implementation of this feature follows the recommended layouting pattern by Next.js's author in this [document](https://nextjs.org/docs/basic-features/layouts#per-page-layouts).

Below are the example codes for applying a different layout between 2 page component, while we have 2 different layout components, `WithDefaultLayout` (you can see this on `DefaultLayout.tsx` file) and `WithAboutLayout`:

Codes on `index.tsx` file:
```tsx
// pages/index.tsx
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
const About: Page = () => {
    return (<div>
        <h1>About</h1>
    </div>);
}

About.layout = WithAboutLayout;
export default About;
```

## `AppSettings` API

> TODO, explain about how to work with Environment Variables

## Azure AD B2C Configuration

> TODO

## Navbar and Sidebar Customization

> TODO, explain about `NavLink` component API

## Theme Customization

> TODO, explain how to customize `Navbar`, `Sidebar`, and progress bar color

## Step Debugging with Visual Studio Code

> TODO

## `Authorize` Component

> TODO, explain Role-Based Access Control and session callback

## API Gateway

> TODO, explain proxying requests to back-end web API
