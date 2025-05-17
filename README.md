# Maskfy (3.1.2) - Mask Simple
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
```html
<input id="phone" />

...

<script type="module">
  import { maskfy } from './dist/esm/index.js'

  document.querySelector('#phone').addEventListener('input', (e) => {
    const valueMask = maskfy(e.target.value, { mask: '(99) 9999-9999' });
    e.target.value = valueMask.toUpperCase();
  });
</script>
```

### Vanilla
```html
<input id="phone" />

...

<script src="./dist/vanilla/index.js" type="text/javascript"></script>
<script>
  document.querySelector('#phone').addEventListener('input', (e) => {
    const valueMask = window.Maskfy(e.target.value, { mask: '(99) 9999-9999' });
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
| keybind | { [key: String]: RegExp } | object *            | Object for implementing character patterns of a mask                         |
| prefix  | string                    | `''`                | Prefix applied to the masked value                                           |
| suffix  | string                    | `''`                | Suffix applied to the masked value                                           |

```jsx
// * Default keybind object
{
  mask: '999.999.999.999,99',
  reverse: true,
  keybind: {
    A: /[A-Za-z]/,
    9: /\d/,
    '?': /./,
  },
  prefix: 'US$ ',
  suffix: ' %'
}
```

## Coming soon
- Support to Vue
- Support to Angular
- Add plugin to handle input elements with data-* attributes

## Examples

### Usage
```jsx
maskfy(value, {
  mask: '999.999.999.999,99',
  reverse: true,
  keybind: {
    e: /\d/,
  },
  prefix: 'US$ ',
  suffix: ' %',
})
```

### Site
Access [figuarnieri.github.io/maskfy](https://figuarnieri.github.io/maskfy/)

## Source
[Github](https://github.com/figuarnieri/maskfy) | [npm](https://www.npmjs.com/package/maskfy)

## License
The MIT License
created by [Filipe Guarnieri](https://figuarnieri.github.io/)
