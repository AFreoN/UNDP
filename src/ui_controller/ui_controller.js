import * as main from '../script'
import { langId, setLangId, loadQuestion } from '../questions/questions'
import { doc } from '@firebase/firestore'


//Ui control
let uiHolder = document.getElementById('ui-holder');
let menuHolder = document.getElementById('menu-holder');
menuHolder.hidden = false;

//For language selection ui
let langSelectionUI = document.getElementById('language-selection-ui');

let englishText = document.getElementById('english-text');
let sinhalaText = document.getElementById('sinhala-text');
let tamilText = document.getElementById('tamil-text');
let divehiText = document.getElementById('divehi-text');

let clickedLanguage
// clickedLanguage.classList.add('selected')
// languageSelected('en');

englishText.addEventListener('click', function() {
    if(clickedLanguage) clickedLanguage.classList.remove('selected')
    clickedLanguage = englishText
    clickedLanguage.classList.add('selected')

    languageSelected('en');
});
sinhalaText.addEventListener('click', function() { 
    if(clickedLanguage) clickedLanguage.classList.remove('selected')
    clickedLanguage = sinhalaText
    clickedLanguage.classList.add('selected')
    languageSelected('si');
});
tamilText.addEventListener('click', function() { 
    if(clickedLanguage) clickedLanguage.classList.remove('selected')
    clickedLanguage = tamilText
    clickedLanguage.classList.add('selected')
    languageSelected('ta');
});
divehiText.addEventListener('click', function(){
    if(clickedLanguage) clickedLanguage.classList.remove('selected')
    clickedLanguage = divehiText
    clickedLanguage.classList.add('selected')
    languageSelected('dv');
});



let languageScrollContainer = document.getElementById('scroll-container-language')
let languageSelectionIndicator = document.getElementById('selected-item-indicator-language')

let languageItems = document.getElementsByClassName('scroll-item')

let languageFirstChildItem = languageItems[0]
let languageLastChildItem = languageItems[languageItems.length - 1]


let languageMiddleChildrenMargin = ((languageScrollContainer.offsetHeight/2) - languageFirstChildItem.offsetHeight * 4)/3

// languageSelectorContainer.style.height = languageScrollContainer.clientHeight + 'px'

for (let i = 0; i < languageItems.length; i++) {
    const item = languageItems[i];
    item.style.marginTop = languageMiddleChildrenMargin + "px"
    resetLanguageItemStyle(item)
}

let languageEndChildrenMargin = (languageScrollContainer.clientHeight/2) - (languageFirstChildItem.offsetHeight/2)
console.log(`${languageScrollContainer.offsetHeight} /2 = ${languageScrollContainer.offsetHeight/2}` );
console.log( `${languageFirstChildItem.offsetHeight} *4 = ${languageFirstChildItem.offsetHeight*4}` );
console.log(languageMiddleChildrenMargin);


languageFirstChildItem.style.marginTop = languageEndChildrenMargin + "px"
languageLastChildItem.style.marginBottom = languageEndChildrenMargin + "px"

let languageSelectionIndicatorMargin = (languageScrollContainer.clientHeight/2) - (languageSelectionIndicator.offsetHeight/2)
// languageSelectionIndicator.style.marginTop = languageSelectionIndicatorMargin + "px"
// console.log(`${languageScrollContainer.clientHeight} /2 = ${languageScrollContainer.clientHeight/2}` );
// console.log( `${languageSelectionIndicator.offsetHeight} /2 = ${languageSelectionIndicator.offsetHeight/2}` );
// console.log(languageSelectionIndicatorMargin);

const languageItemOffset = languageMiddleChildrenMargin + languageFirstChildItem.offsetHeight 

let languageCurrentItemIndex = 0
let languageSelectedItem = languageItems[languageCurrentItemIndex]
languageScrollContainer.scrollTop = 0
setLanguageSelectedStyle(languageSelectedItem)
setLanguageNearestStyle(languageItems[languageCurrentItemIndex + 1])


