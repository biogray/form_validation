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
            const errorContainer = formGroup.querySelector('.error'); console.log('errorContainer',errorContainer.textContent )
            
            const errorIcon = formGroup.querySelector('.error-icon');
            const successIcon = formGroup.querySelector('.success-icon');

            let formGroupError = false;
            for(const option of validationOptions) {
                  //errorContainer.textContent = ''; my simpler solution
                  if (input.hasAttribute(option.attribute) && !option.isValid(input)) {
                       errorContainer.textContent = option.errorMessage(input, label) ;
                      console.log('errorContainer',errorContainer.textContent )
                      formGroupError=true;
                  }
            }
            if (!formGroupError) {errorContainer.textContent=''}

           
            
      }

      formElement.setAttribute('novalidate', true);

      formElement.addEventListener('submit', (event) => {
     
       event.preventDefault();
       
     
       console.log('submit');
       validateAllFormGroups('.formGroup');

      } ,false)



      const validateAllFormGroups = (formToValidate) => {
       const formGroups = Array.from( document.querySelectorAll(formToValidate) );

       formGroups.forEach( f => validateSingleFormGroup(f));
      }

}

validateForm('#registrationForm');


//const formGroups = Array.from( formToValidate.querySelectorAll('.formGroup') );