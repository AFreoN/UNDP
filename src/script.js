import './style.css'
import * as questions from './questions/questions' 
import * as assetLoader from './assets_loader/assets_loader'
import * as controls from './character_controller/character_control'

//      Initializing application properties
//
let surveyStarted = false //other modules can read this value to see if the survey has started

let questionIndex = 0 //indicates the question to be loaded
 
let confirmedAnswers = [] //stores confirmed answers

export function startSurvey(){//call this function when loading is complete
    document.getElementById('loading-container').classList.add('closed')
    surveyStarted = true
    
    questions.loadQuestion(questionIndex)
    var player = assetLoader.getModel('playerCharacter')
    var playerAnimations = assetLoader.getPlayerAnimations()

    controls.setPlayer(player, playerAnimations)
    //Call any functions related to starting the survey (setting up the first scene etc..)
}

export function isSurveyStarted(){
    return surveyStarted;
}

export function loadNextQuestion(){
    const numberOfQuestions = questions.numberOfQuestions
    if (questionIndex < (numberOfQuestions - 1)){
        questionIndex++
        questions.loadQuestion(questionIndex)
    }
}

export function loadLastQuestion(){
    if (questionIndex > 0){
        questionIndex--
        questions.loadQuestion(questionIndex)
    }
}

export function saveCurrentAnswer(answer){
    confirmedAnswers[questionIndex] = answer
    console.log(confirmedAnswers)
}
//
//      end of Initializing application properties
export function getSelectedCountry(){
    return confirmedAnswers[0]
}

//      Main JS Notes
//-Controls question index
//-Stores selected answers
//-Displays submit page and posts answers to DB
