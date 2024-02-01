console.log('is script.js on?')
var error = [];

//selector to find a form within a DOM
const firstName = document.getElementById('firstName');

const validateForm = (formSelector) => {
       const formElement = document.querySelector(formSelector);
       
       console.log('formElement',formElement)
       
      const validationOptions = [
      {
            attribute: 'required',
            isValid: (input) => input.value.trim() != '' ? true : false,
            errorMessage: (input, label)=> `${label.textContent} is required`
      }
      ]

       const validateSingleFormGroup = (formGroup) => {
            const label = formGroup.querySelector('label');
            const input = formGroup.querySelector('input', 'textarea');
            const errorContainer = formGroup.querySelector('.error');
            const errorIcon = formGroup.querySelector('.error-icon');
            const successIcon = formGroup.querySelector('.success-icon');

            for(const option of validationOptions) {
                  if (input.hasAttribute(option.attribute) && !option.isValid(input)) {
                        errorContainter.textContent = option.errorMessage(input, label);
                  }
            }

            console.log('label', label)
            console.log('input', input)
            console.log('errorContainer', errorContainer)
      }

      formElement.setAttribute('novalidate', true);

      formElement.addEventListener('submit', (event) => {
     
       event.preventDefault();
       
       alert('submit');
       console.log('submit');
       validateAllFormGroups('.formGroup');

      } ,false)



      const validateAllFormGroups = (formToValidate) => {
       const formGroups = Array.from( formToValidate.querySelectorAll('.formGroup') );

       formGroups.forEach( f => validateSingleFormGroup(f));
      }

}

validateForm('#registrationForm');


//const formGroups = Array.from( formToValidate.querySelectorAll('.formGroup') );