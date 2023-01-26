const finalScore = document.querySelector('#finalScore');
const finalScore2 = document.querySelector('#finalScore2');

const mostRecentScore = localStorage.getItem('mostRecentScore');
const mostRecentScore2 = localStorage.getItem('mostRecentScore2');

finalScore.innerText = mostRecentScore;
finalScore2.innerText = mostRecentScore2;
