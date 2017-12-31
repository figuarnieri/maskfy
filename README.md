# Maskfy - Input Mask Simple
A Javascript library without a dependency of jQuery, Zepto, and etc ... Very simple to install and use. With only 1kb (gzip) code, it's also well accepted on mobile devices
## Install / Usage
Add Maskfy file
```html
<script src="path/js/maskfy.min.js"></script>
```
### HTML _(by class or attribute)_
Insert a selector in class tag
```html
<input class="page--input" data-mask="999.999.999-99" type="text" placeholder="CPF (Ex.: 999.999.999-99)">
or
<input class="page--input mask-by-class" type="text" placeholder="CPF (Ex.: 999.999.999-99)">
```
### Javascript Simple _(by attribute)_
```html
<script>
  new Maskfy('[data-mask]');
</script>
or
<script>
  new Maskfy('.mask-by-class');
</script>
```
### Javascript Options
```html
<script>
  new Maskfy({
    tag: '[data-mask]', // selector tag
    reverse: true, // reverse typing
    mask: '999.999.999,99', // mask pattern
    size: 3 // minimum digits
  });
</script>
```
## Data attributes _[data-*]_
If necessary, you could add attributes in the tag, to configure your mask options

### data-mask
```html
<input data-mask="999.999.999,99">
```
### data-mask-reverse
```html
<input data-mask="999.999.999,99" data-mask-reverse>
```
### data-mask-size
```html
<input data-mask="999.999.999,99" data-mask-reverse="" data-mask-size="3">
```

## Source
[Github](https://github.com/figuarnieri/maskfy) | [Exemple](https://figuarnieri.github.io/maskfy/) | [@figuarnieri](https://twitter.com/figuarnieri)

## License
The MIT License
Copyright 2017 © [Filipe Guarnieri](https://figuarnieri.github.io/)
