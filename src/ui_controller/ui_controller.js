import * as main from '../script'
import { langId, setLangId, loadQuestion, numberOfQuestions,enableSubmitScene } from '../questions/questions'
import { doc } from '@firebase/firestore'


//Ui control
let uiHolder = document.getElementById('ui-holder');
let menuHolder = document.getElementById('questions-menu-holder');
menuHolder.hidden = false;

//For language selection ui
let langSelectionUI = document.getElementById('language-selection-ui');

let englishText = document.getElementById('english-text');
let sinhalaText = document.getElementById('sinhala-text');
let tamilText = document.getElementById('tamil-text');
let divehiText = document.getElementById('divehi-text');

let clickedLanguage = englishText
window.addEventListener('load',initLanguage)

function initLanguage(){
    clickedLanguage.classList.add('selected')
    languageSelected('en');
    window.removeEventListener('load',initLanguage)
}

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

let languageItems = document.getElementsByClassName('scroll-item-language')

let languageFirstChildItem = languageItems[0]
let languageLastChildItem = languageItems[languageItems.length - 1]

let languageItemOffset
function languageCalculateMargins(){
    let languageMiddleChildrenMargin = ((languageScrollContainer.offsetHeight/2) - languageFirstChildItem.offsetHeight * 4)/3

    // languageSelectorContainer.style.height = languageScrollContainer.clientHeight + 'px'
    
    for (let i = 0; i < languageItems.length; i++) {
        const item = languageItems[i];
        item.style.marginTop = languageMiddleChildrenMargin + "px"
        resetLanguageItemStyle(item)
    }
    
    let languageEndChildrenMargin = (languageScrollContainer.clientHeight/2) - (languageFirstChildItem.offsetHeight/2)
    // console.log(`${languageScrollContainer.offsetHeight} /2 = ${languageScrollContainer.offsetHeight/2}` );
    // console.log( `${languageFirstChildItem.offsetHeight} *4 = ${languageFirstChildItem.offsetHeight*4}` );
    // console.log(languageMiddleChildrenMargin);
    
    
    languageFirstChildItem.style.marginTop = languageEndChildrenMargin + "px"
    languageLastChildItem.style.marginBottom = languageEndChildrenMargin + "px"
    
    let languageSelectionIndicatorMargin = (languageScrollContainer.clientHeight/2) - (languageSelectionIndicator.offsetHeight/2)
    // languageSelectionIndicator.style.marginTop = languageSelectionIndicatorMargin + "px"
    // console.log(`${languageScrollContainer.clientHeight} /2 = ${languageScrollContainer.clientHeight/2}` );
    // console.log( `${languageSelectionIndicator.offsetHeight} /2 = ${languageSelectionIndicator.offsetHeight/2}` );
    // console.log(languageSelectionIndicatorMargin);
    
    languageItemOffset = languageMiddleChildrenMargin + languageFirstChildItem.offsetHeight

    for (let i = 0; i < languageItems.length; i++) {
        const item = languageItems[i];
        resetLanguageItemStyle(item)
    }

    setLanguageSelectedStyle(languageItems[0])
    setLanguageNearestStyle(languageItems[1])

    languageScrollContainer.scroll({
        top:0,
        behavior:'smooth'
    })


}

languageCalculateMargins()

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

window.addEventListener('load',updateAspectLanguageUI)

window.addEventListener('resize',updateAspectLanguageUI)
window.addEventListener('resize',languageCalculateMargins)

export const qInputField = document.getElementById('questionID')
document.addEventListener('keydown', function(event) {
    if(event.key == "l") {
        if(main.isDebugging == false)
            return

        if(main.questionIndex >= 3){
            const q = parseInt(qInputField.value) - 1
            if(q >= 3 && q <= 42){
                main.setQuestionIndex(q)
                loadQuestion(q)
            }
        }
    }
})

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

    setUiText()
}

let vidQuestionUI = document.getElementById('video-question-container')

let vidQuestionScrollContainer = document.getElementById('scroll-container-video-question')
let vidQuestionSelectionIndicator = document.getElementById('selected-item-indicator-video-question')

let vidQuestionItems = document.getElementsByClassName('scroll-item-video-question')

let vidQuestionFirstChildItem = vidQuestionItems[0]
let vidQuestionLastChildItem = vidQuestionItems[vidQuestionItems.length - 1]

let vidQuestionItemOffset 
function vidQuestionCalculateMargins(){
    let vidQuestionMiddleChildrenMargin = ((vidQuestionScrollContainer.offsetHeight/2) - vidQuestionFirstChildItem.offsetHeight * 3)

    // vidQuestionSelectorContainer.style.height = vidQuestionScrollContainer.clientHeight + 'px'
    
    for (let i = 0; i < vidQuestionItems.length; i++) {
        const item = vidQuestionItems[i];
        item.style.marginTop = vidQuestionMiddleChildrenMargin + "px"
        resetVidQuestionItemStyle(item)
    }
    
    let vidQuestionEndChildrenMargin = (vidQuestionScrollContainer.clientHeight/2) - (vidQuestionFirstChildItem.offsetHeight/2)
    // console.log(`${vidQuestionScrollContainer.offsetHeight} /2 = ${vidQuestionScrollContainer.offsetHeight/2}` );
    // console.log( `${vidQuestionFirstChildItem.offsetHeight} *4 = ${vidQuestionFirstChildItem.offsetHeight*4}` );
    // console.log(vidQuestionMiddleChildrenMargin);
    
    
    vidQuestionFirstChildItem.style.marginTop = vidQuestionEndChildrenMargin + "px"
    vidQuestionLastChildItem.style.marginBottom = vidQuestionEndChildrenMargin + "px"
    
    let vidQuestionSelectionIndicatorMargin = (vidQuestionScrollContainer.clientHeight/2) - (vidQuestionSelectionIndicator.offsetHeight/2)
    // vidQuestionSelectionIndicator.style.marginTop = vidQuestionSelectionIndicatorMargin + "px"
    // console.log(`${vidQuestionScrollContainer.clientHeight} /2 = ${vidQuestionScrollContainer.clientHeight/2}` );
    // console.log( `${vidQuestionSelectionIndicator.offsetHeight} /2 = ${vidQuestionSelectionIndicator.offsetHeight/2}` );
    // console.log(vidQuestionSelectionIndicatorMargin);
    
    vidQuestionItemOffset = vidQuestionMiddleChildrenMargin + vidQuestionFirstChildItem.offsetHeight 

    for (let i = 0; i < vidQuestionItems.length; i++) {
        const item = vidQuestionItems[i];
        resetVidQuestionItemStyle(item)
    }

    setVidQuestionSelectedStyle(vidQuestionItems[0])
    setVidQuestionNearestStyle(vidQuestionItems[1])

    vidQuestionScrollContainer.scroll({
        top:0,
        behavior:'smooth'
    })
}
vidQuestionCalculateMargins()