var languageSelectionTimeout = null;
function onScrollLanguage(){
    languageCurrentItemIndex = Math.round(languageScrollContainer.scrollTop /languageItemOffset)  
    languageSelectedItem = languageItems[languageCurrentItemIndex]
    console.log(languageCurrentItemIndex);


    for (let i = 0; i < languageItems.length; i++) {
        const item = languageItems[i];
        resetLanguageItemStyle(item)
    }
    setLanguageSelectedStyle(languageSelectedItem)

    if(languageCurrentItemIndex === 0){
        setLanguageNearestStyle(languageItems[languageCurrentItemIndex + 1])
    }
    else if(languageCurrentItemIndex === (languageItems.length - 1) ){
        setLanguageNearestStyle(languageItems[languageCurrentItemIndex - 1])
    }
    else{
        setLanguageNearestStyle(languageItems[languageCurrentItemIndex + 1])
        setLanguageNearestStyle(languageItems[languageCurrentItemIndex - 1])
    }


    if(languageSelectionTimeout !== null) {
        clearTimeout(languageSelectionTimeout);        
    }
    languageSelectionTimeout = setTimeout(function() {
        let scrollValue = languageSelectedItem.offsetTop - languageFirstChildItem.offsetTop
        console.log(languageSelectedItem.getAttribute('data-value'))
        languageSelected(languageSelectedItem.getAttribute('data-value'))
        languageScrollContainer.scroll({
            top:scrollValue,
            behavior:'smooth'
        })
    }, 250);
}

languageScrollContainer.addEventListener('scroll',onScrollLanguage)

function resetLanguageItemStyle(langItem){
    if(langItem){
        const itemClassList = langItem.classList
        itemClassList.remove('selected','nearest')
        itemClassList.add('farthest')
    }
}

function setLanguageSelectedStyle(selectedLangItem){
    if(selectedLangItem){
        const itemClassList = selectedLangItem.classList
        itemClassList.remove('nearest','farthest')
        itemClassList.add('selected')
    }
}

function setLanguageNearestStyle(nearestLangItem){
    if(nearestLangItem){
        const itemClassList = nearestLangItem.classList
        itemClassList.remove('selected','farthest')
        itemClassList.add('nearest')
    }
}

let langClickContainer = document.getElementById('lang-container');
let languageSelectorContainer = document.getElementById('selector-container-language')

function updateAspectLanguageUI(){
    if(window.innerWidth > 480  ){
        langClickContainer.style.display = ''
        languageSelectorContainer.hidden = true 
    }else{
        langClickContainer.style.display = 'none'
        languageSelectorContainer.hidden = false 
    }
}

updateAspectLanguageUI()

window.addEventListener('resize',updateAspectLanguageUI)

// export function addLangugageButtonEvents(){
//     // englishText.addEventListener('click', languageSelected('en'));
//     // sinhalaText.addEventListener('click', languageSelected('si'));
//     // tamilText.addEventListener('click', languageSelected('ta'));
// }

function languageSelected(selectedLang){
    const minFontSize = "clamp(3vh, 3vh, 4vh)";
    const maxFontSize = "clamp(4vh, 4vh, 5vh)";

    switch(selectedLang){
        case 'en' :
            setLangId(selectedLang);
            // englishText.style.opacity = 1;
            // englishText.style.fontSize = maxFontSize;
            // sinhalaText.style.opacity = 0.5;
            // sinhalaText.style.fontSize = minFontSize;
            // tamilText.style.opacity  = 0.5;
            // tamilText.style.fontSize = minFontSize;
            // divehiText.style.opacity  = 0.5;
            // divehiText.style.fontSize = minFontSize;
            break;
        case 'si':
            setLangId(selectedLang);
            // sinhalaText.style.opacity = 1;
            // sinhalaText.style.fontSize = maxFontSize;
            // englishText.style.opacity = 0.5;
            // englishText.style.fontSize = minFontSize;
            // tamilText.style.opacity  = 0.5;
            // tamilText.style.fontSize = minFontSize;
            // divehiText.style.opacity  = 0.5;
            // divehiText.style.fontSize = minFontSize;
            break;
        case 'ta':
            setLangId(selectedLang);
            // tamilText.style.opacity = 1;
            // tamilText.style.fontSize = maxFontSize;
            // englishText.style.opacity  = 0.5;
            // englishText.style.fontSize = minFontSize;
            // sinhalaText.style.opacity = 0.5;
            // sinhalaText.style.fontSize = minFontSize;
            // divehiText.style.opacity  = 0.5;
            // divehiText.style.fontSize = minFontSize;
            break;
        case 'dv':
            setLangId(selectedLang);
            // divehiText.style.opacity = 1;
            // divehiText.style.fontSize = maxFontSize;
            // englishText.style.opacity  = 0.5;
            // englishText.style.fontSize = minFontSize;
            // sinhalaText.style.opacity = 0.5;
            // sinhalaText.style.fontSize = minFontSize;
            // tamilText.style.opacity  = 0.5;
            // tamilText.style.fontSize = minFontSize;
            break;
    }
}

