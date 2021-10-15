import './style.css'
import * as questions from './questions/questions' 
import * as assetLoader from './assets_loader/assets_loader'
import * as controls from './character_controller/character_control'
import { enableBackButton, enableConfirmation, enableNextButton } from './ui_controller/ui_controller'

//      Initializing application properties
//
let surveyStarted = false //other modules can read this value to see if the survey has started
let showingTutorial = false;

let joystickTutorialShown = false;

let questionIndex = 0 //indicates the question to be loaded
 
let confirmedAnswers = [] //stores confirmed answers

export function startSurvey(){//call this function when loading is complete
    document.getElementById('loading-container').classList.add('closed')
    surveyStarted = true
    
    questions.loadQuestion(questionIndex)
    var player = assetLoader.getModel('playerCharacter')
    var playerAnimations = assetLoader.getPlayerAnimations()

    var otherCharacter = assetLoader.getModel('centerCharacter')
    var otherAnimations = assetLoader.getOtherCharacterAnimations()

    controls.setPlayer(player, playerAnimations)
    controls.setOtherCharacter(otherCharacter, otherAnimations)
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

export function isJoyStickTutorialDisplayed(){
    return joystickTutorialShown;
}

export function joystickTutorialEnded(){
    joystickTutorialShown = true;
    console.log("Ques index = " + questionIndex);
    if(questionIndex > 0){
        enableBackButton();
    }
    if(questionIndex < questions.questionArray.length - 1){
        enableNextButton();
    }
    showingTutorial = false;
}

export function enablePlayerControl(){
    controls.enablePlayerControl();
}

export function displayTutorial(){
    showingTutorial = true;
}
export function isShowingTutorial(){
    return showingTutorial;
}

export function skipCountrySelection(){
    confirmedAnswers[0] = 2
    questionIndex = 2
    questions.loadQuestion(questionIndex)

}

//      Main JS Notes
//-Controls question index
//-Stores selected answers
//-Displays submit page and posts answers to DB