let vidQuestionCurrentItemIndex = 0
let vidQuestionSelectedItem = vidQuestionItems[vidQuestionCurrentItemIndex]
vidQuestionScrollContainer.scrollTop = 0
setVidQuestionSelectedStyle(vidQuestionSelectedItem)
setVidQuestionNearestStyle(vidQuestionItems[vidQuestionCurrentItemIndex + 1])


var vidQuestionSelectionTimeout = null;
function onScrollvidQuestion(){
    vidQuestionCurrentItemIndex = Math.round(vidQuestionScrollContainer.scrollTop /vidQuestionItemOffset)  
    vidQuestionSelectedItem = vidQuestionItems[vidQuestionCurrentItemIndex]
    console.log(vidQuestionCurrentItemIndex);


    for (let i = 0; i < vidQuestionItems.length; i++) {
        const item = vidQuestionItems[i];
        resetVidQuestionItemStyle(item)
    }
    setVidQuestionSelectedStyle(vidQuestionSelectedItem)

    if(vidQuestionCurrentItemIndex === 0){
        setVidQuestionNearestStyle(vidQuestionItems[vidQuestionCurrentItemIndex + 1])
    }
    else if(vidQuestionCurrentItemIndex === (vidQuestionItems.length - 1) ){
        setVidQuestionNearestStyle(vidQuestionItems[vidQuestionCurrentItemIndex - 1])
    }
    else{
        setVidQuestionNearestStyle(vidQuestionItems[vidQuestionCurrentItemIndex + 1])
        setVidQuestionNearestStyle(vidQuestionItems[vidQuestionCurrentItemIndex - 1])
    }


    if(vidQuestionSelectionTimeout !== null) {
        clearTimeout(vidQuestionSelectionTimeout);        
    }
    vidQuestionSelectionTimeout = setTimeout(function() {
        let scrollValue = vidQuestionSelectedItem.offsetTop - vidQuestionFirstChildItem.offsetTop
        console.log(vidQuestionSelectedItem.getAttribute('data-value'))
        // vidQuestionSelected(vidQuestionSelectedItem.getAttribute('data-value'))
        main.setHasWatchedVideos(convertStringToBool(vidQuestionSelectedItem.getAttribute('data-value')))
        vidQuestionScrollContainer.scroll({
            top:scrollValue,
            behavior:'smooth'
        })
    }, 250);
}

vidQuestionScrollContainer.addEventListener('scroll',onScrollvidQuestion)
window.addEventListener('resize',vidQuestionCalculateMargins)



function resetVidQuestionItemStyle(vidQuestionItem){
    if(vidQuestionItem){
        const itemClassList = vidQuestionItem.classList
        itemClassList.remove('selected','nearest')
        itemClassList.add('farthest')
    }
}

function setVidQuestionSelectedStyle(selectedVidQuestionItem){
    if(selectedVidQuestionItem){
        const itemClassList = selectedVidQuestionItem.classList
        itemClassList.remove('nearest','farthest')
        itemClassList.add('selected')
    }
}

function setVidQuestionNearestStyle(nearestVidQuestionItem){
    if(nearestVidQuestionItem){
        const itemClassList = nearestVidQuestionItem.classList
        itemClassList.remove('selected','farthest')
        itemClassList.add('nearest')
    }
}

function convertStringToBool(string){
    return string.toLowerCase() === 'true'
}

function setVidQuestionLang(){
    const langTexts = {
        question:{
            en:'Have you watched all Extreme Lives videos?',
            si:'ඔබ Extreme Lives වීඩියෝ සියල්ලම නරඹා තිබේද?',
            ta:'Extreme Lives வீடியோக்கள் அனைத்தையும் பார்த்திருக்கிறீர்களா?',
            dv:'Have you watched all extreme lives videos?',
        },
        answers:{
            yes:{
                en:'Yes',
                si:'ඔව්',
                ta:'ஆம்',
                dv:'Yes',
            },
            no:{
                en:'No',
                si:'නැත',
                ta:'இல்லை',
                dv:'No',
            }
        }
        
    }
    
    document.getElementById('video-question-text-container').innerText =  langTexts.question[langId]
    for (let i = 0; i < vidQuestionItems.length; i++) {
        const item = vidQuestionItems[i];
        if(item.getAttribute('data-value') === 'true'){
            item.innerText = langTexts.answers.yes[langId]
        } else{
            item.innerText = langTexts.answers.no[langId]
        }
    }
}


