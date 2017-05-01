(() => {
const infoP = document.getElementById("js-info");


let getJSON = (() => {
  let request = new XMLHttpRequest();
  request.open('GET', 'https://cdn.rawgit.com/kdzwinel/cd08d08002995675f10d065985257416/raw/811ad96a0567648ff858b4f14d0096ba241f28ef/quiz-data.json', true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      let data = JSON.parse(request.responseText);
      console.log(data);

      let time_minutes = data['time_seconds']/60;
      infoP.textContent = `You'll have ${time_minutes} minutes to finish this quiz. 
Do you want to start?`;
      prepareQuiz();

    } else {
      infoP.textContent = `There was an error in loading quiz questions.
      Plase try again later`;
    }
  };
  request.onerror = () => infoP.textContent = "There was a connection error";
  request.send();
})();



})();