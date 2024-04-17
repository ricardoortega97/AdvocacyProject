let themeButton = 
  document.getElementById("theme-button");
const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
}
themeButton.addEventListener("click", toggleDarkMode);

let learnMoreBtn = document.getElementById("learnMoreBtn");
learnMoreBtn.addEventListener("click", function() {
  window.location.href = "learnMore.html"; });

const addSignature = (person) => {
  // Create a new paragraph element for the signature
  const newSignature = document.createElement('p');
  newSignature.id = 'newSignature';
  newSignature.textContent = `🖊️ ${person.name} from ${person.hometown} supports this cause.`;

  // Add the new signature element to the existing 'signatures' container
  const signaturesContainer = document.querySelector(".signatures");
  signaturesContainer.appendChild(newSignature);

  // Remove the old counter
  const oldCounter = document.getElementById('counter');
  oldCounter.remove();

  // Add the new counter
  let count = signaturesContainer.children.length;
  const newCounter = document.createElement('p');
  newCounter.id = 'counter';
  newCounter.textContent = `🖊️ ${count} people have signed this petition and support this cause.`;
  signaturesContainer.appendChild(newCounter);
}

const validateForm = () => {
  let containsErrors = false;
  let petitionInputs = document.getElementById("sign-petition").elements;
  let person = {
    name: petitionInputs[0].value, //accesses and saves value of the first input
    hometown: petitionInputs[1].value, //accesses and saves value of the second input
    email: petitionInputs[2].value //accesses and saves value of the third input
  };

  if (person.name.length < 2) {
    petitionInputs[0].classList.add('error');
    containsErrors = true;
  } else {
    petitionInputs[0].classList.remove('error');
  }

  if (person.hometown.length < 2) {
    petitionInputs[1].classList.add('error');
    containsErrors = true;
  } else {
    petitionInputs[1].classList.remove('error');
  }
  if(!person.email.includes('.com')){
    containsErrors = true;
    petitionInputs[2].classList.add('error');
  } else{
    petitionInputs[2].classList.remove('error');
  }
  
  if (containsErrors === false) {
    addSignature(person);
    toggleModal(person)
    for (let i = 0; i < petitionInputs.length; i++){
      petitionInputs[i].value = "";
      containsErrors = false;
    }
  }
}

let count = 3;

const form = document.getElementById('sign-petition');
const signNowButton = document.getElementById('sign-now-button');
form.addEventListener('submit',validateForm);
signNowButton.addEventListener('click', validateForm);

let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '3s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease'
}

let revealableContainers = document.querySelectorAll('.revealable');
function reveal() {
  for (let i = 0; i < revealableContainers.length; i++){
    let windowHeight = window.innerHeight;
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;
      if(topOfRevealableContainer < windowHeight - animation.revealDistance){
      revealableContainers[i].classList.add('active');
      } else {
      revealableContainers[i].classList.remove('active');
      }
  }
}

window.addEventListener('scroll', reveal)
/* Toggole motion between */ 
let reduceMotionButton = document.getElementById('reduce-motion');
let isMotionReduced = false;
function toggleMotion() {
  if(isMotionReduced) {
    animation.transitionDuration = '3s';
    animation.transitionProperty = 'all';
    animation.transitionTimingFunction = 'ease';
    for (let i = 0; i < revealableContainers.length; i++) {
        revealableContainers[i].style.transition = `${animation.transitionDuration} ${animation.transitionProperty} ${animation.transitionTimingFunction}`;
      }
    } else {
      animation.transitionDuration = '0s';
      animation.transitionProperty = 'none';
      animation.transitionTimingFunction = 'linear';
      for (let i = 0; i < revealableContainers.length; i++) {
        revealableContainers[i].style.transition = '0s none linear';
      }
    }
  isMotionReduced = !isMotionReduced;
}

reduceMotionButton.addEventListener('click', toggleMotion);

const toggleModal = (person) => { 
  let modal = document.getElementById("thanks-modal");
  let modalContent = document.getElementById("thanks-modal-content");
  
  modal.style.display = "flex";
  modalContent.textContent = `Thank you so much ${person.name}!`;

  let intervalId = setInterval(scaleImage, 500);
  
  setTimeout(() => {
    modal.style.display = "none";
    clearInterval(intervalId); 
  }, 4000)
}
let scaleFactor = 1;
let modalImage = document.getElementById("modal-image")
let scaleImage = () => {
  scaleFactor = scaleFactor === 1 ? 0.8 : 1;
  modalImage.style.transform = `scale(${scaleFactor})`;
  //is the scale factor 1? if so, set it to 0.8. if not, set it to 1 
}

let closeBtn = document.getElementById("close-modal");
let closeButton = () => {
  let modal = document.getElementById("thanks-modal");
  modal.style.display = "none";
}
closeBtn.addEventListener("click", closeButton);
