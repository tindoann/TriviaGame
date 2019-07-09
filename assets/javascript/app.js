let counter = 30; 
let currentQuestion = 0; 
let score = 0; 
let lost = 0; 
let timer; 

const loadQuestion = () => {
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

loadQuestion(); 
