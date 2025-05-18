# Maskfy (3.1.3) - Mask Simple
![GitHub](https://img.shields.io/github/license/figuarnieri/maskfy?style=plastic) ![npm package minimized gzipped size](https://img.shields.io/bundlejs/size/maskfy?style=plastic) ![GitHub](https://img.shields.io/badge/CDN-jsDelivr-yellow?style=plastic) ![GitHub](https://img.shields.io/badge/AMD-purple?style=plastic) ![GitHub](https://img.shields.io/badge/CommonJS-purple?style=plastic) ![GitHub](https://img.shields.io/badge/ESModule-purple?style=plastic)

![Logo](./assets/cover.webp)

A Javascript library without a dependencies... Compatibility with Vanilla, React and wherever. With only 1kb (gzip) code. It's also well accepted on mobile devices

## Install

### Node modules

```sh
npm i maskfy
```

or

```sh
yarn add maskfy
```

## Usage

### React

```jsx
import { maskfy } from 'maskfy';
import { useState } from 'react';

...

const [stateValue, setStateValue] = useState('')

...

const handleInput = (e) => {
  const { value } = e.currentTarget;
  const valueWithMask = maskfy(value, { mask: '(99) 9999-9999' });
  setStateValue(valueWithMask);
}

...

<input name="phone" value={stateValue} onInput={handleInput} />
```

### Vue
```sh
// Coming soon
```

### Angular
```sh
// Coming soon
```

### ES Module
```jsx
import { maskfy } from 'maskfy'

const valueMask = maskfy(valueInput, { mask: '(99) 9999-9999' });
console.log(valueMask);
```

### CommonJS
```js
const { maskfy } = require('maskfy/dist/cjs');

const valueMask = maskfy(valueInput, { mask: '(99) 9999-9999' });
console.log(valueMask);
```

### AMD
```html
<script src="./dist/amd/index.js"></script>
<script>
  const valueMask = window.Maskfy.maskfy(valueInput, { mask: '(99) 9999-9999' });
  console.log(valueMask);
</script>
```

### CDN
```html
<input id="phone" />

...

<script type="module">
  import { maskfy } from 'https://cdn.jsdelivr.net/gh/figuarnieri/maskfy@master/dist/esm/index.js'

  document.querySelector('#phone').addEventListener('input', (e) => {
    const valueMask = maskfy(e.target.value, { mask: '(99) 9999-9999' });
    e.target.value = valueMask.toUpperCase();
  });
</script>
```

## Syntax

```jsx
maskfy(value);
maskfy(value, options);
```

### Parameters

#### value
String to which the mask will be applied (optional)

#### options `optional`
Object used to configure the mask

| Name    | Type                      | Default             | Description                                                                  |
| ------- | ------------------------- | ------------------- | ---------------------------------------------------------------------------- |
| mask    | string                    | `'999.999.999.999'` | String for mask implementation                                               |
| reverse | boolean                   | `false`             | Applies the mask with character reversal. Commonly used for price formatting |
| keybind | { [key: String]: RegExp } | object (1)          | Object for implementing character patterns of a mask                         |
| prefix  | string                    | `''`                | Prefix applied to the masked value                                           |
| suffix  | string                    | `''`                | Suffix applied to the masked value                                           |

```jsx
// (1) Default keybind object
{
  mask: '999.999.999.999',
  reverse: false,
  keybind: {
    A: /[A-Za-z]/,
    9: /\d/,
    '?': /./,
  },
  prefix: '',
  suffix: ''
}
```

## Examples

```jsx
// Negative price
maskfy(value, {
  mask: '999.999.999.999,99',
  reverse: true,
  prefix: '-',
})

// Percent number
maskfy(value, {
  mask: '999',
  suffix: '%',
})

// Employer Identification Number (Brazil)
maskfy(value, {
  mask: '999.999.999/9999-99',
})

// License plate number
maskfy(value, {
  mask: '9AAA999',
})

// License plate number (Mercosul)
maskfy(value, {
  mask: 'AAA 9A99',
})
```

## Coming soon
- Support to Vue
- Support to Angular
- Add plugin to handle input elements with data-* attributes
- Add formatBefore and formatAfter options

### Site
Access [figuarnieri.github.io/maskfy](https://figuarnieri.github.io/maskfy/)

## Source
[Github](https://github.com/figuarnieri/maskfy) | [npm](https://www.npmjs.com/package/maskfy)

## License
The MIT License
created by [Filipe Guarnieri](https://figuarnieri.github.io/)
