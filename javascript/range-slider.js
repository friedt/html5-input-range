/**
 * Created by pepijn on 08-12-15.
 */

function initRangeSlider() {
	'use strict';
	var sliderForm = document.getElementById('html5-range-slider');
	if (sliderForm === null) {
		return false;
	}
	var	progressBar,
		sliderValue,
		sliders = sliderForm.querySelectorAll('.slider__input'),
		output,
		step, max,
		isTouch = (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0));


	var slidersLen = sliders.length;


	function initSliders() {
		var i;
		for (i = 0; i < slidersLen; i++) {

			sliderValue = Number(sliders[i].value);
			step = Number(sliders[i].getAttribute('step'));
			progressBar = sliders[i].previousElementSibling;
			output = sliders[i].nextElementSibling;
			max = Number(sliders[i].getAttribute('max'));

			sliderProgress(sliderValue, progressBar, output, step);
		}
	}

	initSliders();

	if (isTouch) {
		// touch devices
		var touchStart = 'touchstart' || 'MSPointerDown',
			touchMove = 'touchmove' || 'MSPointerMove',
			touchEnd = 'touchend' || 'MSPointerUp';
		sliderForm.addEventListener(touchStart, getDomNode); //get input element after touchstart event
		sliderForm.addEventListener(touchMove, handleSlider); //get current value when sliding
		sliderForm.addEventListener('change', handleSlider); //get current value when touching the slider somewhere
		sliderForm.addEventListener(touchEnd, handleSliderRequest); // get input value after touchend event

	} else {
		//desktop
		sliderForm.addEventListener('mousedown', getDomNode); //get input element after onmousedown event
		sliderForm.addEventListener('input', handleSlider); //get current input value when sliding
		sliderForm.addEventListener('keyup', handleSlider); //get current input value when using key
		sliderForm.addEventListener('mouseup', handleSliderRequest); // get input value after onmouseup event
		sliderForm.addEventListener('keyup', handleSliderRequest); // get input value after onmouseup event
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
		for (var i = 0; i < slidersLen; i++) {
			var val = sliders[i].value;

			arrayVal.push(val);

		}
		console.info(arrayVal)
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

document.addEventListener('DOMContentLoaded',function() {

	initRangeSlider();

});


