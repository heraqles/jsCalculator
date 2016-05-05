(function () {
    'use strict';

    var screenVal = document.querySelector('.screen input'),
        calculator = document.querySelector('.calculator'),
        keyboard = document.querySelector('.keyboard'),
        changeButton = document.querySelector('.change');
    
    function addValue(key){
        screenVal.value += key;
        var output = validateValue(screenVal.value);
        screenVal.value = output;
    }

    function clearScreen(){
        screenVal.value = '';
    }

    function removeLast(){
        screenVal.value = screenVal.value.slice(0, -1);
    }

    function calculate(){
        var value = screenVal.value,
            ifLastOperator = /[-+*/]$/;
        // percent(value);
        value = value.replace(ifLastOperator, '');
        screenVal.value = eval(value);
    }

    function changeMark(){
        var value = screenVal.value,
            re = /^\d+$/;
        if (re.test(value)){
            value = (value * (-1));
            screenVal.value = value;
        }
    }

    function validateValue(el){
        var s = el,
            removeZero = /0(?=\d)/g,
            changeMinus = /--/,
            //remove unses 0
            value = s.replace(removeZero, '').replace(changeMinus,'+');
        return value;
    }
    // function percent(el){
    //     var value = el,
    //         percentNumReg = /\d+(?=%)/g,
    //         percentNum = value.match(percentNumReg);
            
    // }

    function validKeybordKey(el){
        var allowKey = [
            48,49,50,51,52,53,54,55,56,57,58, //numbers
            42,43,61,45,46, //operators
            13,37];
        if(allowKey.indexOf(el) !== -1){
            return true;
        }else{
            return false;
        }
    }
    function buttonValue(e){
        var key = e.target.innerHTML;
        function turnOnAnimation(el){
            el.classList.add('button-click');
            el.addEventListener('animationend', function(){
                el.classList.remove('button-click');
            }, false);
        }
        screenVal.focus();
        if(e.target && e.target.nodeName === 'BUTTON'){
            turnOnAnimation(e.target);
            if(key === '='){
                calculate();
            }else if (key === 'C'){
                clearScreen();
            }else if (key === 'B'){
                removeLast();
            }else if (key === '+/-'){
                changeMark();
            }else if (key === '%'){
                addValue(key);
                // percent();
            }else{
                addValue(key);
            }
        }
    }
    function keyValue(e){
        var key = e.keyCode;
        screenVal.focus();
        var letter = String.fromCharCode(key);
        function turnOnAnimation(el){
            el.classList.add('button-click');
            el.addEventListener('animationend', function(){
                el.classList.remove('button-click');
            }, false);
        }
        function checkLetter(el){
            var buttons = keyboard.querySelectorAll('button'),
                arrButtons = Array.prototype.slice.call(buttons);
            arrButtons.forEach( function(e) {
                var test = e.innerHTML;
                if (el === test){
                    e.classList.add('button-click');
                }
            });

        }
        checkLetter(letter);
        turnOnAnimation();
        if(validKeybordKey(key)){
            if (key === 61 || key === 13){
                calculate();
                e.preventDefault();
            }else if(key == 67){
                clearScreen();
            }else if(key == 53){
                // percent();
            }
        }else{
            e.preventDefault();
        }
    }
    function defaultScreen(){
        screenVal.focus();
        screenVal.value = 0;
    }
    function allTimeActive(){
        this.focus();
    }
    function test(){
        var output = validateValue(screenVal.value);
        screenVal.value = output;

    }
    window.addEventListener('load', defaultScreen, false);
    document.addEventListener('keypress', keyValue, false);
    screenVal.addEventListener('blur', allTimeActive , true);
    screenVal.addEventListener('input', test , false);
    keyboard.addEventListener('click', buttonValue, false);

    changeButton.addEventListener('click', function(){
        if (calculator.classList.contains('normal')) {
            calculator.classList.remove('normal');
        } else {
            calculator.classList.add('normal');
        }
    },false);


})();