//UI elements


//question answer containers
let questionContainer = document.getElementById('question-container')
let mcqAnswerContainer = document.getElementById('mcq-answer-container')// answer container holds the answer buttons for MCQ
let joystickAnswerContainer = document.getElementById('joystick-answer-container')
let countryAnswerContainer = document.getElementById('country-answer-container')
let regionAnswerContainer = document.getElementById('region-answer-container')
let joystickTutorialContainer = document.getElementById('joystick-tutorial-frame')
joystickTutorialContainer.hidden = true

let surveyProgressBar = document.getElementById("survey-progress-bar");


export function setSurveyProgressMax(maxValue){
    surveyProgressBar.max = maxValue
}
export function setSurveyProgressValue(questionIndex){
    surveyProgressBar.value = questionIndex
}

let sliderFiller = document.getElementById('Slider_Filler')
export const sliderHolder = document.getElementById('slider-holder')

setFillerWidth()
function setFillerWidth(){
    sliderHolder.hidden = true
    sliderFiller.style.width = '0%'
    sliderFiller.style.left = '0%'
}

export function SetFiller(sliderValue){
    let v = sliderValue + 50;
    if(sliderValue == 0){
        sliderFiller.style.width = '0%';
    }
    else if(sliderValue < 0){
        sliderFiller.style.width = -sliderValue + "%";
        var leftPos = 50 + parseInt(sliderValue);
        sliderFiller.style.left = leftPos + "%";
    }
    else if(sliderValue > 0){
        sliderFiller.style.width = sliderValue + "%";
        sliderFiller.style.left = '50%';
    }
}

let countrySkipContainer = document.getElementById('country-skip-container')
let submitContainer = document.getElementById('submit-container') 

//Pagination
// let countryPage_dot = document.getElementById('country_selection_dot');
// let regionPage_dot = document.getElementById('region_selection_dot');
// let question1_dot = document.getElementById('question1_dot');
// let question2_dot = document.getElementById('question2_dot');
// let question3_dot = document.getElementById('question3_dot');
// let question4_dot = document.getElementById('question4_dot');
// paginate(0);

// export function paginate(quesIndex){
//     countryPage_dot.className = 'pagination__dot';
//     regionPage_dot.className = 'pagination__dot';
//     question1_dot.className = 'pagination__dot';
//     question2_dot.className = 'pagination__dot';
//     question3_dot.className = 'pagination__dot';
//     question4_dot.className = 'pagination__dot';
//     switch(quesIndex){
//         case 0:
//             countryPage_dot.className = 'pagination__dot pagination__dot--active';
//             break;
//         case 1:
//             regionPage_dot.className = 'pagination__dot pagination__dot--active';
//             break;
//         case 2:
//             question1_dot.className = 'pagination__dot pagination__dot--active';
//             break;
//         case 3:
//             question2_dot.className = 'pagination__dot pagination__dot--active';
//             break;
//         case 4:
//             question3_dot.className = 'pagination__dot pagination__dot--active';
//             break;
//         case 5:
//             question4_dot.className = 'pagination__dot pagination__dot--active';
//             break;
//     }
// }

export const joystickSlider = document.getElementById('myRange');
export var joystickSlideValue = 0;
joystickSlider.oninput = function(){
    joystickSlideValue = joystickSlider.value;
    SetFiller(joystickSlideValue)
    enableConfirmation(parseInt(joystickSlideValue))
}


