const infoP = document.getElementById("js-info");
const buttonsDiv = document.getElementById("js-buttons");
let yesButton, noButton;

(() => {
let getJSON = (() => {
  let request = new XMLHttpRequest();
  request.open('GET', 'https://cdn.rawgit.com/kdzwinel/cd08d08002995675f10d065985257416/raw/811ad96a0567648ff858b4f14d0096ba241f28ef/quiz-data.json', true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      let data = JSON.parse(request.responseText);
      console.log(data);

      let time_minutes = data['time_seconds']/60;
      infoP.textContent = `Na rozwiązanie quizu będziesz mieć ${time_minutes} minut. 
To jak, zaczynamy?`;
      prepareQuiz();

    } else {
      infoP.textContent = `There was an error in loading quiz questions.
      Plase try again later`;
    }
  };
  request.onerror = () => infoP.textContent = "There was a connection error";
  request.send();
})();

function prepareQuiz() {
  yesButton = document.createElement("button");
  yesButton.className = 'sg-button-primary sg-button-primary--alt-inverse sg-button-primary--yes';
  yesButton.textContent = 'Tak!';
  noButton = document.createElement("button");
  noButton.className = 'sg-button-primary sg-button-primary--alt-inverse sg-button-primary--no';
  noButton.textContent = 'Nie';
  buttonsDiv.appendChild(yesButton);
  buttonsDiv.appendChild(noButton);

  yesButton.addEventListener('click', ()=> startQuiz());
  noButton.addEventListener('click', ()=> {
    infoP.textContent = `Co w takim razie tu robisz?`
    noButton.style.display = 'none';
    yesButton.textContent = `ok, zaczynam`;
  });
}

  function startQuiz() {
    infoP.style.display = 'none'
    buttonsDiv.removeChild(yesButton);
    buttonsDiv.removeChild(noButton);
  }
})();