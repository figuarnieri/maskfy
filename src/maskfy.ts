/**
 * @author: figuarnieri
 * @copyright: The MIT License
 * @name Maskfy
 * @description: Simple, No Dependences and Compatibility with Vanilla, React, Vue, Angular, Mobile and etc...
 * @since: 2018
 * @version: 3.0.0
 */

'use strict';

import { IMaskfyOptions } from './types/index.d';

const MaskfyDefault = {
  Mask: '999.999.999.999',
  Reverse: false,
  Keybind: { A: /[A-Za-z]/, 9: /\d/, '?': /./ },
  Prefix: '',
  Suffix: '',
} as const;

const maskfySettings = (options: IMaskfyOptions = {}) => {
  const settings = {
    mask: MaskfyDefault.Mask,
    reverse: MaskfyDefault.Reverse,
    keybind: MaskfyDefault.Keybind,
    prefix: MaskfyDefault.Prefix,
    suffix: MaskfyDefault.Suffix,
    ...options,
  };
  return settings;
};

const maskfy = (value: string | number, options: IMaskfyOptions = {}) => {
  const settings = maskfySettings(options);
  const { mask, reverse, prefix, suffix, keybind } = settings;
  const valueString = String(value);
  const valuePrefix =
    prefix && valueString.startsWith(prefix) ? valueString.replace(new RegExp(`^${prefix}`), '') : valueString;
  const valueNormalize =
    suffix && new RegExp(`(${suffix})(.?)$`).test(suffix)
      ? valuePrefix.replace(new RegExp(`(${suffix})(.?)$`), '$2')
      : valuePrefix;
  const valueSplit = valueNormalize.replace(/\s/g, '').split('');
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
    const keybindMask: RegExp = keybind[currentMask];
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

  if (
    maskTruncate &&
    valueSplit.length >= valueFinal.length + maskTruncate &&
    maskSplit.length === valueSplit.length &&
    !prefix &&
    !suffix
  ) {
    const valueRest = valueNormalize.substring(valueNormalize.length - maskTruncate, valueNormalize.length);
    const maskRest = mask.substring(mask.length - maskTruncate, mask.length);
    const restMaskfy = maskfy(valueRest, { mask: maskRest });
    valueFinal.push(restMaskfy);
  }

  if (reverse) {
    valueFinal.reverse();
  }

  if (prefix && valueFinal.length) {
    valueFinal.unshift(prefix);
  }
  if (suffix && valueFinal.length) {
    valueFinal.push(suffix);
  }

  if (valueInterator.length + maskTruncate > maskInterator.length && reverse) {
    const substringEnd = maskSplit.length - valueSplit.length;
    return valueSplit.join('').substring(0, valueSplit.length - substringEnd);
  }

  return valueFinal.join('');
};

export { maskfy, maskfySettings, MaskfyDefault };

if (typeof window !== 'undefined') {
  window['Maskfy'] = maskfy;
}
