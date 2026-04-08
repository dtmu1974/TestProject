const headlines = [
  "I tried to catch fog yesterday. Mist.",
  "Study Finds Talking To Houseplants Still More Rewarding Than Asking For A Raise",
  "Neighborhood Celebrates After All Mail Finally Arrives On Same Day For Once",
  "Area Cat Declares It Has Owned The Porch For Centuries, Demands Tribute From Dogs",
  "Company Introduces 'Flexible Deadlines'—Employees Can Choose Which Day To Panic",
  "I asked my dog what is two minus two. He said nothing."
];

const quotes = [
  "Be yourself; everyone else is already taken. — Oscar Wilde",
  "The only way to do great work is to love what you do. — Steve Jobs",
  "Life is what happens when you're busy making other plans. — John Lennon",
  "The best way out is always through. — Robert Frost"
];

function pickRandom(arr){
  return arr[Math.floor(Math.random()*arr.length)];
}

const output = document.getElementById('output');

function getSelectedMood(){
  const el = document.querySelector('input[name="mood"]:checked');
  return el ? el.value : null;
}

function showMessage(){
  const mood = getSelectedMood();
  if(!mood){
    renderMessage('Please select Happy or Sad first.');
    return;
  }

  if(mood === 'happy'){
    const q = pickRandom(quotes);
    renderMessage(q);
  } else {
    const h = pickRandom(headlines);
    renderMessage(h);
  }
}

function renderMessage(text){
  // remove existing message node
  output.innerHTML = '';
  const div = document.createElement('div');
  div.className = 'message';
  div.textContent = text;
  output.appendChild(div);
  // trigger animation
  requestAnimationFrame(() => {
    div.classList.add('show');
    // also add bounce class to enhance effect, removed after animation
    div.classList.add('bounce');
    div.addEventListener('animationend', () => div.classList.remove('bounce'), { once: true });
  });
}

// show message when a radio changes (clicking the emoji label will toggle the radio)
const radios = document.querySelectorAll('input[name="mood"]');
radios.forEach(r => r.addEventListener('change', showMessage));

// allow activating a focused label with Enter or Space (labels are now focusable)
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter' && e.key !== ' ') return;
  const active = document.activeElement;
  if (!active) return;

  if (active.classList && active.classList.contains('emoji-label')) {
    e.preventDefault();
    const input = active.querySelector('input[name="mood"]');
    if (input) {
      input.checked = true;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }
});