export function resetJoystickSlider(){
    joystickSlider.value = 0;
    joystickSlideValue = 0;
    SetFiller(joystickSlideValue)
}

//control buttons
let languageSelectedButton = document.getElementById('language-selected-button')
let backButton = document.getElementById('control-back-button')
let nextButton = document.getElementById('control-next-button')
let regionSkipButton = document.getElementById('country-skip-button')
let submitButton = document.getElementById('submit-button')
let joystickTutCloseButton = document.getElementById('joystick-tutorial-close-button');

let surveyStartButton = document.getElementById('survey-start-button')
surveyStartButton.disabled = true;

surveyStartButton.addEventListener('click',function(){
    main.startSurvey();
});

export function enableStartSurvey(){
    surveyStartButton.disabled = false
}

//Text elements for language swapping
let allTexts = {
    paginationDisplayText : {
        en : 'Part 1 of 4',
        si : '4 හි 1 කොටස',
        ta : 'பகுதி 1 இன் 4',
        dv : 'Part 1 of 4'
    },
    otherRegionText : {
        en : 'Other regions',
        si : 'වෙනත් කලාප',
        ta : 'பிற பகுதி',
        dv : 'Other regions'
    },
    submitButtonText : {
        en : 'Submit',
        si : 'ඉදිරිපත් කරන්න',
        ta : 'சமர்ப்பிக்கவும்',
        dv : 'Submit'
    },
    sliderDistantText : {
        en : 'Distant',
        si : 'දුරස්ථ',
        ta : 'தொலைவில்',
        dv : 'Distant'
    },
    sliderCloseText : {
        en : 'Close',
        si : 'වසන්න',
        ta : 'அருகில்',
        dv : 'Close'
    }
}

// let paginationDisplayText = document.getElementById('pagination-part-displaytext');
let otherRegionText = document.getElementById('country-skip-button');
let sliderDistantText = document.getElementById('slidertext-distant');
let sliderCloseText = document.getElementById('slidertext-close');

export function setUiText(){
    // paginationDisplayText.innerText = allTexts.paginationDisplayText[langId];
    otherRegionText.innerText = allTexts.otherRegionText[langId];
    // submitButton.innerText = allTexts.submitButtonText[langId];
    sliderDistantText.innerText = allTexts.sliderDistantText[langId];
    sliderCloseText.innerText = allTexts.sliderCloseText[langId];
}

//enabling/disabling control buttons
let canChangeQuestions = true
let canConfirmAnswer = false

let selectedAnswerIndex

export function enableQuestionControl(){
    canChangeQuestions = true
}

export function disableQuestionControl(){
    canChangeQuestions = false
}

export function enableConfirmation(selectedAnswer){
    canConfirmAnswer = true
    selectedAnswerIndex = selectedAnswer
}

export function disableConfirmation(){
    canConfirmAnswer = false
    selectedAnswerIndex = null
}

export function enableBackButton(){
    backButton.disabled = false
}

export function disableBackButton(){
    backButton.disabled = true
}

export function enableNextButton(){
    nextButton.disabled = false
}

export function disableNextButton(){
    nextButton.disabled = true
}

export function setCountryName(name){
    countryAnswerContainer.innerText = name
}

export function setRegionName(name){
    regionAnswerContainer.innerText = name
}

var selectedMcqAnswer = null

