const infoP = document.getElementById("js-info");
const buttonsDiv = document.getElementById("js-buttons");
const introSection = document.getElementById("js-intro");
const yesButton = document.getElementById("js-button-yes");
const noButton = document.getElementById("js-button-no");
const prevButton = document.getElementById("js-button-prev");
const nextButton = document.getElementById("js-button-next");
const question = document.getElementById("js-question");
const answer1 = document.getElementById("js-answer-1");
const answer2 = document.getElementById("js-answer-2");
const answer3 = document.getElementById("js-answer-3");
const answer4 = document.getElementById("js-answer-4");
const radio1 = document.getElementById("js-radio-1");
const radio2 = document.getElementById("js-radio-2");
const radio3 = document.getElementById("js-radio-3");
const radio4 = document.getElementById("js-radio-4");
let data, counter, time_minutes;
let choices = [];
let index = 0;

(() => {
  buttonsDiv.style.display = 'none';

let getJSON = (() => {
  let request = new XMLHttpRequest();
  request.open('GET', 'https://cdn.rawgit.com/kdzwinel/cd08d08002995675f10d065985257416/raw/811ad96a0567648ff858b4f14d0096ba241f28ef/quiz-data.json', true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      data = JSON.parse(request.responseText);
      counter = data.questions.length;
      console.log(data);
      prepareQuiz();
      startQuiz(); // TEMP!!!!!!!!!!!!!!!!!!!!!!!!
      introSection.style.display = 'none'; ////!!!!!!!!!!!!!!!!TYMCZASOWE

    } else {
      infoP.textContent = `Coś poszło nie tak. Spróbuj ponownie!`;
    }
  };
  request.onerror = () => infoP.textContent = "Coś poszło nie tak";
  request.send();
})();

function prepareQuiz() {
  // Info about the quiz
  time_minutes = data['time_seconds'] / 60;
  infoP.textContent = `Na rozwiązanie quizu będziesz mieć ${time_minutes} minut. 
To jak, zaczynamy?`;

  // Start-or-not buttons
 buttonsDiv.style.display = 'block';

  yesButton.addEventListener('click', () => startQuiz());
  noButton.addEventListener('click', () => {
    infoP.textContent = `Co w takim razie tu robisz?`
    noButton.style.display = 'none';
    yesButton.textContent = `ok, zaczynam`;
  });

  // Previous/next buttons
  prevButton.addEventListener('click', () => {
    saveAnswer();
    index--;
    loadQuestion();
  })
  nextButton.addEventListener('click', () => {
    saveAnswer();
    index++;
    loadQuestion();
  })
}

  function startQuiz() {
    introSection.style.display = 'none';
    loadQuestion();
  }

  function saveAnswer() {

      if(radio1.checked){
        choices[index] = 0;
      } else if(radio2.checked) {
        choices[index] = 1;
      } else if(radio3.checked) {
        choices[index] = 2;
      } else if(radio4.checked) {
        choices[index] = 3;
      } else {
        choices[index] = -1; // user didn't answer
      }
  }

  function loadQuestion() {
    index < 1 ? prevButton.style.visibility = 'hidden' : prevButton.style.visibility = 'visible';
    index > 7 ? nextButton.style.visibility = 'hidden' : nextButton.style.visibility = 'visible';
    question.textContent = data.questions[index].question;
    answer1.textContent = data.questions[index].answers[0].answer;
    answer2.textContent = data.questions[index].answers[1].answer;
    answer3.textContent = data.questions[index].answers[2].answer;
    answer4.textContent = data.questions[index].answers[3].answer;
  }
})();