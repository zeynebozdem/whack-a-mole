var score = 0;
var finalScore;
var randomMole;
var isClicked;
var td;
var randomId;
var startAppFunction;
var scoreList = [];
const finalScoreLocalStorageKey = "finalScore";
var timeLeft;
var images = document.getElementsByTagName("img");
//var moleVisibility=document.getElementsByTagName('img').style.visibility;
document.addEventListener("DOMContentLoaded", function (event) {
    var data = localStorage.getItem(finalScoreLocalStorageKey);
    if (data) {
        scoreList = JSON.parse(data);
        print();
    }
});

function startGame() {
    document.getElementById('score-field').innerHTML = "Score: 0";
    countdown(1);
    score = 0;

    startAppFunction = setInterval(main, 1700);

}

function clearCache() {
    localStorage.clear(finalScoreLocalStorageKey);
    location.reload();
}

function moleClicked() {
    if (!isClicked) {
        score++;
        isClicked = true;
    }

    document.getElementById('score-field').innerHTML = "Score:" + "   " + score;
}

/*function whackTheMole(mole){
   
    if(mole.id=randomMole.id && !isClicked && images[mole.id].style.display != "none"){

            score++;
        isClicked=true;
     
        
    }
    document.getElementById('score-field').innerHTML=score;

}*/
var moleActive = [];

function main() {
    td = document.getElementsByClassName('board');
    randomId = Math.floor(Math.random() * td.length);
    setTimeout(function () {
        randomMole = td[randomId];
        images[randomId].style.display == "block" ? images[randomId].style.display = "none" :
            images[randomId].style.display = "block";

        isClicked = false;

        setTimeout(function () {
            images[randomId].style.display = "none";
            moleActive = false;
        }, 800);

    }, 800);
}

function countdown(minutes) {
    var seconds = 30;
    var mins = minutes;

    function tick() {
        timeLeft = document.getElementById('time-left');
        var current_minutes = mins - 1;
        seconds--;
        timeLeft.innerHTML = "Time Left: " + " " + (seconds < 10 ? "" : "") + String(seconds);
        if (seconds > 0) {
            setTimeout(tick, 1000);
        } else if (seconds == 0) {
            clearTimeout(startAppFunction);
            finalScore = score;
            gameOver();
            timeLeft.innerHTML = "Süre Doldu!!";
             
        } else {
            setTimeout(mins - 1);
        }
    }
    
   tick();
}

function gameOver() {
    scoreList.push(score);
    localStorage.setItem(finalScoreLocalStorageKey, JSON.stringify(scoreList));
    print();
}

function print() {
    var printScore = document.getElementById('previous-scores');
    printScore.innerHTML = "";
    scoreList.forEach((i) => {
        printScore.innerHTML = printScore.innerHTML + "<li>" + i + "</li>";
    });
}
