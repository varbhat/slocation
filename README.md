<h1 align="center">slocation</h1> 
<p align="center">Reactive Svelte Location Store</p>

## Introduction

`slocation` is [Reactive](https://svelte.dev/tutorial/reactive-assignments) Svelte Location [Store](https://svelte.dev/docs#svelte_store) . [location](https://developer.mozilla.org/en-US/docs/Web/API/Window/location) which is used to access information about current [Location](https://developer.mozilla.org/en-US/docs/Web/API/Location) is not Reactive . `slocation` wraps [location](https://developer.mozilla.org/en-US/docs/Web/API/Window/location) as [Readable](https://svelte.dev/docs#readable) [Svelte](https://svelte.dev/) Store which gets updated every time [location](https://developer.mozilla.org/en-US/docs/Web/API/Window/location) changes thus making it Reactive.

It also provides extra methods to update URL without reloading the page . With reactive location Object and methods to route without reloading the page , `slocation` can be viable minimal alternative to Router. It is also a very [small](src/slocation.ts) library.

## Features

- Small in Size
- Reactive [location](https://developer.mozilla.org/en-US/docs/Web/API/Window/location) Object
- Listens to `popstate` and `hashchange` events
- Supports both [History](https://developer.mozilla.org/en-US/docs/Web/API/History) API and [hash](https://developer.mozilla.org/en-US/docs/Web/API/Location/hash)
- Can be viable small alternative to Routers
- Written in TypeScript

## Installation

Install [`slocation`](https://www.npmjs.com/package/slocation) as [dependency](https://docs.npmjs.com/specifying-dependencies-and-devdependencies-in-a-package-json-file) in your project .

```bash
npm install slocation
```

## Usage

`slocation` is Readable Svelte Store. It must be imported to be used.

```js
import slocation from "slocation";
```

<br>

It wraps [location](https://developer.mozilla.org/en-US/docs/Web/API/Window/location) reactively

```html
<div>{JSON.stringify($slocation)}</div>
```

It's properties are reactive too!

```html
<pre>
{$slocation.href}
{$slocation.origin}
{$slocation.protocol}
{$slocation.host}
{$slocation.hostname}
{$slocation.port}
{$slocation.pathname}
{$slocation.search}
{$slocation.hash}
</pre>
```

Most **Important** among these are [href](https://developer.mozilla.org/en-US/docs/Web/API/Location/href) , [pathname](https://developer.mozilla.org/en-US/docs/Web/API/Location/pathname) , [search](https://developer.mozilla.org/en-US/docs/Web/API/Location/search) and [hash](https://developer.mozilla.org/en-US/docs/Web/API/Location/search) because other properties of location only change on page reload. With these important properties , you can create routing in your [Svelte](https://svelte.dev/) Application.

Note that Since `slocation` wraps `location` , methods of `location` are also exposed with `slocation` . Methods which are common to both `location` and `slocation` are effectively same.

### Usage as History-API based Router

```html
{#if $slocation.pathname === '/'}
<HomeComponent />
{:else if $slocation.pathname === '/about'}
<AboutComponent />
{:else if $slocation.pathname.startsWith('/browse/') }
<!-- This Component will only appear if route begins with '/browse/' -->
<!-- $slocation.pathname / $slocation.href can further -->
<!-- be parsed to get required params (Out of Scope for this library) -->
<!-- Parse $slocation.search to get queries -->
<!-- Parse $slocation.hash to parse hash/fragment identifier -->
<SpecialComponent />
{:else}
<FallBackComponent />
{/if}
```

To Navigate without refreshing / reloading the Page , `slocation` provides these extra methods.

<br>
<br>

1. `slocation.goto(url?: string, replace?: boolean | undefined) => void`

Navigates to specified URL path. `replace` is optional and defaults to `false`. If `replace` is given `true`, most recent entry on the history stack will be updated with new one.

Example:

```js
slocation.goto("/about"); // This will Navigate to '/about' without refreshing the page
slocation.goto("/help", true); // This will Navigate to '/help' without
// refreshing the page but history State will be replaced instead of adding new one
```

2. `slocation.pushState(data: any,title: string,url?: string | null | undefined) => void`

If `history.pushState` is used , `slocation` store will not be updated breaking it's reactivity. So, `slocation.pushState` must be used which will update `slocation`. `slocation.pushState` is just wrapper function to [`history.pushState`](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState) which also updates `slocation` to keep it reactive.

Example:

```js
slocation.pushState({}, "", "/about"); // This will Navigate to '/about'
// without refreshing the page
// Code Below won't update slocation
// history.pushState({}, "", "/about"); // Although , this navigates to '/about',
// slocation store won't be updated
```

3. `slocation.replaceState(data: any,title: string,url?: string | null | undefined) => void`

Same as `slocation.pushState` but `slocation.replaceState` is wrapper to [`history.replaceState`](https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState) . `slocation.replaceState` must be used instead of `history.replaceState` .

4. `slocation.reset() => void`

Resets `slocation` with current `location` object . This force-updates `slocation` store.

<br>
<br>

Note that [`history.back()`](https://developer.mozilla.org/en-US/docs/Web/API/History/back) , [`history.forward()`](https://developer.mozilla.org/en-US/docs/Web/API/History/forward) , [`history.go()`](https://developer.mozilla.org/en-US/docs/Web/API/History/go) will update `slocation` automatically , so these can be used. Only use `slocation.pushState()` and `slocation.replaceState()` instead of `history.pushState()` and `history.replaceState()` respectively.

### Usage as Hash based Router

```html
{#if $slocation.hash === ''}
<HomeComponent />
{:else if $slocation.hash === '#/about'}
<AboutComponent />
{:else if $slocation.hash.startsWith('#/browse/') }
<!-- This Component will only appear if hash route begins with '/browse/' -->
<!-- Parse $slocation.hash to parse hash/fragment identifier -->
<SpecialComponent />
{:else}
<FallBackComponent />
{/if}
```

To Update the Route , you just need to update hash of `location` object which also updates `slocation`.

```js
location.hash = "#/about";
```

This must update the Hash Along with `slocation` store.

## License

[MIT](LICENSE)
