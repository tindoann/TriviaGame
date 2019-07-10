// Create question array 

const quizQuestions = [{

  question: "Which rival king attempted to take King's Landing during the Battle of the Blackwater?",
  options: ["Ser Beric Dondarrion", "Ser Meryn Trant", "Ser Ilyn Payne"],
  correct: 0
}, {

  question: ["In which city does Arya Stark train to become a Faceless Man?"], 
  options: ["Pentos", "Braavos", "Meereen"], 
  correct: 1
}, {

  question: ["What is the name of the royal executioner who beheaded Eddard Stark for treason?"], 
  options: ["Ser Beric Dondarrion", "Ser Ilyn Payne", "Ser Meryn Trant"], 
  correct: 2

}, {
 question: ["Who helped Sansa Stark escape King's Landing after King Joffrey's death?"], 
 options: ["Dontos Hollard", "Eddison Tollett", "Vardis Egen"], 
 correct: 0
}, {
 question: ["Who is Lord Commander of the Kingsguard at the beginning of Game of Thrones?"], 
 options: ["Sandor Clegane", "Gerold Clegane", "Oberyn Martell"], 
 correct: 0
}, {
 question: ["Who delivered the fatal blow to the King-in-the North, Robb Stark?"], 
 options: ["Alliser Thorne", "Alder Frey", "Roose Bolton"], 
 correct: 2
}, {
 question: ["Who was the Mad King's firstborn son?"], 
 options: ["Aemon Targaryen", "Aegon Targaryen", "Rhaegar Targaryen"], 
 correct: 2
}, {
 question: ["How many times has Sansa Stark been married?"], 
 options: ["1", "2", "3"], 
 correct: 1
}]; 

// Declare global variables 

let counter = 30; 
let currentQuestion = 0; 
let score = 0; 
let lost = 0; 
let timer; 
// 30 second countdown timer

const nextQuestion = () => {
  const isQuestionOver = (quizQuestions.length - 1) === currentQuestion;  
  if (isQuestionOver) {
    console.log("reset")
    finalScore(); 
  } else {
    currentQuestion++; 
    loadQuestion(); 
  }
}

const timesUp = () => {
  clearInterval(timer); 
  lost++
  nextQuestion(); 
}

const countDown = () => {
  counter--; 

  $('#time').html('Timer: ' + counter); 

  if (counter === 0) {
    timesUp(); 
  }
}
const loadQuestion = () => {
  counter = 3; 
  timer = setInterval(countDown, 1000); 

  let question = quizQuestions[currentQuestion].question;
  let options = quizQuestions[currentQuestion].options;

$('#time').html('Timer: ' + counter); 
$('#game').html(`
<div>${question}</div>
${loadOptions(options)}
`); 
}

const loadOptions = (options) => {
  let result = ''; 

  for (let i = 0; i < options.length; i++) {
    result += `<p class="option" data-answer="${options[i]}">${options[i]}</p>`; 
  }
  return result; 
}

// Move to the next question

$(document).on('click', 'option', function() {
  clearInterval(timer); 
  const selectedAnswer = $(this).attr('data-answer'); 
  const correctAnswer = quizQuestions[currentQuestion].correctAnswer;
  
  if (correctAnswer === selectedAnswer) {
    score++; 
    nextQuestion(); 
  } else {
    lost++; 
    nextQuestion(); 
  }
});

const finalScore = () => {
  const result = `
    <p>Correct: ${score}</p>
    <p>Incorrect: ${lost}</p>
   `;
  $('#game').html(result); 
}
 
$('#begin').click(() => {
  $('#begin').remove(); 
  $('#time').html(counter); 
  loadQuestion(); 
}); 
