const infoP = document.getElementById('js-info')
const scoreP = document.getElementById('js-score')
const timeP = document.getElementById('js-time')
const buttonsDiv = document.getElementById('js-buttons')
const introSection = document.getElementById('js-intro')
const quizSection = document.getElementById('js-quiz')
const resultSection = document.getElementById('js-result')
const yesButton = document.getElementById('js-button-yes')
const noButton = document.getElementById('js-button-no')
const prevButton = document.getElementById('js-button-prev')
const nextButton = document.getElementById('js-button-next')
const finButton = document.getElementById('js-button-fin')
const againButton = document.getElementById('js-button-again')
const question = document.getElementById('js-question')
const answer1 = document.getElementById('js-answer-1')
const answer2 = document.getElementById('js-answer-2')
const answer3 = document.getElementById('js-answer-3')
const answer4 = document.getElementById('js-answer-4')
const radios = document.querySelectorAll('input[type="radio"]')
const radio1 = document.getElementById('js-radio-1')
const radio2 = document.getElementById('js-radio-2')
const radio3 = document.getElementById('js-radio-3')
const radio4 = document.getElementById('js-radio-4')
let data, questions, counter, time_minutes
let choices = []
let index = 0
let score = 0;

(() => {
  buttonsDiv.style.display = 'none'
  resultSection.style.display = 'none'

  let getJSON = (() => {
    let request = new XMLHttpRequest()
    request.open('GET', 'https://cdn.rawgit.com/kdzwinel/cd08d08002995675f10d065985257416/raw/811ad96a0567648ff858b4f14d0096ba241f28ef/quiz-data.json', true)
    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        data = JSON.parse(request.responseText)
        counter = data.questions.length
        console.log(data)
        questions = data.questions
        prepareQuiz()
        startQuiz() // TEMP!!!!!!!!!!!!!!!!!!!!!!!!
        introSection.style.display = 'none' ////!!!!!!!!!!!!!!!!TYMCZASOWE

      } else {
        infoP.textContent = `Coś poszło nie tak. Spróbuj ponownie!`
      }
    }
    request.onerror = () => infoP.textContent = 'Coś poszło nie tak'
    request.send()
  })()

  function prepareQuiz () {
    // Info about the quiz
    time_minutes = data['time_seconds'] / 60
    infoP.textContent = `Na rozwiązanie quizu będziesz mieć ${time_minutes} minut. 
To jak, zaczynamy?`

    // Start-or-not buttons
    buttonsDiv.style.display = 'block'

    yesButton.addEventListener('click', () => startQuiz())
    noButton.addEventListener('click', () => {
      infoP.textContent = `Co w takim razie tu robisz?`
      noButton.style.display = 'none'
      yesButton.textContent = `ok, zaczynam`
    })

    // Previous/next buttons
    prevButton.addEventListener('click', () => {
      saveAnswer()
      index--
      loadQuestion()
      checkForAnswer()
    })
    nextButton.addEventListener('click', () => {
      saveAnswer()
      index++
      loadQuestion()
      checkForAnswer()
    })
    // See results button
    finButton.addEventListener('click', () => finishQuiz())
  }

  function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (timer < 11) timeP.classList.add('shake');

      if (--timer < 0) {
        finishQuiz()
        timer = duration;
      }
    }, 1000);
  }

  function startQuiz () {
    introSection.style.display = 'none'
    startTimer(50, timeP);
    loadQuestion()
  }

  function saveAnswer () {
    if (radio1.checked) {
      choices[index] = 0
    } else if (radio2.checked) {
      choices[index] = 1
    } else if (radio3.checked) {
      choices[index] = 2
    } else if (radio4.checked) {
      choices[index] = 3
    } else {
      choices[index] = -1 // user didn't answer
    }
  }

  function checkForAnswer () {
    // Checking if user has already answered the question
    let choice = choices[index]
    switch (choice) {
      case 0:
        radio1.checked = true
        break
      case 1:
        radio2.checked = true
        break
      case 2:
        radio3.checked = true
        break
      case 3:
        radio4.checked = true
        break
      default:
        for (let i = 0; i < radios.length; i++) {   // if not, all radios are unchecked
          radios[i].checked = false
        }
    }
  }

  function loadQuestion () {
    // Hiding prev/next button when not needed
    index < 1 ? prevButton.style.visibility = 'hidden' : prevButton.style.visibility = 'visible'
    if (index > 7) {
      nextButton.style.display = 'none'
      finButton.style.display = 'inline-block'
    } else {
      finButton.style.display = 'none'
      nextButton.style.display = 'inline-block'
    }
    // Getting current question
    question.textContent = questions[index].question
    answer1.textContent = questions[index].answers[0].answer
    answer2.textContent = questions[index].answers[1].answer
    answer3.textContent = questions[index].answers[2].answer
    answer4.textContent = questions[index].answers[3].answer
  }

  function finishQuiz () {
    saveAnswer()
    quizSection.style.display = 'none'
    compareAnswers()
    displayResult()
  }

  function compareAnswers () {
    // Checking answer for every question
    for (let i = 0; i < counter; i++) {
      let choice = choices[i]
      if (choice >= 0) {  // checking only if user answered this question
        questions[i].answers[choice].correct ? score++ : score;
      }
    }
  }

  function displayResult () {
    resultSection.style.display = 'block'
    switch (score) {
      case  9:
        scoreP.textContent = `Odpowiedziałeś/-aś dobrze na wszystkie pytania!`;
        break;
      case 8:
      case 7:
      case 6:
      case 5:
        scoreP.textContent = `Świetnie Ci poszło, masz aż ${score} punktów!`;
        break;
      case 4:
      case 3:
      case 2:
        scoreP.textContent = `Zdobyłeś/-aś ${score} punkty`
        break;
      case 1:
        scoreP.textContent = `Udało Ci się dobrze odpowiedzieć na jedno pytanie`;
        break;
      case 0:
        scoreP.textContent = `Niestety nie zdobyłeś/-aś żadnego punktu`
        break;
    }

  }
})()