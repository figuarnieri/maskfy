"use strict";
function Maskfy( object ) {
    const objectTag = typeof object==='string' ? object : object.tag;
    document.querySelectorAll(objectTag).forEach((tag) => {
        tag.addEventListener('paste', (e) => e.preventDefault());
        tag.addEventListener('input', (e) => {
            const input = e.target
            , inputValue =  input.value
            , inputLength =  inputValue.length
            , mask = object.mask || input.dataset.mask
            , maskLength = mask.length
            , maskSize = ( object.size || tag.dataset.maskSize )
            , value = inputValue.replace(/\D/g, '')
            , valueFinal = value.split('')
            , objectReverse = object.reverse || input.hasAttribute('data-mask-reverse')
            ;
            var i;
            if( inputLength > maskLength ){
                valueFinal.pop();
            }
            if( objectReverse ){
                if( /\d/.test(valueFinal[0]) && valueFinal.length>maskSize && valueFinal[0]==='0'){
                    valueFinal.shift();
                }
                for( i in inputValue.split('') ){
                    if( /\D/.test(mask[maskLength-i-1]) ) {
                        valueFinal.splice(valueFinal.length-i, 0, mask[maskLength-i-1]);
                    }
                }
                if( (e.inputType==='deleteContentBackward') ){
                    if( (value.length<maskSize) ){
                        valueFinal.unshift(0);
                    }
                    if( (/\D/.test(valueFinal[0])) ){
                        valueFinal.shift();
                    }
                }
            } else {
                for( i in inputValue.split('') ){
                    if( /\D/.test(mask[i]) ) {
                        valueFinal.splice(i, 0, mask[i]);
                    }
                }
                if( e.inputType==='deleteContentBackward' ) {
                    for( i=valueFinal.length-1; i>=0 ; i-- ){
                        (/\D/.test(valueFinal[i])) ? valueFinal.pop() : i=-1;
                    }
                }
            }
            input.value = valueFinal.join('');
            if(window.innerWidth < 760){
                setTimeout(() => {
                    input.selectionStart = input.selectionEnd = input.value.length;
                    input.focus();
                }, 0);
            }
        });
        const inputTrigger = tag.value.split('')
        , inputLength = inputTrigger.length
        , objectSize = ( object.size || tag.dataset.maskSize || 0 )
        ;
        for( var i=objectSize; i>inputLength; i-- ){
            inputTrigger.unshift(0);
        }
        tag.value = '';
        inputTrigger.map((item) => {
            tag.value += item;
            const eventTrigger = new MouseEvent('input');
            tag.dispatchEvent(eventTrigger);
        });
    });
}
