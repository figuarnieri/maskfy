# Maskfy (3.1.3) - Mask Simple
![GitHub](https://img.shields.io/github/license/figuarnieri/maskfy?style=plastic) ![npm package minimized gzipped size](https://img.shields.io/bundlejs/size/maskfy?style=plastic) ![GitHub](https://img.shields.io/badge/CDN-jsDelivr-yellow?style=plastic) ![GitHub](https://img.shields.io/badge/AMD-purple?style=plastic) ![GitHub](https://img.shields.io/badge/CommonJS-purple?style=plastic) ![GitHub](https://img.shields.io/badge/ESModule-purple?style=plastic)

![Logo](data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAABFwAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAtAAAACgAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAABGRtZGF0EgAKChgl7Pn2CBAQNCAyywgSAAKKKKFAtIGrIuYh/RCmLnOV9vX8JFMhh+L5j+lFqsgB4zgDY+ToCh2N8aav61UkXvRMr30prJsgVCeaW5FTsTBmmATQuLfC+CGT4dmXhmhXtZbEjDjcov+NWMFz7YJ6zApW4R55YNNJa7O2hA1dHCO+z3mSm2sAKrIK5QuYJuWaCr7oKLxK193/zSXoZz79XlwBkIril7+TvKME/ooK2OetgjRQ+R7Pp1c7e2zD3bCS9al21Ztepoqi77rxYruqcPscFIDcXPFrQDG8Kvv7qN0eKeozFMMQycMpIf+qjvmvH5w3u0oiZ/ELLKo4zjFMXWNpY15mmnrinzP/L2Y4PRJx6AHQIHAruUR0PGFYZt8ZEbc+Uzv956f9E9/7501qAitOQNejQkDV7W0HCRMbu51QjZThC674pgK/wHGCfU9qGus8RENzKlSvdea23fOsc95Mj91ShjTOxiXQQ+f9c0HQ/V1Hf5pqzVodUCVMbm5kr8Hs3D64e3hXaACtop//c2DE3Q22SYkhyYoX7vmoe3uuDuyLVhgr5fwbV/K8aELoj4BdYgYm0USppBo/nn9zcjyt31GeguCywVkWSHyzVNGm4W0d9KPqKZtb81ScQcNs6/g9GhgwNbNPCESC+MpK2ND7In5ohcSphTSMcimCZjUidlU2p8EfOH305e5bW0F9rz/uVKJpMWBKGCwDUG4ufoP3tKhSQU8KFAbQ2lD1njBqF4WdUsPgckG9WEB0P18f6B1s2o2qe4d9pScMIFQf3scjBQBEndw5RwsRiuGebSbLu+rXcfXLxGQfNTk+sbeh8QJXq7CYmmV3YScv5qHFNdkWu5C2PmJ5v4/GtODB08pPQJjzx0oa1lBfRX+L/Zpz69/R4Ufg7NNwENUmyeLti9ZC4ieXAe6NDYnrM/Ul3k5NoQIRmdn8n9jtSz/LekGZ+AAUKjQ393oGggf8XSoFvB62OFU2AC7AosG18hhug8tuECnxms+TTKmElUJEjM+XDaQqVHQmXv0p5FeKSLRfVybNF5qa3syFLfogfFkVXpNoCRoeBkq5CejRVH1xZ9pC/88T8NoIkMkoP9H0v5EasziFnLb5Y2CkwdRhVGV7sphxmFb4Hu+had5vlDX0vlW4eD3G+x03i6R5smbHp1pPAPQNRUWldXTIMnQ6l54JEi+rUkHepMeYadIVPvxtYzv23OAN8pz2FujCxlc2v3CdtmZFN6Ur1uulbu+8mlDhI4svbArq/6xX7n/BVt5nYToOtgPpD09gZ1faE/KI2uIAczSfF2w9nVR88/a5Tcpemm00vSYsM8iu18MUibyIutFBr/OQ90yBm5k1QpCmdoso0HkRdc5XRma/LqfLo4f/saIcYH289aEYymtAfOMwXHQYgquZ4BXUcaIxSpSE5cqf7Jvqr0Dw9EJhwySy01Ks1jqYKNBfOIK0m/36buhmrNG8PtzXM6W5PXEU)

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
