

let themeButton = 
  document.getElementById("theme-button");
const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
}
themeButton.addEventListener("click", toggleDarkMode);

const addSignature = (event) => {
  const fname = document.getElementById('fname');
  const homeTown = document.getElementById('homeTown');

  const signatures = document.querySelector('.signatures');
  // removes the old counter
  const oldCounter = document.getElementById('counter');
  oldCounter.remove();
  
  const newSignature = document.createElement('p');
  newSignature.textContent = "🖊️ " + `${fname.value} from ${homeTown.value} supports this.`;
  signatures.appendChild(newSignature);

  //add the new counter 
  let count = signatures.children.length;
  const newCounter = document.createElement('p');
  newCounter.id = 'counter';
  newCounter.textContent = "🖊️ " + `${count} people have signed this petition and support this cause.`;
  signatures.appendChild(newCounter);

  //event.preventDefault();
}

const validateForm = () => {
  let containsErrors = false;
  const email = document.getElementById('email');

  var petitionInputs = document.getElementById("sign-petition").elements;
  // TODO: Loop through all inputs
  for (let i = 0; i < petitionInputs.length; i++) {
    if (petitionInputs[i].value.length < 2) {
      petitionInputs[i].classList.add('error');
      containsErrors = true;
    }
    else {
      petitionInputs[i].classList.remove('error');
    }
  }
  if (containsErrors == false) {
    addSignature();
    for (let i = 0; i < petitionInputs.length; i++) {
      petitionInputs[i].value = "";
      containsErrors = false;
    }
  }
  if (!email.value.includes('.com')){
    containsErrors = true;
    email.classList.add('error');
  } else {
    email.classList.remove('error');
  }
}

let count = 3;

const form = document.getElementById('sign-petition');
const signNowButton = document.getElementById('sign-now-button');
form.addEventListener('submit',validateForm);
signNowButton.addEventListener('click', validateForm );