//Changes UI in respect to question type, sets the question text, and answers
export function updateUI(questionType, questionText, answers){

    if(questionType != 'joystick'){
        document.body.style.background = "linear-gradient(to top , #5f27fc, #e827fc )";
    }
    else{
        document.body.style.background = "linear-gradient(to bottom, #bb56ff 0%,#ed81f9 35%)";
    }

    questionContainer.style.display = ''
    questionContainer.innerText= questionText
    switch(questionType){
        case 'country':
            mcqAnswerContainer.style.display = 'none'
            joystickAnswerContainer.style.display = 'none'
            submitContainer.style.display = 'none'
            countryAnswerContainer.style.display = ''
            regionAnswerContainer.style.display = 'none'
            joystickTutorialContainer.style.display = 'none'
            joystickSlider.style.display = 'none'
            countryAnswerContainer.innerText = ''
            regionSkipButton.style.display = ''
            sliderHolder.hidden = true
            break;
        case 'province':
            mcqAnswerContainer.style.display = 'none' 
            joystickAnswerContainer.style.display = 'none'
            submitContainer.style.display = 'none'
            countryAnswerContainer.style.display = 'none'
            regionAnswerContainer.style.display = ''
            joystickTutorialContainer.style.display = 'none'
            joystickSlider.style.display = 'none'
            regionAnswerContainer.innerText = ''
            regionSkipButton.style.display = 'none'
            sliderHolder.hidden = true
            break;
        case 'mcq':
            mcqAnswerContainer.style.display = ''
            joystickAnswerContainer.style.display = 'none'
            submitContainer.style.display = 'none'
            countryAnswerContainer.style.display = 'none'
            regionAnswerContainer.style.display = 'none'
            joystickTutorialContainer.style.display = 'none'
            joystickSlider.style.display = 'none'
            regionSkipButton.style.display = 'none'
            mcqAnswerContainer.innerHTML = ''
            selectedMcqAnswer = null
            sliderHolder.hidden = true
            if(answers){
                for (let i = 0; i < answers.length; i++) {
                    // creating a new answer box with text and radio buttons for each in answer for MCQs
                    const answer = answers[i][langId];
                    
                    const answerRadio = document.createElement('input')
                    answerRadio.type = 'radio'
                    answerRadio.name = 'answer'
                    answerRadio.classList.add('hidden-radio')
                    answerRadio.id = `answer-${i}`

                    const answerBox = document.createElement('div')
                    answerBox.classList.add('answer-box')
                    answerBox.appendChild(answerRadio)
                    answerBox.appendChild(document.createTextNode(answer))
                    answerBox.addEventListener('click',function(){
                        answerRadio.checked = true
                        enableConfirmation(i)
                        if(selectedMcqAnswer){
                            selectedMcqAnswer.classList.remove('selected')
                            selectedMcqAnswer = null
                        }
                        selectedMcqAnswer = answerBox
                        selectedMcqAnswer.classList.add('selected')
                    })


                    mcqAnswerContainer.appendChild(answerBox)
                }
            }
            break;
        case 'joystick':
            mcqAnswerContainer.style.display = 'none'
            joystickAnswerContainer.style.display = ''
            submitContainer.style.display = 'none'
            countryAnswerContainer.style.display = 'none'
            regionAnswerContainer.style.display = 'none'
            joystickTutorialContainer.style.display = 'none'
            regionSkipButton.style.display = 'none'
            // if(main.isJoyStickTutorialDisplayed() == false){
            //     joystickTutorialContainer.style.display = ''    //Shows tutorial if it's not displayed before
            //     main.displayTutorial();
            //     disableBackButton();
            //     disableNextButton();
            //     disableConfirmation();
            // }
            // else{
            //     joystickTutorialContainer.style.display = 'none'
            // }
            joystickSlider.style.display = ''
            sliderHolder.hidden = false
            enableConfirmation(joystickSlideValue);
            break;
    }
}

// export function enableSubmitPage(){
//     submitContainer.style.display = ''
// }

// export function disableSubmitPage(){
//     submitContainer.style.display = 'none'
// }

joystickTutCloseButton.addEventListener('click', function(){
    main.joystickTutorialEnded();
    joystickTutorialContainer.style.display = 'none';
    main.enablePlayerControl();
})

backButton.addEventListener('click',function(){
    if(canChangeQuestions){
        main.loadLastQuestion()        
    }
})

nextButton.addEventListener('click',function(){
    if(canChangeQuestions){
        if(canConfirmAnswer){
            //console.log("answer confirmed")
            main.saveCurrentAnswer(selectedAnswerIndex)
        }
        main.loadNextQuestion()   
    }
})

regionSkipButton.addEventListener('click',function(){
    main.skipCountrySelection()
})

// submitButton.addEventListener('click',function(){
//     main.validateAnswers()
// })


languageSelectedButton.addEventListener('click', function(){
    loadQuestion(0);
    langSelectionUI.hidden = true;
    uiHolder.hidden = false;
})

languageSelectedButton.addEventListener('onmousedown', function(){
    console.log("Button pressed");
});
