/**
 * @author: figuarnieri
 * @copyright: The MIT License
 * @name Maskfy
 * @description: A Javascript library without a dependency of jQuery, Zepto, and etc ... Very simple to install and use. With only 1kb (gzip) code, it's also well accepted on mobile devices
 * @since: 2018
 * @version: 3.0.0
 */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.maskfy = exports.maskfySettings = exports.MaskfyDefault = void 0;
exports.MaskfyDefault = {
    Mask: '999.999.999.999',
    Reverse: false,
    Keybind: { A: /[A-Za-z]/, 9: /\d/, '?': /./ },
    Prefix: '',
    Suffix: '',
};
const maskfySettings = (options = {}) => {
    const settings = {
        mask: exports.MaskfyDefault.Mask,
        reverse: exports.MaskfyDefault.Reverse,
        prefix: exports.MaskfyDefault.Prefix,
        suffix: exports.MaskfyDefault.Suffix,
        ...options,
    };
    return settings;
};
exports.maskfySettings = maskfySettings;
const maskfy = (value, options = {}) => {
    const valueString = String(value).replace(/\s/g, '');
    const settings = (0, exports.maskfySettings)(options);
    const { mask, reverse, prefix, suffix } = settings;
    const valueSplit = valueString.split('');
    const maskSplit = mask.split('');
    const maskInterator = [...maskSplit];
    const valueInterator = [...valueSplit];
    const valueFinal = [];
    if (reverse) {
        maskInterator.reverse();
        valueInterator.reverse();
    }
    let maskTruncate = 0;
    let valueTruncate = 0;
    maskInterator.forEach((_, i) => {
        const currentMask = maskInterator[i - maskTruncate];
        const currentValue = valueInterator[i + valueTruncate];
        const keybindMask = exports.MaskfyDefault.Keybind[currentMask];
        if (currentValue) {
            if (keybindMask?.test(currentMask)) {
                if (keybindMask?.test(currentValue)) {
                    valueFinal.push(currentValue);
                }
                else {
                    maskTruncate++;
                }
            }
            else {
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
        const restMaskfy = (0, exports.maskfy)(valueRest, { mask: maskRest });
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
exports.maskfy = maskfy;
