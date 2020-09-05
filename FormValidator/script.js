const form = document.getElementById('form');
const username = document.getElementById('username');
const password = document.getElementById('password');
const repassword = document.getElementById('repassword');
const email = document.getElementById('email');

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(email.value)){
        succes(email);
    }else{
        error(email, 'Invalid email addres')
    }
    //return re.test(String(email).toLowerCase());
}

function error(input,message) {
    input.className = 'form-control is-invalid';
    const div = input.nextElementSibling;
    div.innerText = message;
    div.className = 'invalid-feedback'
};

function succes(input) {
    input.className = 'form-control is-valid'
}

function checkRequired(inputs) {
    inputs.forEach(input => {
        if(input.value === ''){
            error(input,`${input.id} must be filled out.`)
        }else{
            succes(input)
        }
    });
};

function checkLength(input,min,max){
    if(input.value.length < min){
        error(input, `${input.id} at least ${min} character`)
    }else if(input.value.length > max){
        error(input, `${input.id} at most ${max} character`)
    }else{
        succes(input);
    }
};

function checkPhone(input){
    let phoneno = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/
    if (!phoneno.test(input.value)) {
        error(input, 'Invalid phone number')
    }else{
        succes(input);
    };
};

function checkPasswords(input1,input2){
    if (input1.value === input2.value) {
        succes(password);
        succes(repassword);
    } else {
        error(input1, 'Passwords do not match.');
        error(input2, 'Passwords do not match.');
    }
}

form.addEventListener('submit', function(e){
    e.preventDefault();
    checkRequired([username,email,password,repassword,phone]);
    validateEmail(email);
    checkLength(username,4,16);
    checkPasswords(password,repassword);
    checkLength(password,6,999);
    checkPhone(phone)
    
});

