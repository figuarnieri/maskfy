/**
 * @author: figuarnieri
 * @copyright: The MIT License
 * @name Maskfy
 * @description: A Javascript library without a dependency of jQuery, Zepto, and etc ... Very simple to install and use. With only 1kb (gzip) code, it's also well accepted on mobile devices
 * @since: 2018
 * @version: 3.0.0
 */

'use strict';

import { IMaskfyOptions } from './types';

export const MaskfyDefault = {
  Mask: '999.999.999.999',
  Reverse: false,
  Keybind: { A: /[A-Za-z]/, 9: /\d/, '?': /./ },
  Prefix: '',
  Suffix: '',
} as const;

export const maskfySettings = (options: IMaskfyOptions = {}) => {
  const settings = {
    mask: MaskfyDefault.Mask,
    reverse: MaskfyDefault.Reverse,
    prefix: MaskfyDefault.Prefix,
    suffix: MaskfyDefault.Suffix,
    ...options,
  };
  return settings;
};

export const maskfy = (value: string | number, options: IMaskfyOptions = {}) => {
  const valueString = String(value).replace(/\s/g, '');
  const settings = maskfySettings(options);
  const { mask, reverse, prefix, suffix } = settings;
  const valueSplit = valueString.split('');
  const maskSplit = mask.split('');
  const maskInterator = [...maskSplit];
  const valueInterator = [...valueSplit];
  const valueFinal: string[] = [];

  if (reverse) {
    maskInterator.reverse();
    valueInterator.reverse();
  }

  let maskTruncate = 0;
  let valueTruncate = 0;
  maskInterator.forEach((_, i) => {
    const currentMask = maskInterator[i - maskTruncate];
    const currentValue = valueInterator[i + valueTruncate];
    const keybindMask = MaskfyDefault.Keybind[currentMask];
    if (currentValue) {
      if (keybindMask?.test(currentMask)) {
        if (keybindMask?.test(currentValue)) {
          valueFinal.push(currentValue);
        } else {
          maskTruncate++;
        }
      } else {
        valueFinal.push(currentMask);
        if (currentValue !== currentMask) {
          valueTruncate--;
        }
      }
    }
  });

  if (maskTruncate && valueSplit.length >= valueFinal.length + maskTruncate && maskSplit.length === valueSplit.length) {
    const valueRest = valueString.substring(valueString.length - maskTruncate, valueString.length);
    const maskRest = mask.substring(mask.length - maskTruncate, mask.length);
    const restMaskfy = maskfy(valueRest, { mask: maskRest });
    valueFinal.push(restMaskfy);
  }

  if (reverse) {
    valueFinal.reverse();
  }

  if (prefix) {
    valueFinal.unshift(prefix);
  }
  if (suffix) {
    valueFinal.push(suffix);
  }

  return valueFinal.join('');
};
