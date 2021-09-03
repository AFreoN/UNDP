import * as main from '../script'

//Ui control


//UI elements

//question answer containers
let questionContainer = document.getElementById('question-container')
let mcqAnswerContainer = document.getElementById('mcq-answer-container')// answer container holds the answer buttons for MCQ

//control buttons
let backButton = document.getElementById('control-back-button')
let nextButton = document.getElementById('control-next-button')
let okButton = document.getElementById('control-ok-button')

//enabling/disabling control buttons
let canChangeQuestions = true
let canConfirmAnswer = false

export function enableQuestionControl(){
    canChangeQuestions = true
}

export function disableQuestionControl(){
    canChangeQuestions = false
}

//Changes UI in respect to question type, sets the question text, and answers
export function updateUI(questionType, questionText, answers){
    questionContainer.style.display = 'initial'
    questionContainer.innerText= questionText
    switch(questionType){
        case 'mcq':
            mcqAnswerContainer.style.display = 'initial'
            mcqAnswerContainer.innerHTML = ''
            if(answers !== null){
                for (let i = 0; i < answers.length; i++) {
                    // creating a new answer box with text and radio buttons for each in answer for MCQs
                    const answer = answers[i];
                    
                    const answerRadio = document.createElement('input')
                    answerRadio.type = 'radio'
                    answerRadio.name = 'answer'
                    answerRadio.id = `answer-${i}`

                    const answerBox = document.createElement('div')
                    answerBox.classList.add('answer-box')
                    answerBox.appendChild(answerRadio)
                    answerBox.appendChild(document.createTextNode(answer))

                    mcqAnswerContainer.appendChild(answerBox)
                }
            }
            break;
        case 'joystick':
            mcqAnswerContainer.style.display = 'none'
            break;
    }
}

backButton.addEventListener('click',function(){
    if(canChangeQuestions){
        main.loadLastQuestion()        
    }
})

nextButton.addEventListener('click',function(){
    if(canChangeQuestions){
        main.loadNextQuestion()        
    }
})

