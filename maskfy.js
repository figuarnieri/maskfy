/**
 * @author: figuarnieri
 * @copyright: The MIT License
 * @name Maskfy
 * @description: A Javascript library without a dependency of jQuery, Zepto, and etc ... Very simple to install and use. With only 1kb (gzip) code, it's also well accepted on mobile devices
 * @since: 2018
 * @version: 2.0.0
 */

"use strict";

class Maskfy{
  /**
   * @param {String || Object} Selector String
   * @return {String || Object}
   */
  constructor(props){
    this.tag = props.tag; // {String} Tag selector
    this.mask = props.mask; // {String} Input mask
    this.reverse = props.reverse; // {Boolean} Content insert invert (like coins)
    this.minSize = props.minSize; // {Number} Minimum number of characters
    this.defaultValue = props.defaultValue; // {String} Initial value
    this.letters = props.letters; // {Boolean} Allowed alpha characters
    this.after = props.after; // {Function} Function after insert new input value
    
    if(!this.tag) return console.error(new Error('Maskfy: Insert tag selector required. Ex.: Maskfy({tag: "[data-maskfy]"})'));
    this.init();
  }
  
  /**
   * function to execute foreach of objectTag
   * @param {String} input
   * @return {String}
   */
  init(){
    [].forEach.call(document.querySelectorAll(this.tag), tag => {
      tag.addEventListener('input', e => this.format(e));
      const _value = tag.value.trim();
      if(_value!=='' || this.defaultValue){
        tag.value = tag.value || tag.dataset.maskfyValue || this.defaultValue;
      }
      this.event(tag);
    });
  }
  
  /**
   * dispatchEvent Input
   * @param {String} input
   * @return {String}
   */
  event(tag){
    
    if(window.navigator.msPointerEnabled){
      const event = document.createEvent("Event");
      event.initEvent("input", false, true);
      tag.dispatchEvent(event);
    } else {
      tag.dispatchEvent(new Event('input'));
    }
  }
  
  /**
   * Event Input
   * @param {String} input
   * @return {String}
   */
  format(e){
    const _value = e.target.value;
    const _mask = e.target.dataset.maskfy || this.mask;
    const _reverse = e.target.dataset.maskfyReverse==='true' || this.reverse;
    const _letters = e.target.dataset.maskfyLetters==='true' || this.letters;
    let _valueFormat;
    if(!_mask) return console.error(new Error('Maskfy: Insert input mask required. Ex.: Maskfy({mask: "9999-99-99"})'));
    if(_mask.length>=_value.length){
      _valueFormat = _value.replace((_letters ? /\W/g : /\D/g), '').split('');
    } else {
      _valueFormat = _value.split('');
      _valueFormat.pop();
      if(e.target.selectionEnd!==_value.length){
        setTimeout(() => this.event(e.target), 10);
      }
    }
    if(/^\W+/.test(_mask) && _mask.length>=_value.length){
      _valueFormat.unshift(/^\W+/.exec(_mask)[0]);
    }
    if(_reverse){
      const _minSize = Number(e.target.dataset.maskfyMinsize) || this.minSize;
      const _maskReverse = _mask.split('');
      const _valueReverse = _valueFormat.concat('');
      _maskReverse.reverse();
      _valueReverse.reverse().shift();
      if(_minSize && _valueFormat.length<_minSize){
        _valueReverse.push('0');
      } else {
        if(_valueReverse[_valueReverse.length-1]==='0'){
          if(/\d/.test(_value[_value.length-1])){
            _valueReverse.pop();
          }
        }
      }
      for(let i=0; i<_valueReverse.length; i++){
        if(/\W/.test(_maskReverse[i])){
          _valueReverse.splice(i, 0, _maskReverse[i]);
        }
      }
      if(_maskReverse.length>=_valueReverse.length){
        _valueFormat = _valueReverse.reverse();
      }
    } else {
      for(let i=0; _mask.length>i && _mask.length>=_value.length; i++){
        if(isNaN(parseInt(_mask[i])) && _valueFormat[i-1]){
          _valueFormat.splice(i, 0, _mask[i])
        }
      }
    }
    _valueFormat.splice(_mask.length, _valueFormat.length);
    e.target.value = _valueFormat.join('').replace(/(\W+)$/, '');
    setTimeout(() => {
      if(!e.target.classList.contains('maskfy--active')){
        e.target.classList.add('maskfy--active');
        this.event(e.target);
      }
      if(this.after){
        this.formatAfter(e.target);
      }
    }, 10);
  }

  /**
   * Event After Insert Value
   * @param {String} input
   * @return {String}
   */
  formatAfter(tag){
    this.after(tag, this);
  }
}