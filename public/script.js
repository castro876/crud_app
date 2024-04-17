/*let para = document.getElementsByClassName('login_error')[0];
let userform = document.getElementsByClassName('login_Form')[0];

userform.addEventListener('submit', (e) => {

  e.preventDefault()
    
const errorMessage = fetch('/login_user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ email:'test' })
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
   
   console.log(data);
   para.textContent = data
  })
  .catch(err => console.error(err));
})       const errorMessage = {
  P_empty: "Password field is not allowed to be empty",
  E_empty: "Email field is not allowed to be empty",
  validE_empty: "Please enter a valid email address",
  validP_empty: "Password length must be at least 8 characters long",
  validP_pattern: "These symbols are not supported"
};*/ 
