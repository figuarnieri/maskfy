# Maskfy (3.0.0) - Input Mask Simple
A Javascript library without a dependency of jQuery, Zepto, and etc ... Very simple to install and use. With only 1kb (gzip) code, IE Compatibility, it's also well accepted on mobile devices
## Install / Usage
Add Maskfy file
```html
<script src="https://cdn.rawgit.com/figuarnieri/maskfy/master/maskfy.js"></script>
or
<script src="path/js/maskfy.es5.js"></script>
```
### HTML _(by class or attribute)_
Insert a selector in class tag
```html
<input class="page--input" data-maskfy="999.999.999-99" type="text" placeholder="CPF (Ex.: 999.999.999-99)">
or
<input class="page--input mask-by-class" type="text" placeholder="CPF (Ex.: 999.999.999-99)">
```
### Javascript Options
```javascript
<script>
  new Maskfy({
    tag: '[data-maskfy]', //{String: undefined} (required) selector input
    mask: '999.999.999,99', //{String: undefined} (required) input mask pattern
    reverse: true, //{Boolean: false} reverse typing
    minSize: 3 //{Number: false} minimum digits
    defaultValue: '123' //{String: undefined} initial value
    letters: true //{Boolean: false} allowed letters
    after: (input) => console.log(input) //{Function: undefined} after input event
  });
</script>
```
## HTML attributes [data-*]
If necessary, you could add attributes in the tag, to configure your mask options

### data-maskfy
```html
<input data-maskfy="999.999.999,99">
```
### data-maskfy-reverse
```html
<input data-maskfy="999.999.999,99" data-maskfy-reverse="true">
```
### data-maskfy-minsize
```html
<input data-maskfy="999.999.999,99" data-maskfy-reverse="true" data-maskfy-minsize="3">
```
### data-letters
```html
<input data-maskfy="999.999.999,99" data-maskfy-letters="true">
```
### default value
```html
<input data-maskfy="999.999.999,99" value="123.456.789,01">
```

## Source
[Github](https://github.com/figuarnieri/maskfy) | [npm](https://www.npmjs.com/package/maskfy) | [React](https://www.npmjs.com/package/react-maskfy) | [Example](https://figuarnieri.github.io/maskfy/) | [@figuarnieri](https://twitter.com/figuarnieri)

## License
The MIT License
Copyright since 2018 © [Filipe Guarnieri](https://figuarnieri.github.io/)
