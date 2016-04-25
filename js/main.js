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
    }

    function calculate(){
        var value = screenVal.value;
        screenVal.value = eval(value);
    }

    function changeMark(){
        
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
            }else{
                addValue(key);
            }
        }
    }

    keyboard.addEventListener('click', keyValue, false);

})();