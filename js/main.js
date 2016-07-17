(function () {
    'use strict';

    var screenVal = document.querySelector('.screen input'),
        calculator = document.querySelector('.calculator'),
        keyboard = document.querySelector('.keyboard'),
        changeButton = document.querySelector('.change'),
        buttons = keyboard.querySelectorAll('button');
    
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
    function percent(){
        var value = screenVal.value,
            percentNumReg = /\d+(?=%)/g,
            percentNum = value.match(percentNumReg);
        return percentNum;
    }
    function calculatePercent(arr){
    //zbieram tablice i zamieniam liczby na koncu regexpem wyciagam wszystkie procenty i podmieniam  
    }
    function validKeybordKey(el){
        var allowKey = [
            48,49,50,51,52,53,54,55,56,57,58, //numbers
            42,43,61,45,46, //operators
            13,37,66,67];
        if(allowKey.indexOf(el) !== -1){
            return true;
        }else{
            return false;
        }
    }
    function turnOnAnimation(el){
        el.classList.add('button-click');
        el.addEventListener('animationend', function(){
            el.classList.remove('button-click');
        }, false);
    }
    function buttonValue(e){
        var key = e.target.innerHTML;
        turnOnAnimation(e.target);
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
                percent();
            }else{
                addValue(key);
            }
        }
    }
    function keyValue(e){
        screenVal.focus();
        var key = e.keyCode,
            letter = String.fromCharCode(key);
        function bindLetter(el){
            var arrButtons = Array.prototype.slice.call(buttons),
                htmlLetter;
            arrButtons.forEach( function(e) {
                htmlLetter = e.innerHTML;
                if (el === htmlLetter){
                    turnOnAnimation(e);
                }
            });
        }
        bindLetter(letter);
        //if allowed key
        if(validKeybordKey(key)){
            if (key === 61 || key === 13){
                calculate();
                //no add "=" to input
                e.preventDefault();
            }else if(key === 67){
                clearScreen();
                //no add C to input
                e.preventDefault();
            }else if(key === 53){
                // percent();
            }else if(key === 66){
                removeLast();
                //no add B to input
                e.preventDefault();
            }
        }else{
            //no add unvalid letter o number to input
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
    function validateKey(){
        var output = validateValue(screenVal.value);
        screenVal.value = output;

    }
    window.addEventListener('load', defaultScreen, false);
    document.addEventListener('keypress', keyValue, false);
    screenVal.addEventListener('blur', allTimeActive , true);
    screenVal.addEventListener('input', validateKey , false);
    keyboard.addEventListener('click', buttonValue, false);
    changeButton.addEventListener('click', function(){
        if (calculator.classList.contains('normal')) {
            calculator.classList.remove('normal');
        } else {
            calculator.classList.add('normal');
        }
    },false);


})();