//set language text for link page 
function setLinksPageLang(){
    const langTexts = {
        emailPlaceholder:{
            en:'Your Email',
            si:'ඔබේ විද්යුත් තැපැල් ලිපිනය',
            ta:'உங்கள் மின்னஞ்சல்',
            dv:'your email',
        },
        moreResources:{
            en:'More Resources',
            si:'තවත් සම්පත්',
            ta:'மேலும் வளங்கள்',
            dv:'More Resources',
        },
        additionalResources:{
            en:'Additional resources that may help you',
            si:'ඔබට උපකාර විය හැකි අමතර සම්පත්',
            ta:'உங்களுக்கு உதவக்கூடிய கூடுதல் வளங்கள்',
            dv:'Additional resources that may help you',
        },
        submit:{
            en:'submit',
            si:'ඉදිරිපත් කරන්න',
            ta:'சமர்ப்பிக்க',
            dv:'submit',
        },
        addResource1:{
            en:'How to check if your friends are doing OK?',
            si:'ඔබේ මිතුරන් හොඳින් දැයි පරීක්ෂා කරන්නේ කෙසේද?',
            ta:'உங்கள் நண்பர்கள் நன்றாக இருக்கிறார்களா என்பதை எப்படிச் சரிபார்க்கலாம்?',
            dv:'How to check if your friends are doing OK?',
        },
        addResource2:{
            en:'How to have a difficult conversation and get the desired end results',
            si:'දුෂ්කර සංවාදයක් පවත්වා අපේක්ෂිත අවසාන ප්රතිඵල ලබා ගන්නේ කෙසේද',
            ta:'கடினமான உரையாடலை நடத்துவது மற்றும் விரும்பிய முடிவைப் பெறுவது எப்படி',
            dv:'How to have a difficult conversation and get the desired end results',
        },
        addResource3:{
            en:'Affirmation and self-help, meditation and mindfulness',
            si:'තහවුරු කිරීම සහ ස්වයං උපකාරය, භාවනාව සහ සිහිය',
            ta:'உறுதிப்பாடு மற்றும் சுய உதவி, தியானம் மற்றும் நினைவாற்றல்',
            dv:'Affirmation and self-help, meditation and mindfulness',
        },
        addResource4:{
            en:'How to get involved in volunteering',
            si:'ස්වේච්ඡා සේවයට සම්බන්ධ වන්නේ කෙසේද?',
            ta:'தன்னார்வத் தொண்டுகளில் ஈடுபடுவது எப்படி',
            dv:'How to get involved in volunteering',
        },
    }

    document.getElementById('links-email-input').placeholder = langTexts.emailPlaceholder[langId]
    document.getElementById('additional-resources-grid-header').innerText = langTexts.moreResources[langId]
    document.getElementById('additional-resources-list-header').innerText = langTexts.additionalResources[langId]
    document.getElementById('links-email-submit-button').innerText = langTexts.submit[langId]
    document.getElementById('additional-resources-list-item-text-1').innerText = langTexts.addResource1[langId]
    document.getElementById('additional-resources-list-item-text-2').innerText = langTexts.addResource2[langId]
    document.getElementById('additional-resources-list-item-text-3').innerText = langTexts.addResource3[langId]
    document.getElementById('additional-resources-list-item-text-4').innerText = langTexts.addResource4[langId]

}

//UI elements


//question answer containers
let questionContainer = document.getElementById('question-container')
let aboutAnswerContainer = document.getElementById('about-answer-container')// answer container holds the answer buttons for MCQ
let joystickAnswerContainer = document.getElementById('joystick-answer-container')
let countryAnswerContainer = document.getElementById('country-answer-container')
let regionAnswerContainer = document.getElementById('region-answer-container')
let joystickTutorialContainer = document.getElementById('joystick-tutorial-frame')
let likert5Container = document.getElementById('likert5-wrapper')
let likert4Container = document.getElementById('likert4-wrapper')
let likert7Container = document.getElementById('likert7-wrapper')
let resultTitle = document.getElementById('results-header-container')
let linkResultTitle = document.getElementById('links-result-header-container')
joystickTutorialContainer.hidden = true

let surveyProgressBar = document.getElementById("survey-progress-bar");

const agrees = document.getElementsByName('likert5-checker');
agrees.forEach(buttons => {
    buttons.addEventListener('change', function(event){
        main.saveCurrentAnswer(event.target.value)
        enableConfirmation(event.target.value)
        //console.log("Agree value = ", event.target.value);
    })
});

const agrees4 = document.getElementsByName('likert4-checker');
agrees4.forEach(buttons => {
    buttons.addEventListener('change', function(event){
        main.saveCurrentAnswer(event.target.value)
        enableConfirmation(event.target.value)
        //console.log("Agree value = ", event.target.value);
    })
});

const agrees7 = document.getElementsByName('likert7-checker');
agrees7.forEach(buttons => {
    buttons.addEventListener('change', function(event){
        main.saveCurrentAnswer(event.target.value)
        enableConfirmation(event.target.value)
        //console.log("Agree value = ", event.target.value);
    })
});


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
let submitConfirmationContainer = document.getElementById('submit-confirmation-container')
let resultsConfirmationContainer = document.getElementById('submit-results-container')
let linksPageContainer = document.getElementById('links-page-container')

export const joystickSlider = document.getElementById('sliderRange');
export var joystickSlideValue = 0;

joystickSlider.oninput = function(){
    SetSliderFillerAndAnswer();
}

export function SetSliderFillerAndAnswer(){
    joystickSlideValue = joystickSlider.value;
    SetFiller(joystickSlideValue)
    let convertedValue = Math.round((parseInt(joystickSlideValue)+50)/14.2857) 
    enableConfirmation(convertedValue)
    //console.log(`${(parseInt(joystickSlideValue)+50)} / 14.2857 = ${convertedValue}`);
}


export function resetJoystickSlider(){
    joystickSlider.value = 0;
    joystickSlideValue = 0;
    SetFiller(joystickSlideValue)
}

