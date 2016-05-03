(function () {
    'use strict';

    var screenVal = document.querySelector('.screen input'),
        keyboard = document.querySelector('.keyboard');
    
    function addValue(key){
        console.log(key)
        screenVal.value += key;
    }

    function clearScreen(){
        screenVal.value = '';
    }

    function removeLast(){
        screenVal.value = screenVal.value.slice(0, -1);
    }

    function calculate(){
        var s = screenVal.value,
            value = s.replace(/^0+/, '');
        // eliminate unuses 0
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

    function percent(){
        var value = screenVal.value,
            re = /^\d+$/;
        if (re.test(value)){
            value = value * 0.01;
            screenVal.value = value;
        }
    }

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
        screenVal.focus();
        if(e.target && e.target.nodeName === 'BUTTON'){
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
        var key = e.keyCode;
        screenVal.focus();
        if(validKeybordKey(key)){
            if (key === 61 || key === 13){
                calculate();
                e.preventDefault();
            }else if(key == 67){
                clearScreen();
            }else if(key == 53){
                percent();
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
    window.addEventListener('load', defaultScreen, false);
    document.addEventListener('keypress', keyValue, false);
    screenVal.addEventListener('blur', allTimeActive , true);
    keyboard.addEventListener('click', buttonValue, false);
 
})();