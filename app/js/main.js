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
let data, counter, time_minutes;
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
    index--;
    loadQuestion();
  })
  nextButton.addEventListener('click', () => {
    index++;
    loadQuestion();
  })
}

  function startQuiz() {
    introSection.style.display = 'none';
    loadQuestion();
  }

  function loadQuestion() {
    index < 1 ? prevButton.style.visibility = 'hidden' : prevButton.style.visibility = 'visible';
    question.textContent = data.questions[index].question;
    answer1.textContent = data.questions[index].answers[0].answer;
    answer2.textContent = data.questions[index].answers[1].answer;
    answer3.textContent = data.questions[index].answers[2].answer;
    answer4.textContent = data.questions[index].answers[3].answer;

  }
})();