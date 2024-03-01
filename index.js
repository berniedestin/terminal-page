const textInput = document.getElementById('text-input');
const cursor = document.getElementById('cursor');
const history = document.getElementById('output-div');
let input = ''
let errorArray = [];

document.addEventListener('keydown',(event)=>{
    const keyValue = event.key;

    if(keyValue.length === 1){
        input += keyValue;
        if(keyValue === ' '){
            cursor.innerHTML = "&nbsp;";
        }else{
            cursor.innerText = keyValue;
        }
        textInput.innerText = input.substring(0, input.length -1);
        // if(cursor.innerHTML !== '&nbsp;'){
        //     cursor.innerText = keyValue;
        // }else{
        //     cursor.innerHTML = keyValue;
        //     textInput.innerText = command.substring(0, command.length -1);
        // }
    }else if(keyValue === "Backspace"){
        if(input.length >= 1){
            input = input.substring(0, input.length -1);
            if(input.substring(input.length -1) === " " || input.length === 0){
                cursor.innerHTML = "&nbsp;";
            }else{
                cursor.innerText = input.substring(input.length -1);
            }
            textInput.innerText = input.substring(0, input.length -1);
            
        }
    }else if(keyValue === "Enter"){
        const output = document.createElement('pre');
        output.innerText = input;
        history.appendChild(output);
        let response = processCommand(input);
        if(response === 'error'){
            const errMsg = document.createElement('pre');
            errMsg.innerText = errorArray[errorArray.length-1];
            history.appendChild(errMsg);
        }else if(response === 'clear'){
            history.innerHTML = '';
        }else{
            const result = document.createElement('pre');
            result.innerText = response;
            history.appendChild(result);
        }
        
        input = '';
        textInput.innerText = input;
        cursor.innerHTML = '&nbsp;'

    }
    
});

function processCommand(str){
    let arr = str.split(' ');
    if(arr[0] === 'clear'){
        return 'clear';
    }else if(arr[0] === 'add'){
        arr.shift()
        return add(arr);
    }else{
        errorArray.push('--invalid command')
        return 'error';
    }
}

function add(...numbers){
    let addArray = [];
    numbers[0].forEach((arg)=>{
        if(!isNaN(Number(arg))){
            addArray.push(Number(arg));
        }
    });
    if(addArray.length >0){
        return addArray.reduce((total,value)=>{
            return total + value;
        });
    } else {
        errorArray.push('--invalid arguments')
        return 'error';
    }
}

