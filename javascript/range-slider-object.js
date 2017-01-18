function RangeSlider (element){
    debugger;
    'use strict';
    var sliderObj = element;
    if (sliderObj === null) {
        return false;
    }
    var	progressBar,
        sliderValue,
        inputElm = sliderObj.querySelector('.slider__input'),
        output,
        requestInput = document.querySelector('.output'),
        step, max,
        isTouch = (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0));

    function initSlider() {

            sliderValue = Number(inputElm.value);
            step = Number(inputElm.getAttribute('step'));
            progressBar = inputElm.previousElementSibling;
            output = inputElm.nextElementSibling;
            max = Number(inputElm.getAttribute('max'));

            sliderProgress(sliderValue, progressBar, output, step);

    }

    initSlider();

    if (isTouch) {
        // touch devices
        var touchStart = 'touchstart' || 'MSPointerDown',
            touchMove = 'touchmove' || 'MSPointerMove',
            touchEnd = 'touchend' || 'MSPointerUp';
        sliderObj.addEventListener(touchStart, getDomNode); //get input element after touchstart event
        sliderObj.addEventListener(touchMove, handleSlider); //get current value when sliding
        sliderObj.addEventListener('change', handleSlider); //get current value when touching the slider somewhere
        sliderObj.addEventListener(touchEnd, handleSliderRequest); // get input value after touchend event

    } else {
        //desktop
        sliderObj.addEventListener('mousedown', getDomNode); //get input element after onmousedown event
        sliderObj.addEventListener('input', handleSlider); //get current input value when sliding
        sliderObj.addEventListener('keyup', handleSlider); //get current input value when using key
        sliderObj.addEventListener('mouseup', handleSliderRequest); // get input value after onmouseup event
        sliderObj.addEventListener('keyup', handleSliderRequest); // get input value after onmouseup event
    }



    function getDomNode(e) {
        var target = e.target;

        if (target.nodeName.toLowerCase() !== 'input'){
            return false;
        }
        progressBar = target.previousElementSibling;
        output = target.nextElementSibling;
        sliderValue = Number(target.value);

        step = Number(target.getAttribute('step'));
        max = Number(target.getAttribute('max'));

    }

    // get slider value when sliding
    function handleSlider(e) {
        var target = e.target;

        if (target.nodeName.toLowerCase() !== 'input'){
            return false;
        }

        //console.log(e.target.nodeName, e.target.value)
        var sliderValue = Number(target.value);
        sliderProgress(sliderValue);

    }

    function getAllSliderValues() {
        var arrayVal = [];
        var val = inputElm.value;

        arrayVal.push(val);

        console.info(arrayVal)
        requestInput.innerHTML = arrayVal;

        return arrayVal;
    }



    // get the value set
    function handleSliderRequest(e) {
        var target = e.target;
        if (target.nodeName.toLowerCase() !== 'input'){
            return false;
        }
        getAllSliderValues();
    }

    function sliderProgress(sliderValue) {

        var perc = (sliderValue / max) * 100;
        //console.info('percentage', perc + '%', 'max 500' , max)

        if (step === 1) {
            perc = (sliderValue / max) * 100;
            //console.info('max 50', max)
        }

        output.innerHTML = sliderValue;
        progressBar.style.width = perc + '%';

        if (sliderValue === max) {
            progressBar.classList.add('end');
        } else {
            progressBar.classList.remove('end');
        }

    }

}

function initRangeSlider(){
    var sliders = document.querySelectorAll('.html5-range-slider');
    if (sliders.length > 0){
        initSliders ();
    } else {
        console.log('false')
        return;
    }

    function initSliders (){
        sliders.forEach( function(e){
            debugger;
            var slider = e;
            var sliderObj = new RangeSlider(slider);
        });
    }
}



//document ready
document.addEventListener('DOMContentLoaded', initRangeSlider);


