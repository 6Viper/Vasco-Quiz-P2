const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const incorrectText = document.querySelector('#score2');


let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let reducescore = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "Which player has scored the most goals playing for Vasco da Gama?",
        choice1: "Romario",
        choice2: "Edmundo",
        choice3: "Vava",
        choice4: "Roberto Dinamite",
        answer: 4,
    },
    {
        question: "In 2000, Vasco made one of the most famous cameback in history of Brazilian Football, after loosing from 3x0, Vasco cameback to score 4  goals, which team did Vasco played against?",
        choice1: "Flamengo",
        choice2: "Sao Paulo",
        choice3: "Palmeiras",
        choice4: "Corinthias",
        answer: 3,
    },
    {
        question: "When did Vasco made his debut in Football against Paladino F.C..?",
        choice1: "May 1st, 1917",
        choice2: "May 3rd, 1916",
        choice3: "May 3rd, 1917",
        choice4: "May 1st, 1916",
        answer: 2,
    },
    {
        question: "What does it mean the white diagnoal strip from Vasco emblem?",
        choice1: "Stetics",
        choice2: "Division between seas",
        choice3: "The path discovered by Explorer Vasco da Gama towards India",
        choice4: "Explorer Vasco da Gama emblem",
        answer: 3,
    },
    {
        question: "Vasco was the first football team in Rio de Janeiro to have black, brown and poor players in his team. In what year did Vasco refused to disppute a championship as a manifest?",
        choice1: "1922",
        choice2: "1923 ",
        choice3: "1962",
        choice4: "1933",
        answer: 2,
    }
]

const SCORE_POINTS = 1
const MAX_QUESTIONS = 5

function startGame() {
    questionCounter = 0
    score = 0
    reducescore = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

function getNewQuestion() {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        localStorage.setItem('mostRecentScore2', reducescore)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(function (choice) {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(function (choice) {
    choice.addEventListener('click', function (e) {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
  
        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        } else if(classToApply === 'incorrect') {
            reduceScore(SCORE_POINTS)
        }    

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(function() {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

function incrementScore(num) {
    score +=num
    scoreText.innerText = score
} 

function reduceScore(num) {
    reducescore +=num
    incorrectText.innerText = reducescore
}

startGame()