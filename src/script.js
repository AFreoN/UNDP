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

import backButtonImg from '../static/arrow_back.png'

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
export let isDebugging = true
let showingTutorial = false

let joystickTutorialShown = false;

export let questionIndex = 0 //indicates the question to be loaded
export function setQuestionIndex(value){
    questionIndex = value
}
 
export let confirmedAnswers = [] //stores confirmed answers
let uiHolder = document.getElementById('ui-holder');

let hasWatchedVideos = true
let resultKey = ''

export function setHasWatchedVideos(boolVal){
    hasWatchedVideos = boolVal
    console.log(hasWatchedVideos);
}

export function setResultKey(string){
    resultKey = string
}

export function getResultKey(){
    return resultKey 
}

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
    var outline = assetLoader.getModel('playerOutline')
    var outlineAnimation = assetLoader.getOtherCharacterAnimations('playerOutline')
    controls.setPlayer(player, playerAnimations, outline, outlineAnimation)
    
    questions.loadQuestion(questionIndex)
    timeStamps.start = getCurrentTimeFormatted()
    console.log(timeStamps);

    // assetLoader.loadPostModels()

    if(isDebugging == false)
        uiControl.qInputField.style.display = 'none'
    //uiControl.addLangugageButtonEvents();
    //Call any functions related to starting the survey (setting up the first scene etc..)
}
//console.log("url = ", document.URL + "adventurer.html")

export function isSurveyStarted(){
    return surveyStarted;
}

//document.getElementsByTagName('meta')["og:image"].content = url('../static/undp_fb_logo.png');

export function loadNextQuestion(){
    const numberOfQuestions = questions.numberOfQuestions
    if (questionIndex < (numberOfQuestions - 1)){
        questionIndex++
        questions.loadQuestion(questionIndex)
        console.log((questionIndex+1)+'/'+(numberOfQuestions));
        //console.log(confirmedAnswers);
        // uiControl.paginate(questionIndex)
    }
    else if(questionIndex == numberOfQuestions - 1 ){
        uiControl.enableSubmitPage()
        // validateAnswers()
    }
}

export function loadLastQuestion(){
    const numberOfQuestions = questions.numberOfQuestions

    if (questionIndex > 0){
        questionIndex--
        questions.loadQuestion(questionIndex)
        console.log((questionIndex+1)+'/'+(numberOfQuestions));
        // uiControl.paginate(questionIndex)
    }else if (questionIndex === 0){
        uiControl.enableVidQuestionPage()
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
    if(questionIndex < questions.qArray.length - 1){
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
    const confirmedAnswersStartingPortion = confirmedAnswers.slice(0,2)
    const confirmedAnswersConvertedAboutQuestion = [parseInt(confirmedAnswers[2].age) ,parseInt(confirmedAnswers[2].gender)]
    const confirmedAnswersEndingPortion = confirmedAnswers.slice(3)
    const modifiedConfirmedAnswers = confirmedAnswersStartingPortion.concat(confirmedAnswersConvertedAboutQuestion.concat(confirmedAnswersEndingPortion))
    console.log(modifiedConfirmedAnswers);
    timeStamps.end = getCurrentTimeFormatted()
    try {
        const docRef = await addDoc(collection(db, "answers"), {
            hasWatchedVideos: hasWatchedVideos,
            timeStamps:timeStamps,
            answers: modifiedConfirmedAnswers
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
                uiControl.disableSubmitPage()
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

    const noOfQuestionForLoc = 7;
    let currentQuestionID = 28;
    let locArray = []
    for(let i = 0; i < noOfQuestionForLoc; i++){
        const answerIndex = confirmedAnswers[currentQuestionID+i];
        locArray[i] = answerIndex;
        console.log("Stage 3, Question ", (parseInt(i) + 1), " -> answer = ", answerIndex);
    }
    var finalValue = parseInt(locArray[0]) + parseInt(locArray[1]) + parseInt(locArray[2]) + 
                        parseInt(locArray[3]) + parseInt(locArray[4]) 
                        - parseInt(locArray[5]) - parseInt(locArray[6]) + 16;
    //console.log("Final value = ", finalValue);
    console.log("LOD formula = ", "a1 + a2 + a3 + a4 + a5 - a6 - a7 + 16");
    console.log("LOD = ", locArray[0],"+",locArray[1],"+",locArray[2],"+",locArray[3],"+",
                    locArray[4],"-",locArray[5],"-",locArray[6],"+",16," = ", finalValue);

    if(finalValue >= 31 && finalValue <= 49){       //prev 42 to 49
        uiControl.updateResultTitle(2);
    }
    else if(finalValue >= 20 && finalValue <= 30){   //prev 15 to 42
        uiControl.updateResultTitle(1);
    }
    else if(finalValue <= 19){       //prev less than 15
        uiControl.updateResultTitle(0);
    }
    submitAnswers()
}

function getCurrentTimeFormatted(){
    const currentTime = new Date()
    const date = addZeroToSingleDigitNumber(currentTime.getDate())
    const month = addZeroToSingleDigitNumber(currentTime.getMonth())
    const year = currentTime.getFullYear()
    const hours = addZeroToSingleDigitNumber(currentTime.getHours())
    const minutes = addZeroToSingleDigitNumber(currentTime.getMinutes())
    const seconds = addZeroToSingleDigitNumber(currentTime.getSeconds())

    const formattedTimeString  = `${date}/${month}/${year.toString().slice(2)} - ${hours}:${minutes}:${seconds}`
    return formattedTimeString
}

function addZeroToSingleDigitNumber(number){
    return ('0'+number).slice(-2);
}

//      Main JS Notes
//-Controls question index
//-Stores selected answers
//-Displays submit page and posts answers to DB
