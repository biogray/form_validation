console.log('is script.js on?')
var error = [];

//selector to find a form within a DOM
const firstName = document.getElementById('firstName');




const validateForm = (formSelector) => {
       const formElement = document.querySelector(formSelector);
       
       console.log('formElement',formElement)
       
      const validationOptions = [
        {
            attribute: 'minlength',
            isValid: input => input.value && input.value.length >= parseInt(input.minLength, 10) ? true : false,
            errorMessage: (input, label)=> `${label.textContent} needs to be at least ${input.minLength} characters`
        },
        {
            attribute: 'customMaxLength',
            isValid: input => input.value && input.value.length <= parseInt(input.getAttribute('customMaxLength'), 10) ? true : false,
            errorMessage: (input, label)=> `${label.textContent} needs to be at most ${input.getAttribute('customMaxLength')} characters`
        },
        {
            attribute: 'pattern',
            isValid: input => {
                  const patternRegex = new RegExp(input.pattern);
                  return patternRegex.test(input.value)
            },
            errorMessage: (input, label)=> `Not valid ${label.textContent}, needs to match ${input.getAttribute('pattern')} pattern`
        },
        {
            attribute: 'required',
            isValid: input => input.value.trim() != '' ? true : false,
            errorMessage: (input, label)=> `${label.textContent} is required`
        },
        {
            attribute: 'match',
            isValid: input => {
                const matchSelector = input.getAttribute('match');  //password
                const matchedElement = formElement.querySelector(`#${matchSelector}`)
                console.log('matchSelector', matchSelector)
                console.log('matchedElement', matchedElement)
               // return input.getAttribute('match') && input.value.trim() === matchedElement.value.trim() ? true : false
                return   matchedElement && input.value.trim() === matchedElement.value.trim() ? true : false
            },
            errorMessage: (input, label)=>  {
                const matchSelector = input.getAttribute('match');
                const matchedElement = formElement.querySelector(`#${matchSelector}`);
                const matchedLabel = matchedElement.parentElement.parentElement.querySelector('label') ;
                return `This ${label.textContent} should match  ${matchedLabel.textContent}`
            }
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
                      input.classList.add('border-rd-700');
                      input.classList.remove('border-green-700');
                      successIcon.classList.add('hidden');
                      errorIcon.classList.remove('hidden');
                      formGroupError=true;
                  }
            }
            if (!formGroupError) {
                  errorContainer.textContent='';
                  input.classList.add('border-green-700')
                  input.classList.remove('border-rd-700')
                  successIcon.classList.remove('hidden');
                  errorIcon.classList.add('hidden');
      }
      }


      formElement.setAttribute('novalidate', true);

      //it will give us array all of the inputs we have in a form
      Array.from(formElement.elements).forEach(element => 
        element.addEventListener('blur', event => {
            validateSingleFormGroup(event.srcElement.parentElement.parentElement)
        }));

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