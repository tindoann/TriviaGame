// Create question array 
$(document).ready(() => {

  const triviaQuestions = [{

    question: "Which rival king attempted to take King's Landing during the Battle of the Blackwater?",
    options: ["Ser Beric Dondarrion", "Ser Meryn Trant", "Ser Ilyn Payne"],
    correct: "Ser Beric Dondarrion"
  }, {

    question: ["In which city does Arya Stark train to become a Faceless Man?"],
    options: ["Pentos", "Braavos", "Meereen"],
    correct: "Braavos"
  }, {

    question: ["What is the name of the royal executioner who beheaded Eddard Stark for treason?"],
    options: ["Ser Beric Dondarrion", "Ser Ilyn Payne", "Ser Meryn Trant"],
    correct: "Ser Meryn Trant"

  }, {
    question: ["Who helped Sansa Stark escape King's Landing after King Joffrey's death?"],
    options: ["Dontos Hollard", "Eddison Tollett", "Vardis Egen"],
    correct: "Dontos Hollard"
  }, {
    question: ["Who is Lord Commander of the Kingsguard at the beginning of Game of Thrones?"],
    options: ["Sandor Clegane", "Gerold Clegane", "Oberyn Martell"],
    correct: "Sandor Clegane"
  }, {
    question: ["Who delivered the fatal blow to the King-in-the North, Robb Stark?"],
    options: ["Alliser Thorne", "Alder Frey", "Roose Bolton"],
    correct: "Roose Bolton"
  }, {
    question: ["Who was the Mad King's firstborn son?"],
    options: ["Aemon Targaryen", "Aegon Targaryen", "Rhaegar Targaryen"],
    correct: "Rhaegar Targaryen"
  }, {
    question: ["How many times has Sansa Stark been married?"],
    options: ["1", "2", "3"],
    correct: "2"
  }];

  // Declare global variables 
  let counter = 15;
  let currentQuestion = 0;
  let score = 0;
  let lost = 0;
  let timer;

  // Logic to move to next question and stop 
  const newQuestion = () => {
    const isQuestionOver = (triviaQuestions.length - 1) === currentQuestion;
    if (isQuestionOver) {
      console.log("reset")
      finalScore();
    } else {
      currentQuestion++;
      loadQuestion();
    }
  }

  // Sets timer to clear and increment lost count
  const timesUp = () => {
    clearInterval(timer);
    lost++
    newQuestion();
  }

  // Sets timer to go down 
  const decrement = () => {
    counter--;
    $('#time').html('Timer: ' + counter);
    if (counter === 0) {
      timesUp();
    }
  }

  // Set up timer to countdown and displays questions 
  const loadQuestion = () => {
    counter = 15;
    timer = setInterval(decrement, 1000);

    let question = triviaQuestions[currentQuestion].question;
    let options = triviaQuestions[currentQuestion].options;

    $('#time').html('Timer: ' + counter);
    $('#game').html(`
    <div>${question}</div>
    ${loadOptions(options)}
    `);
  }

  // Creates the options 
  const loadOptions = (options) => {
    let result = '';

    for (let i = 0; i < options.length; i++) {
      result += `<p class="option" data-answer="${options[i]}">${options[i]}</p>`;
    }
    return result;
  }

  // Move to the next question and increment wins and lost
  $(document).on('click', '.option', function () {
    console.log('click')
    clearInterval(timer);
    const selectedAnswer = $(this).attr('data-answer');
    console.log(selectedAnswer)
    const correctAnswer = triviaQuestions[currentQuestion].correct;

    if (correctAnswer === selectedAnswer) {
      score++;
      newQuestion();
    } else {
      lost++;
      newQuestion();
    }
  });

    // Begin the game and removes 'start' button
    $('#begin').click(() => {
      $('#begin').remove();
      $('#time').html(counter);
      loadQuestion();
    })

  // Display final score and remove timer
  const finalScore = () => {
    const result = `
    <p>Correct: ${score}</p>
    <p>Incorrect: ${lost}</p>
   `;
    $('#game').html(result);
    $('#time').empty();
  }


});