//control buttons
let languageSelectedButton = document.getElementById('language-selected-button')
let vidQuestionButton = document.getElementById('video-question-close-button')
let vidQuestionBackButton = document.getElementById('video-question-back-button')
let backButton = document.getElementById('control-back-button')
let nextButton = document.getElementById('control-next-button')
let regionSkipButton = document.getElementById('country-skip-button')
let submitButton = document.getElementById('submit-button')
let submitBackButton = document.getElementById('submit-control-back-button')
let resultsMoreButton = document.getElementById('results-more-button')
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
        en : 'Other',
        si : 'වෙනත් කලාප',
        ta : 'பிற பகுதி',
        dv : 'Other'
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
    },
    submitConfirmationTitleText: {
        en:'You have completed the quiz',
        si:'ඔබ ප්‍රශ්නාවලිය සම්පූර්ණ කර ඇත',
        ta:'வினாடி வினாவை முடித்துவிட்டீர்கள்',
        dv:'You have completed the quiz',
    },
    submitConfirmationSubText: {
        en:'submit to see your results!',
        si:'ඔබගේ ප්‍රතිඵල බැලීමට ඉදිරිපත් කරන්න!',
        ta:'உங்கள் முடிவுகளைப் பார்க்க சமர்ப்பிக்கவும்!',
        dv:'submit to see your results!',
    },
    resultsConfirmationFooterText:{
        en:'Share with your friends! <br> And let them know...',
        si:'ඔබේ මිතුරන් සමඟ බෙදාගන්න! <br> ඒ වගේම එයාලව දැනුවත් කරන්න...',
        ta:'உங்கள் நண்பர்களுடன் பகிர்ந்து கொள்ளுங்கள்! <br> அவர்களுக்குத் தெரியப்படுத்துங்கள்...',
        dv:'Share with your friends! <br> And let them know...',
    },
    resultsMoreButtonText:{
        en:'See More',
        si:'තව බලන්න',
        ta:'மேலும் பார்க்க',
        dv:'See More',
    },
    stronglyDisagree : {
        en : 'Strongly Disagree',
        si : 'එකඟ නොවේ',
        ta : 'முரண்படுகிறோம்',
        dv : 'Strongly Disagree'
    },
    stronlgyAgree : {
        en : 'Strongly Agree',
        si : 'එකඟයි',
        ta : 'ஒப்புக்கொள்கிறேன்',
        dv : 'Strongly Agree'
    },
    resultTitle : [
        {
            en : 'You are the Change Seeker or You are the Palm Reader',
            si : 'ඔබ තමයි වෙනස්කම් නිර්මාණය කරන්නා  or ඔබ තමයි අනාගතය දකින්නා',
            ta : 'நீங்கள்தான் ஒரு மாற்றத்தை உருவாக்குபவர்  or நீங்கள்தான் எதிர்காலத்தை கணிக்கக்கூடியவர்',
            dv : ''
        },
        {
            en : 'You are the Map Maker',
            si : 'ඔබ තමයි සිතියම් සකසන්නා ',
            ta : 'நீங்கள்தான் ஒரு வரைபட வகுப்பாளர்',
            dv : ''
        },
        {
            en : 'You are the Adventurer',
            si : 'ඔබ තමයි සූරයා',
            ta : 'நீங்கள்தான் ஒரு விநோத விரும்பி ',
            dv : ''
        }
    ]
}

// let paginationDisplayText = document.getElementById('pagination-part-displaytext');
let otherRegionText = document.getElementById('country-skip-button');
let sliderDistantText = document.getElementById('slidertext-distant');
let sliderCloseText = document.getElementById('slidertext-close');

let likert5_negativeTwo_Text = document.getElementById('likert5_negativeTwo');
let likert5_positiveTwo_Text = document.getElementById('likert5_positiveTwo');

let likert4_value1_Text = document.getElementById('likert4_value1');
let likert4_value2_Text = document.getElementById('likert4_value2');
let likert4_value3_Text = document.getElementById('likert4_value3');
let likert4_value4_Text = document.getElementById('likert4_value4');

export function setUiText(){
    // paginationDisplayText.innerText = allTexts.paginationDisplayText[langId];
    otherRegionText.innerText = allTexts.otherRegionText[langId];
    submitButton.innerText = allTexts.submitButtonText[langId];
    sliderDistantText.innerText = allTexts.sliderDistantText[langId];
    sliderCloseText.innerText = allTexts.sliderCloseText[langId];
    
    document.getElementById('submit-title-text-container').innerText = allTexts.submitConfirmationTitleText[langId]
    document.getElementById('submit-sub-text-container').innerText = allTexts.submitConfirmationSubText[langId]

    document.getElementById('results-footer-text').innerHTML = allTexts.resultsConfirmationFooterText[langId]   
    resultsMoreButton.innerText = allTexts.resultsMoreButtonText[langId]
    likert5_negativeTwo_Text.setAttribute("likert-scale-value", allTexts.stronglyDisagree[langId]);
    likert5_positiveTwo_Text.setAttribute("likert-scale-value", allTexts.stronlgyAgree[langId]);
}

export function updateResultTitle(lod){
    console.log("Result update called");
    resultTitle.innerText = allTexts.resultTitle[parseInt(lod)][langId];
    linkResultTitle.innerText = allTexts.resultTitle[parseInt(lod)][langId];
    
}

export function setLikert5Options(options){
    likert5_negativeTwo_Text.setAttribute("likert-scale-value", options.negativeTwo[langId]);
    likert5_positiveTwo_Text.setAttribute("likert-scale-value", options.positiveTwo[langId]);
}

export function setLikert4Options(options){
    likert4_value1_Text.setAttribute("likert4-scale-value", options.value1[langId]);
    likert4_value2_Text.setAttribute("likert4-scale-value", options.value2[langId]);
    likert4_value3_Text.setAttribute("likert4-scale-value", options.value3[langId]);
    likert4_value4_Text.setAttribute("likert4-scale-value", options.value4[langId]);
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

    if(currentQuestionType){
        if(currentQuestionType == 'likert4' || currentQuestionType == 'likert5' || currentQuestionType == 'likert7')
            enableNextButton()
    }
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
    if(currentQuestionType){
        const stageScenes = currentQuestionType == 'likert5' || currentQuestionType == 'likert4' || currentQuestionType == 'likert7'
        if(stageScenes && main.confirmedAnswers[main.questionIndex] == null)
            return;
    }
    nextButton.disabled = false
}

export function disableNextButton(){
    nextButton.disabled = true
}

export function setCountryName(name){
    countryAnswerContainer.innerText = name
}

export function setRegionName(name){

    if(regionAnswerContainer.innerText !== name){
        showRegionAnswerContainer()
        regionAnswerContainer.innerText = name
    }
    

    // if(name === ''){
        
    //     regionAnswerContainer.addEventListener('animationend',onAnimationEnd)
    //     regionAnswerContainer.addEventListener('animationcancel',onAnimationEnd)

    // }
}

// regionAnswerContainer.addEventListener('animationend',onAnimationEnd)
// regionAnswerContainer.addEventListener('animationcancel',onAnimationEnd)

// function onAnimationEnd(){
//     regionAnswerContainer.style.animation = ''
//     regionAnswerContainer.style.animation = 'fadeout 0.4s linear'
// }


export function hideRegionAnswerContainer(){    
    regionAnswerContainer.style.animation = ''
    regionAnswerContainer.offsetHeight
    regionAnswerContainer.style.animation = 'fadeout 0.2s linear forwards'
}

