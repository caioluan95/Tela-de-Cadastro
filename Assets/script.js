class Validator {

    constructor() {
      this.validations = [
        'data-required',
        'data-min-length',
        'data-max-length',
        'data-only-letters',
        'data-email-validate',
        'data-password-check',
        'data-same',
      ]
    }

    validate(form) {

        let actualValidations = document.querySelectorAll('form .validation_error');
            if(actualValidations.length > 0) {
                this.cleanValidations(actualValidations);
            }

        let inputs = form.getElementsByTagName('input');
        
        let allInputs = [...inputs];

        allInputs.forEach(function(input) {
        
            for(let i = 0; this.validations.length > i; i++) {
                if(input.getAttribute(this.validations[i]) != null) {
                    let method = this.validations[i].replace('data-', '').replace('-', '');
                    let value = input.getAttribute(this.validations[i]);
                    this[method](input, value);
                }
            }

        }, this);
        
    }

    minlength(input, minValue) {
        let inputLength = input.value.length;
        let errorWarning = `Este campo requer pelo menos ${minValue} caracteres`;

        if(inputLength < minValue) {
            this.printWarning(input, errorWarning);
        }
    }

    maxlength(input, maxValue) {
        let inputLength = input.value.length;
        let errorWarning = `Este campo suporta apenas ${maxValue} caracteres`;

        if(inputLength > maxValue) {
            this.printWarning(input, errorWarning);
        }
    }

    emailvalidate(input) {
        let regex = /\S+@\S+\.\S+/;
        let email = input.value;
        let errorWarning = `Insira um e-mail no padrão fulano@email.com`;
    
        if(!regex.test(email)) {
          this.printWarning(input, errorWarning);
        }
    
    }

    onlyletters(input) {
        let regex = /^[A-Za-z]+$/;
        let inputValue = input.value;
        let errorWarning = `Este campo não aceita números e caracteres especiais`

        if (!regex.test(inputValue)) {
            this.printWarning(input, errorWarning);
        }

    }

    required(input) {

        let inputValue = input.value;
    
        if(inputValue === '') {
          let errorWarning = `Este campo é obrigatório`;
    
          this.printWarning(input, errorWarning);
        }
    }

    passwordcheck(input) {
        let passwordArray = input.value.split("");
        let uppercases = 0;
        let numbers = 0;

            for(let i = 0; passwordArray.length > i; i++) {
                if(passwordArray[i] === passwordArray[i].toUpperCase() && isNaN(parseInt(passwordArray[i]))) {
                    uppercases++;
                } else if(!isNaN(parseInt(passwordArray[i]))) {
                    numbers++;
                }
            }

            if(uppercases === 0 || numbers === 0) {
                let errorWarning = `A senha requer um caractere maiúsculo e um número`;

                this.printWarning(input, errorWarning);
            }
        }

    same(input, inputName) {
       let inputComparative = document.getElementsByName(inputName)[0];
       let errorWarning = `Este campo precisa ser igual a sua senha`;

       if(input.value != inputComparative) {
        this.printWarning(input, errorWarning);
       }
    }

    printWarning(input, msg) {
        let qtdErrors = input.parentNode.querySelector('.validation_error');

            if(qtdErrors === null) {
                let template = document.querySelector('.validation_error').cloneNode(true);
                template.textContent = msg;
                let inputParent = input.parentNode;
                template.classList.remove('template');
                inputParent.appendChild(template);
            }
    }

    cleanValidations(validations) {
        validations.forEach(el => el.remove());
    }

}

let form = document.getElementById("register_form");
let register = document.getElementById("submit_button");

let validator = new Validator();

register.addEventListener('click', function(e) {
    e.preventDefault();
    
    validator.validate(form);
})