/**
 * @author: figuarnieri
 * @copyright: The MIT License
 * @name Maskfy
 * @description: A Javascript library without a dependency of jQuery, Zepto, and etc ... Very simple to install and use. With only 1kb (gzip) code, it's also well accepted on mobile devices
 * @since: 2017
 * @version: 1.0.3
 */
"use strict";

class Maskfy {
  /**
   * @param {String || Object} Selector String
   * @return {String || Object}
   */
  constructor(obj){
    this.objectTag = typeof obj==='string' ? obj : obj.tag;
    this.objectSize = obj.size;
    this.objectMask = obj.mask;
    this.objectReverse = obj.reverse;
    this.init(this.objectTag);
  }

  /**
   * function to execute foreach of objectTag
   * @param {String} input
   * @return {String}
   */
  init(input){
    document.querySelectorAll(input).forEach((tag) => {
      this.paste(tag);
      this.input(tag);
      this.format(tag);
    });
  }

  /**
   * Event Input
   * @param {String} input
   * @return {String}
   */
  input(input){
    input.addEventListener('input', (event) => {
      const inputValue =  input.value, //get current value
      inputLength =  inputValue.length, //get current value length
      mask = this.objectMask || input.dataset.mask, //get format input mask
      maskLength = mask.length, //get length by format input mask
      maskSize = this.objectSize || input.dataset.maskSize, //get min length input mask
      value = inputValue.replace(/\D/g, ''), //remove only not digits
      valueFinal = value.split(''), //transform to Array
      objectReverse = this.objectReverse || input.hasAttribute('data-mask-reverse'); //detect reverse value on input
      let i; // iterator
      /**
       * If the mask value is greater than the input value
       * @param {Number} inputLength > maskLength
       * @return {Array} remove the last key typed
       */
      if(inputLength > maskLength){
        valueFinal.pop();
      }

      /**
       * If the reverse input mask
       * @param {Boolean} objectReverse
       */
      if(objectReverse){
        if(/\d/.test(valueFinal[0]) && valueFinal.length>maskSize && valueFinal[0]==='0'){
          valueFinal.shift();
        }
        for(i in inputValue.split('')){
          if(/\D/.test(mask[maskLength-i-1])){
            valueFinal.splice(valueFinal.length-i, 0, mask[maskLength-i-1]);
          }
        }
      /**
       * If key press backward
       */
        if((event.inputType==='deleteContentBackward')){
          if((value.length<maskSize)){
            valueFinal.unshift(0);
          }
          if((/\D/.test(valueFinal[0]))){
            valueFinal.shift();
          }
        }
      } else{
        for(i in inputValue.split('')){
          if(/\D/.test(mask[i])){
            valueFinal.splice(i, 0, mask[i]);
          }
        }
      /**
       * If key press backward
       */
        if(event.inputType==='deleteContentBackward'){
          for(i=valueFinal.length-1; i>=0 ; i--){
            (/\D/.test(valueFinal[i])) ? valueFinal.pop() : i=-1;
          }
        }
      }
      input.value = valueFinal.join('');
      this.responsive(input);
    });
  }
  /**
   * Event Paste
   * @param {String} input
   * @return {null}   event.preventDefault
   */
  paste(input){
    input.addEventListener('paste', (event) => event.preventDefault());
  }
  /**
   * Format Input
   * @param {String} input
   * @return {String} format Input Mask by forEach
   */
  format(input){
    const inputTrigger = input.value.split(''),
    inputLength = inputTrigger.length,
    objectSize = (this.objectSize || input.dataset.maskSize || 0);
    for(var i=objectSize; i>inputLength; i--){
      inputTrigger.unshift(0);
    }
    input.value = '';
    inputTrigger.map((item) => {
      input.value += item;
      const eventTrigger = new MouseEvent('input');
      input.dispatchEvent(eventTrigger);
    });
  }
  /**
   * Responsive
   * @param  {String} input
   * @return {String} Bug fix selection position on mobile devices
   */ 
  responsive(input){
    setTimeout(() => {
      input.selectionStart = input.selectionEnd = input.value.length;
    }, 0);
  }
}