export function showRegionAnswerContainer(){
    regionAnswerContainer.style.animation = ''
    regionAnswerContainer.offsetHeight
    regionAnswerContainer.style.animation = 'fadein 0.2s linear forwards'
}

var selectedMcqAnswer = null;

const defaultBackground = "linear-gradient(to top , #5f27fc, #e827fc )";
const sliderSceneBackground = "linear-gradient(to bottom, #A216FF 0%,#fa76ff 35%)";     //prev "linear-gradient(to bottom, #bb56ff 0%,#ed81f9 35%)"



// Gender selector set up

let genderScrollContainer = document.getElementById('scroll-container-gender')
let genderSelectorHeader = document.getElementById('selector-header-gender')
let genderSelectionIndicator = document.getElementById('selected-item-indicator-gender')

let genderItems = document.getElementsByClassName('scroll-item-gender')

let genderFirstChildItem = genderItems[0]
let genderLastChildItem = genderItems[genderItems.length - 1]

let genderItemOffset

function genderCalculateMargins(){
    
    let genderMiddleChildrenMargin = ((genderScrollContainer.offsetHeight/2) - genderFirstChildItem.offsetHeight * 3)/2

    // genderSelectorContainer.style.height = genderScrollContainer.clientHeight + 'px'

    for (let i = 0; i < genderItems.length; i++) {
        const item = genderItems[i];
        item.style.marginTop = genderMiddleChildrenMargin + "px"
        resetGenderItemStyle(item)
    }

    let genderEndChildrenMargin = (genderScrollContainer.clientHeight/2) - (genderFirstChildItem.offsetHeight/2)
    // console.log(`${genderScrollContainer.offsetHeight} /2 = ${genderScrollContainer.offsetHeight/2}` );
    // console.log( `${genderFirstChildItem.offsetHeight} *4 = ${genderFirstChildItem.offsetHeight*4}` );
    // console.log(genderMiddleChildrenMargin);


    genderFirstChildItem.style.marginTop = genderEndChildrenMargin + "px"
    genderLastChildItem.style.marginBottom = genderEndChildrenMargin + "px"

    let genderSelectionIndicatorMargin = (genderScrollContainer.clientHeight/2) - (genderSelectionIndicator.offsetHeight/2)
    // console.log(`${genderScrollContainer.clientHeight} /2 = ${genderScrollContainer.clientHeight/2}` );
    // console.log( `${genderSelectionIndicator.offsetHeight} /2 = ${genderSelectionIndicator.offsetHeight/2}` );
    // console.log(genderSelectionIndicatorMargin);

    genderItemOffset = genderMiddleChildrenMargin + genderFirstChildItem.offsetHeight 

    for (let i = 0; i < genderItems.length; i++) {
        const item = genderItems[i];
        resetGenderItemStyle(item)
    }

    setGenderSelectedStyle(genderItems[0])
    setGenderNearestStyle(genderItems[1])
    setGenderFarthestStyle(genderItems[2])

    genderScrollContainer.scroll({
        top:0,
        behavior:'smooth'
    })
}

genderCalculateMargins()

let genderCurrentItemIndex = 0
let genderSelectedItem = genderItems[genderCurrentItemIndex]
genderScrollContainer.scrollTop = 0
setGenderSelectedStyle(genderSelectedItem)
setGenderNearestStyle(genderItems[genderCurrentItemIndex + 1])
setGenderFarthestStyle(genderItems[genderCurrentItemIndex + 2])


var genderSelectionTimeout = null;
function onScrollGender(){
    genderCurrentItemIndex = Math.round(genderScrollContainer.scrollTop /genderItemOffset)  
    genderSelectedItem = genderItems[genderCurrentItemIndex]
    console.log(genderCurrentItemIndex);

    enableConfirmation({
        gender:genderSelectedItem.getAttribute('data-index'),
        age:ageSelectedItem.getAttribute('data-index')
    })

    for (let i = 0; i < genderItems.length; i++) {
        const item = genderItems[i];
        resetGenderItemStyle(item)
    }
    setGenderSelectedStyle(genderSelectedItem)

    if(genderCurrentItemIndex < (genderItems.length - 2)){
        setGenderNearestStyle(genderItems[genderCurrentItemIndex + 1])
        setGenderFarthestStyle(genderItems[genderCurrentItemIndex + 2])
    }else if (genderCurrentItemIndex === (genderItems.length - 2)){
        setGenderNearestStyle(genderItems[genderCurrentItemIndex + 1])
    }
    // else if (genderCurrentItemIndex === (genderItems.length - 1)){

    // }

    // if(genderCurrentItemIndex === 0){
    //     setGenderNearestStyle(genderItems[1])
    //     setGenderNearestStyle(genderItems[2])
    //     // genderSelectorHeader.classList.remove('hidden')
    // }
    // else if(genderCurrentItemIndex === (genderItems.length - 1) ){
    //     setGenderNearestStyle(genderItems[genderCurrentItemIndex - 1])
    //     // genderSelectorHeader.classList.add('hidden')

    // }
    // else{
    //     setGenderNearestStyle(genderItems[genderCurrentItemIndex + 1])
    //     setGenderNearestStyle(genderItems[genderCurrentItemIndex - 1])
    //     // genderSelectorHeader.classList.add('hidden')
    // }


    if(genderSelectionTimeout !== null) {
        clearTimeout(genderSelectionTimeout);        
    }
    genderSelectionTimeout = setTimeout(function() {
        let scrollValue = genderSelectedItem.offsetTop - genderFirstChildItem.offsetTop
        console.log(genderSelectedItem.getAttribute('data-index'))
        genderScrollContainer.scroll({
            top:scrollValue,
            behavior:'smooth'
        })
    }, 250);
}

genderScrollContainer.addEventListener('scroll',onScrollGender)
window.addEventListener('resize',genderCalculateMargins)


function resetGenderItemStyle(genderItem){
    if(genderItem){
        const itemClassList = genderItem.classList
        itemClassList.remove('selected','nearest','farthest')
        itemClassList.add('hidden')
    }
}

