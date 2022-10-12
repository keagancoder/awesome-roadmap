<h1 align="center">useRefState</h1>
<p align="center">🔥 React hook for maintaining correct values, in a clean way, without updates on unmounted components</p>
<p align="center">
    <a href="https://github.com/alex-cory/urs/pulls">
      <img src="https://camo.githubusercontent.com/d4e0f63e9613ee474a7dfdc23c240b9795712c96/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f5052732d77656c636f6d652d627269676874677265656e2e737667" />
    </a>
    <a href="https://www.npmjs.com/package/urs">
      <img src="https://img.shields.io/npm/dt/urs.svg" />
    </a>
    <a href="https://bundlephobia.com/result?p=urs">
      <img alt="undefined" src="https://img.shields.io/bundlephobia/minzip/urs.svg">
    </a>
    <!-- <a href="https://github.com/alex-cory/urs/blob/master/license.md">
      <img alt="undefined" src="https://img.shields.io/github/license/alex-cory/urs.svg">
    </a> -->
    <a href="https://codeclimate.com/github/alex-cory/urs/maintainability">
      <img src="https://api.codeclimate.com/v1/badges/e661bf6aa5e4d64502c6/maintainability" />
    </a>
    <a href="https://www.npmjs.com/package/urs">
      <img src="https://img.shields.io/npm/v/urs.svg" style="max-width:100%;">
    </a>
</p>

Features
--------

- TypeScript support
- Zero dependencies
- React Native support
- Keep your state consistant within your callback functions

<!-- ### Examples
- [Example - Next.js - codesandbox container](https://codesandbox.io/s/rs-in-nextjs-actual-epb25) (sometimes containers are buggy, if so try [this example](https://codesandbox.io/s/rs-in-nextjs-4gy7v)) -->

Installation
------------

```shell
yarn add urs      or     npm i -S urs
```

Usage
-----

```jsx
import useRefState from 'urs'
import { useState } from 'react'

const App = () => {
  const [loadingRef, setLoadingRef] = useRefState(false)
  const [loadingState, setLoadingState] = useState(false)
  
  // DO NOT destructure like this
  const [{ current }] = useRefState()
  
  const onClick = () => {
    setLoadingRef(true)
    console.log('loadingRef.current', loadingRef.current) // gives us `true`
    setLoadingState(true)
    console.log('loadingState', loadingState) // gives us `false`
  }

  return (
    <button onClick={handleClick}>Click Me!</button>
  )
}
```

Options
-------

The 2nd argument of `useRefState` determines if you want to be able to update state when a component
is unmounted. If `true` it will block setState on unmounted components. Useful for the common error `cannot update state on unmounted component`.

```js
const [state, setState] = useRefState('same as useState default state', true)
```
