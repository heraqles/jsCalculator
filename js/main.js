(function () {
    'use strict';

    var screenVal = document.querySelector('.screen input'),
        keyboard = document.querySelector('.keyboard');



    function addValue(key){
        screenVal.value += key;
    }

    function clearScreen(){
        screenVal.value = '';
    }

    function removeLast(){
        screenVal.value = screenVal.value.slice(0, -1);
        console.log(typeof(screenVal.value));
    }

    function calculate(){
        //parseInt eliminate unuses 0
        var s = screenVal.value,
            value = s.replace(/^0+/, '');
            console.log(typeof(screenVal.value));
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
    function buttonValue(e){
        var key = e.target.innerHTML;
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
        var keyChar = String.fromCharCode(e.keyCode),
            key = e.keyCode;
        if(keyChar === '='){
            calculate();
        }else if (keyChar === 'c'){
            clearScreen();
        }else if (key === 8){
            removeLast();
        }else{
            addValue(keyChar);
        }
    }

    keyboard.addEventListener('click', buttonValue, false);
    document.addEventListener('keyup', keyValue, false);

})();