function setGenderSelectedStyle(selectedGenderItem){
    if(selectedGenderItem){
        const itemClassList = selectedGenderItem.classList
        itemClassList.remove('nearest','farthest','hidden')
        itemClassList.add('selected')
    }
}

function setGenderNearestStyle(nearestGenderItem){
    if(nearestGenderItem){
        const itemClassList = nearestGenderItem.classList
        itemClassList.remove('selected','farthest','hidden')
        itemClassList.add('nearest')
    }
}

function setGenderFarthestStyle(farthestGenderItem){
    if(farthestGenderItem){
        const itemClassList = farthestGenderItem.classList
        itemClassList.remove('selected','nearest','hidden')
        itemClassList.add('farthest')
    }
}


// Age selector setup
let ageScrollContainer = document.getElementById('scroll-container-age')
let ageSelectorHeader = document.getElementById('selector-header-age')

let ageSelectionIndicator = document.getElementById('selected-item-indicator-age')

let ageItems = document.getElementsByClassName('scroll-item-age')

let ageFirstChildItem = ageItems[0]
let ageLastChildItem = ageItems[ageItems.length - 1]

let ageItemOffset
function ageCalculateMargins(){
    let ageMiddleChildrenMargin = ((ageScrollContainer.offsetHeight/2) - ageFirstChildItem.offsetHeight * 3)/2

    // ageSelectorContainer.style.height = ageScrollContainer.clientHeight + 'px'
    
    for (let i = 0; i < ageItems.length; i++) {
        const item = ageItems[i];
        item.style.marginTop = ageMiddleChildrenMargin + "px"
        resetAgeItemStyle(item)
    }
    
    let ageEndChildrenMargin = (ageScrollContainer.clientHeight/2) - (ageFirstChildItem.offsetHeight/2)
    // console.log(`${ageScrollContainer.offsetHeight} /2 = ${ageScrollContainer.offsetHeight/2}` );
    // console.log( `${ageFirstChildItem.offsetHeight} *4 = ${ageFirstChildItem.offsetHeight*4}` );
    // console.log(ageMiddleChildrenMargin);
    // console.log(ageEndChildrenMargin);
    
    
    ageFirstChildItem.style.marginTop = ageEndChildrenMargin + "px"
    ageLastChildItem.style.marginBottom = ageEndChildrenMargin + "px"
    
    let ageSelectionIndicatorMargin = (ageScrollContainer.clientHeight/2) - (ageSelectionIndicator.offsetHeight/2)
    // console.log(`${ageScrollContainer.clientHeight} /2 = ${ageScrollContainer.clientHeight/2}` );
    // console.log( `${ageSelectionIndicator.offsetHeight} /2 = ${ageSelectionIndicator.offsetHeight/2}` );
    // console.log(ageSelectionIndicatorMargin);
    
    ageItemOffset = ageMiddleChildrenMargin + ageFirstChildItem.offsetHeight 

    for (let i = 0; i < ageItems.length; i++) {
        const item = ageItems[i];
        resetAgeItemStyle(item)
    }

    setAgeSelectedStyle(ageItems[0])
    setAgeNearestStyle(ageItems[1])
    setAgeFarthestStyle(ageItems[2])

    ageScrollContainer.scroll({
        top:0,
        behavior:'smooth'
    })

}

ageCalculateMargins()

let ageCurrentItemIndex = 0
let ageSelectedItem = ageItems[ageCurrentItemIndex]
ageScrollContainer.scrollTop = 0
setAgeSelectedStyle(ageSelectedItem)
setAgeNearestStyle(ageItems[ageCurrentItemIndex + 1])
setAgeFarthestStyle(ageItems[ageCurrentItemIndex + 2])

var ageSelectionTimeout = null;
function onScrollAge(){
    ageCurrentItemIndex = Math.round(ageScrollContainer.scrollTop /ageItemOffset)  
    ageSelectedItem = ageItems[ageCurrentItemIndex]
    console.log(ageCurrentItemIndex);

    enableConfirmation({
        gender:genderSelectedItem.getAttribute('data-index'),
        age:ageSelectedItem.getAttribute('data-index')
    })

    for (let i = 0; i < ageItems.length; i++) {
        const item = ageItems[i];
        resetAgeItemStyle(item)
    }
    setAgeSelectedStyle(ageSelectedItem)

    if(ageCurrentItemIndex < (ageItems.length - 2)){
        setAgeNearestStyle(ageItems[ageCurrentItemIndex + 1])
        setAgeFarthestStyle(ageItems[ageCurrentItemIndex + 2])
    }else if (ageCurrentItemIndex === (ageItems.length - 2)){
        setAgeNearestStyle(ageItems[ageCurrentItemIndex + 1])
    }


    // if(ageCurrentItemIndex === 0){
    //     setAgeNearestStyle(ageItems[ageCurrentItemIndex + 1])
    //     ageSelectorHeader.classList.remove('hidden')
    // }
    // else if(ageCurrentItemIndex === (ageItems.length - 1) ){
    //     setAgeNearestStyle(ageItems[ageCurrentItemIndex - 1])
    //     ageSelectorHeader.classList.add('hidden')
    // }
    // else{
    //     setAgeNearestStyle(ageItems[ageCurrentItemIndex + 1])
    //     setAgeNearestStyle(ageItems[ageCurrentItemIndex - 1])
    //     ageSelectorHeader.classList.add('hidden')
    // }


    if(ageSelectionTimeout !== null) {
        clearTimeout(ageSelectionTimeout);        
    }
    ageSelectionTimeout = setTimeout(function() {
        let scrollValue = ageSelectedItem.offsetTop - ageFirstChildItem.offsetTop
        console.log(ageSelectedItem.getAttribute('data-index'))
        ageScrollContainer.scroll({
            top:scrollValue,
            behavior:'smooth'
        })
    }, 250);
}

ageScrollContainer.addEventListener('scroll',onScrollAge)
window.addEventListener('resize',ageCalculateMargins)

function resetAgeItemStyle(ageItem){
    if(ageItem){
        const itemClassList = ageItem.classList
        itemClassList.remove('selected','nearest','farthest')
        itemClassList.add('hidden')
    }
}

function setAgeSelectedStyle(selectedAgeItem){
    if(selectedAgeItem){
        const itemClassList = selectedAgeItem.classList
        itemClassList.remove('nearest','farthest','hidden')
        itemClassList.add('selected')
    }
}

