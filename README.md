# OneRouter Core

Unified imports from React Router to support universal, single-codebase React Native/Expo apps. Currently supports Android, iOS, web, and Electron (Linux, MacOS, Windows).

## Install (including peerDependencies)

`npm i` or `yarn add` `@onerouter/core react-router react-router-dom react-router-native @expo/html-elements`

## Aliases

The following are aliases to their corresponding react-router-dom and react-router-native components/methods/hooks:

### `<Link />`

In web and Electron, imports `Link` from `react-router-dom`.

In native apps, import's `Link` from `react-router-native`.

### `<Router />`

In web, imports `react-router-dom`'s `BrowserRouter`.

In native apps, exports `react-router-native`'s `MemoryRouter` (which is just re-exported from `react-router`).

In Electron apps (which can't support `BrowserRouter`), exports `react-router-dom`'s `MemoryRouter` (which is just re-exported from `react-router`).

### `createRouter`

#### (enables data routers for all supported platforms - officially only documented for `react-router-dom`)

In web, imports `react-router-dom`'s `createBrowserRouter`.

In native apps, imports `react-router-native`'s `createMemoryRouter` (which is just re-exported from `react-router`).

In Electron apps (which can't support `createBrowserRouter`), imports `react-router-dom`'s `createMemoryRouter` (which is just re-exported from `react-router`).

### useLinkHandler

In web and Electron apps, imports `react-router-dom`'s `useLinkClickHandler`.

In native apps, imports `react-router-native`'s `useLinkPressHandler`.

## Custom

### `<Link />` Component

Currently exports `Link` from `react-router-dom` for web and Electron, and from `react-router-native` for native apps.

TODO: Create custom Link component which uses HTML `<a />` elements in web and Electron, and React Native's `<Pressable />` in iOS/Android.  

## Other Exports

All other components, methods, hooks, and types are re-exported from `react-router-dom` for web and Electron, and `react-router-native` for Android/iOS.
