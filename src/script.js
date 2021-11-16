import './style.css'
import * as questions from './questions/questions' 
import * as assetLoader from './assets_loader/assets_loader'
import * as controls from './character_controller/character_control'
import * as uiControl from './ui_controller/ui_controller'
import { enableBackButton, enableConfirmation, enableNextButton } from './ui_controller/ui_controller'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXExV3lCZdNl34Wy8RyODHP9ZN14Bj5xM",
  authDomain: "undp-survey.firebaseapp.com",
  projectId: "undp-survey",
  storageBucket: "undp-survey.appspot.com",
  messagingSenderId: "274504786931",
  appId: "1:274504786931:web:fc4eca9ef0ab19a3f22886",
  measurementId: "G-7WVM2PQ54C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();


//      Initializing application properties
//

export let surveyStarted = false //other modules can read this value to see if the survey has started
let showingTutorial = false;

let joystickTutorialShown = false;

let questionIndex = 0 //indicates the question to be loaded
 
let confirmedAnswers = [] //stores confirmed answers
let uiHolder = document.getElementById('ui-holder');

const timeStamps = {
    start: null,
    end: null
}

export function startSurvey(){//call this function when loading is complete
    document.getElementById('loading-container').classList.add('closed')
    surveyStarted = true;
    uiHolder.hidden = false;

    var player = assetLoader.getModel('playerCharacter')
    var playerAnimations = assetLoader.getPlayerAnimations()
    controls.setPlayer(player, playerAnimations)
    
    questions.loadQuestion(questionIndex)
    timeStamps.start = getCurrentTimeFormatted()
    console.log(timeStamps);
    //uiControl.addLangugageButtonEvents();
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
        console.log((questionIndex+1)+'/'+(numberOfQuestions));
        console.log(confirmedAnswers);
        // uiControl.paginate(questionIndex)
    }
    else if(questionIndex == numberOfQuestions - 1 ){
        // uiControl.enableSubmitPage()
        validateAnswers()
    }
}

export function loadLastQuestion(){
    const numberOfQuestions = questions.numberOfQuestions

    if (questionIndex > 0){
        questionIndex--
        questions.loadQuestion(questionIndex)
        console.log((questionIndex+1)+'/'+(numberOfQuestions));
        // uiControl.paginate(questionIndex)
    }
}

export function saveCurrentAnswer(answer){
    confirmedAnswers[questionIndex] = answer
    //console.log(confirmedAnswers)
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
    confirmedAnswers[1] = null
    questionIndex = 2
    questions.loadQuestion(questionIndex)
}

async function submitAnswers(){
    console.log('answers submitted');
    console.log(confirmedAnswers);
    timeStamps.end = getCurrentTimeFormatted()
    try {
        const docRef = await addDoc(collection(db, "answers"), {
            timeStamps:timeStamps,
            answers: confirmedAnswers
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

export function validateAnswers(){
    
    for (let i = 0; i < questions.numberOfQuestions; i++) {
        const answerIndex = confirmedAnswers[i];
        if(questions.isQuestionCompulsory(i)){
            if(answerIndex || answerIndex === 0){
                continue
            }else{
                // uiControl.disableSubmitPage()
                questionIndex = i
                questions.loadQuestion(questionIndex)
                console.log('not answered a compulsory question!');
                return
            }
        }else{
            if(answerIndex === undefined){
                confirmedAnswers[i] = null
            }
        }
    }
    submitAnswers()
}

function getCurrentTimeFormatted(){
    const currentTime = new Date()
    const date = currentTime.getDate()
    const month = currentTime.getMonth()
    const year = currentTime.getFullYear()
    const hours = currentTime.getHours()
    const minutes = currentTime.getMinutes()
    const seconds = currentTime.getSeconds()

    const formattedTimeString  = `${date}/${month+1}/${year.toString().slice(2)} - ${hours}:${minutes}:${seconds}`
    return formattedTimeString
}

//      Main JS Notes
//-Controls question index
//-Stores selected answers
//-Displays submit page and posts answers to DB