function setAgeNearestStyle(nearestAgeItem){
    if(nearestAgeItem){
        const itemClassList = nearestAgeItem.classList
        itemClassList.remove('selected','farthest','hidden')
        itemClassList.add('nearest')
    }
}

function setAgeFarthestStyle(farthestAgeItem){
    if(farthestAgeItem){
        const itemClassList = farthestAgeItem.classList
        itemClassList.remove('selected','nearest','hidden')
        itemClassList.add('farthest')
    }
}


//Scroll wheel drag control 
let pos = {
    top: 0,
    left:0,
    x:0,
    y:0
}

let elementToScroll = null

function mouseDownHandler(e){
    e.preventDefault ? e.preventDefault() : e.returnValue = false 
    e.target.style.cursor = 'grabbing';
    elementToScroll = e.target
    pos = {
        // The current scroll
        left: e.target.scrollLeft,
        top: e.target.scrollTop,
        // Get the current mouse position
        x: e.clientX,
        y: e.clientY,
    };
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
}

 function mouseMoveHandler (e) {
    // How far the mouse has been moved
    const dx = e.clientX - pos.x;
    const dy = e.clientY - pos.y;

    // Scroll the element
    elementToScroll.scrollTop = pos.top - dy;
    elementToScroll.scrollLeft = pos.left - dx;
};

function mouseUpHandler(e){
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);

    elementToScroll.style.cursor = 'grab';
    elementToScroll.style.removeProperty('user-select');
}

genderScrollContainer.addEventListener('mousedown',mouseDownHandler)
ageScrollContainer.addEventListener('mousedown',mouseDownHandler)
vidQuestionScrollContainer.addEventListener('mousedown',mouseDownHandler)

let currentQuestionType;
//Changes UI in respect to question type, sets the question text, and answers
export function updateUI(questionType, questionText, answers){
    currentQuestionType = questionType;
    if(questionType == 'joystick' || questionType == 'likert5' || questionType == 'likert4' || questionType == 'likert7'){
        document.body.style.background = sliderSceneBackground;
    }
    else{
        document.body.style.background = defaultBackground;
    }

    questionContainer.style.display = ''
    questionContainer.innerText= questionText
    //#region For Question Change Animation
    // questionContainer.style.animation = 'none'
    // questionContainer.offsetHeight;     //Resets animation
    // questionContainer.style.animation = null
    //#endregion

    switch(questionType){
        case 'country':
            aboutAnswerContainer.style.display = 'none'
            joystickAnswerContainer.style.display = 'none'
            submitContainer.style.display = 'none'
            countryAnswerContainer.style.display = 'none'
            regionAnswerContainer.style.display = 'none'
            joystickTutorialContainer.style.display = 'none'
            joystickSlider.style.display = 'none'
            countryAnswerContainer.innerText = ''
            regionSkipButton.style.display = ''
            sliderHolder.hidden = true
            likert5Container.style.display = 'none' 
            likert4Container.style.display = 'none'
            likert7Container.style.display = 'none'
            break;
        case 'province':
            aboutAnswerContainer.style.display = 'none' 
            joystickAnswerContainer.style.display = 'none'
            submitContainer.style.display = 'none'
            countryAnswerContainer.style.display = 'none'
            regionAnswerContainer.style.display = ''
            joystickTutorialContainer.style.display = 'none'
            joystickSlider.style.display = 'none'
            regionAnswerContainer.innerText = ''
            regionSkipButton.style.display = 'none'
            sliderHolder.hidden = true
            likert5Container.style.display = 'none'
            likert4Container.style.display = 'none'
            likert7Container.style.display = 'none'
            break;
        case 'about':
            aboutAnswerContainer.style.display = ''
            joystickAnswerContainer.style.display = 'none'
            submitContainer.style.display = 'none'
            countryAnswerContainer.style.display = 'none'
            regionAnswerContainer.style.display = 'none'
            joystickTutorialContainer.style.display = 'none'
            joystickSlider.style.display = 'none'
            regionSkipButton.style.display = 'none'
            // aboutAnswerContainer.innerHTML = ''
            // selectedMcqAnswer = null
            sliderHolder.hidden = true
            likert5Container.style.display = 'none'
            likert4Container.style.display = 'none'
            likert7Container.style.display = 'none'

            ageCalculateMargins()
            genderCalculateMargins()

            enableConfirmation({
                gender:genderSelectedItem.getAttribute('data-index'),
                age:ageSelectedItem.getAttribute('data-index')
            })
            
            if(answers){
                for (let i = 0; i < genderItems.length; i++) {
                    const genderItem = genderItems[i];
                    //console.log(parseInt(genderItem.getAttribute('data-index')));
                    let genderItemText = answers.gender[parseInt(genderItem.getAttribute('data-index'))][langId]
                    genderItem.innerText = ''
                    genderItem.innerText = genderItemText
                }
                for (let i = 0; i < ageItems.length; i++) {
                    const ageItem = ageItems[i];
                    let ageItemText = answers.age[parseInt(ageItem.getAttribute('data-index'))][langId]
                    ageItem.innerText = ''
                    ageItem.innerText = ageItemText
                }
            }

            //#region Previous answer radios
            // if(answers){
            //     for (let i = 0; i < answers.length; i++) {
            //         // creating a new answer box with text and radio buttons for each in answer for MCQs
            //         const answer = answers[i][langId];
                    
            //         const answerRadio = document.createElement('input')
            //         answerRadio.type = 'radio'
            //         answerRadio.name = 'answer'
            //         answerRadio.classList.add('hidden-radio')
            //         answerRadio.id = `answer-${i}`

            //         const answerBox = document.createElement('div')
            //         answerBox.classList.add('answer-box')
            //         answerBox.appendChild(answerRadio)
            //         answerBox.appendChild(document.createTextNode(answer))
            //         answerBox.addEventListener('click',function(){
            //             answerRadio.checked = true
            //             enableConfirmation(i)
            //             if(selectedMcqAnswer){
            //                 selectedMcqAnswer.classList.remove('selected')
            //                 selectedMcqAnswer = null
            //             }
            //             selectedMcqAnswer = answerBox
            //             selectedMcqAnswer.classList.add('selected')
            //         })


            //         aboutAnswerContainer.appendChild(answerBox)
            //     }
            // }
            //#endregion
            break;
        case 'joystick':
            aboutAnswerContainer.style.display = 'none'
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
            likert5Container.style.display = 'none'
            likert4Container.style.display = 'none'
            likert7Container.style.display = 'none'
            fadeInSliderContainer()
            enableConfirmation(joystickSlideValue);
            break;
        case 'likert5':
            aboutAnswerContainer.style.display = 'none'
            joystickAnswerContainer.style.display = 'none'
            submitContainer.style.display = 'none'
            countryAnswerContainer.style.display = 'none'
            regionAnswerContainer.style.display = 'none'
            joystickTutorialContainer.style.display = 'none'
            regionSkipButton.style.display = 'none'
            joystickSlider.style.display = 'none'
            sliderHolder.hidden = true
            likert5Container.style.display = ''
            likert4Container.style.display = 'none'
            likert7Container.style.display = 'none'
            FadeInLiker5()
            //enableConfirmation(0)
            break;
        case 'likert4':
            aboutAnswerContainer.style.display = 'none'
            joystickAnswerContainer.style.display = 'none'
            submitContainer.style.display = 'none'
            countryAnswerContainer.style.display = 'none'
            regionAnswerContainer.style.display = 'none'
            joystickTutorialContainer.style.display = 'none'
            regionSkipButton.style.display = 'none'
            joystickSlider.style.display = 'none'
            sliderHolder.hidden = true
            likert5Container.style.display = 'none'
            likert4Container.style.display = ''
            likert7Container.style.display = 'none'
            FadeInLikert4()
            //enableConfirmation(0)
            break;
        case 'likert7':
            aboutAnswerContainer.style.display = 'none'
            joystickAnswerContainer.style.display = 'none'
            submitContainer.style.display = 'none'
            countryAnswerContainer.style.display = 'none'
            regionAnswerContainer.style.display = 'none'
            joystickTutorialContainer.style.display = 'none'
            regionSkipButton.style.display = 'none'
            joystickSlider.style.display = 'none'
            sliderHolder.hidden = true
            likert5Container.style.display = 'none'
            likert4Container.style.display = 'none'
            likert7Container.style.display = ''
            FadeInLikert7()
            //enableConfirmation(0)
            break;
    }
}

