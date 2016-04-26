(function () {
    'use strict';

    var screenVal = document.querySelector('.screen input'),
        keyboard = document.querySelector('.keyboard');



    function addValue(key){
        screenVal.value += key;
        console.log(typeof(screenVal.value));
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
    function keyValue(e){
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

    keyboard.addEventListener('click', keyValue, false);

})();