export function enableSubmitPage(){
    submitContainer.style.display = ''
    uiHolder.style.display = 'none'
    FadeOutLikert7()
    disableResultsContainer()
    enableSubmitScene()
    // removeModelsInLastScene()
}

export function disableSubmitPage(){
    submitContainer.style.display = 'none'
    uiHolder.style.display = ''
}

export function enableVidQuestionPage(){
    vidQuestionUI.style.display = ''
    uiHolder.style.display = 'none';
}



const resetElementAnimation = function(element){
    element.style.animation = 'none'
    element.offsetHeight;
    element.style.animation = ''
}

export const FadeInLiker5 = function(){
    resetElementAnimation(likert5Container);
    likert5Container.style.animation = 'likert5FadeIn 0.5s ease-in 0s 1 normal forwards';
}

export const FadeOutLiker5 = function(){
    resetElementAnimation(likert5Container);
    likert5Container.style.animation = 'likert5FadeOut 0.5s ease-in 0s 1 normal forwards'
}

export const FadeInLikert4 = function(){
    resetElementAnimation(likert5Container);
    likert4Container.style.animation = 'likert4FadeIn 0.5s ease-in 0s 1 normal forwards';
}

export const FadeOutLikert4 = function(){
    resetElementAnimation(likert5Container);
    likert4Container.style.animation = 'likert4FadeOut 0.5s ease-in 0s 1 normal forwards'
}

export const FadeInLikert7 = function(){
    resetElementAnimation(likert5Container);
    likert7Container.style.animation = 'likert7FadeIn 0.5s ease-in 0s 1 normal forwards';
}

export const FadeOutLikert7 = function(){
    resetElementAnimation(likert5Container);
    likert7Container.style.animation = 'likert7FadeOut 0.5s ease-in 0s 1 normal forwards';
}

export const fadeInSliderContainer = function(){
    resetElementAnimation(sliderHolder);
    sliderHolder.style.animation = 'sliderContainerFadeIn 0.5s ease-out';
}

export const fadeOutSliderContainer = function(){
    resetElementAnimation(sliderHolder);
    sliderHolder.style.animation = 'sliderContainerFadeOut 0.5s ease-out 0s 1 normal forwards';
    sliderHolder.hidden = false;
}


function enableResultsContainer(){
    submitConfirmationContainer.style.display = 'none'
    resultsConfirmationContainer.style.display = ''
}

function disableResultsContainer(){
    submitConfirmationContainer.style.display = ''
    resultsConfirmationContainer.style.display = 'none'
}

joystickTutCloseButton.addEventListener('click', function(){
    main.joystickTutorialEnded();
    joystickTutorialContainer.style.display = 'none';
    main.enablePlayerControl();
})

vidQuestionBackButton.addEventListener('click',function(){
    langSelectionUI.hidden = false;
    vidQuestionUI.style.display = 'none'
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

submitButton.addEventListener('click',function(){
    enableResultsContainer()
    main.validateAnswers()
})

submitBackButton.addEventListener('click',function(){
    disableSubmitPage()
    loadQuestion(numberOfQuestions-1)
})

resultsMoreButton.addEventListener('click',function(){
    disableSubmitPage()
    uiHolder.style.display = 'none'
    linksPageContainer.style.display = 'initial'
})

languageSelectedButton.addEventListener('click', function(){
    // loadQuestion(0);
    setVidQuestionLang()
    setLinksPageLang();
    setUiText();
    // loadQuestion(0);
    langSelectionUI.hidden = true;
    vidQuestionUI.style.display = ''
})

languageSelectedButton.addEventListener('onmousedown', function(){
    console.log("Button pressed");
});

vidQuestionButton.addEventListener('click',function(){
    loadQuestion(0);
    vidQuestionUI.style.display = 'none'
    uiHolder.hidden = false;
    uiHolder.style.display = '';
})


