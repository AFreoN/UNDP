import * as main from '../script'
import { langId, setLangId, loadQuestion, numberOfQuestions,enableSubmitScene, setPlayerRotationLikert5,
            setPlayerRotationLikert4, setPlayerRotationLikert7, resetPlayerRotation, updateSubmitModel, spawnCharacters } from '../questions/questions'
import { doc } from '@firebase/firestore'
import { LineSegments } from 'three';

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
    if(event.key == "l" || event.key == " ") {
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
            en:'Have you watched Extreme Lives videos?',
            si:'ඔබ Extreme Lives වීඩියෝ නරඹා තිබේද?',
            ta:'Extreme Lives வீடியோக்களைப் பார்த்திருக்கிறீர்களா?',
            dv:'Have you watched Extreme Lives videos?',
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
        addResource5:{
            en:'How to cope if you have social anxiety, how to build confidence',
            si:'ඔබට සමාජ කනස්සල්ලක් ඇත්නම් එයට මුහුණ දෙන්නේ කෙසේද, විශ්වාසය ගොඩනඟා ගන්නේ කෙසේද',
            ta:'உங்களுக்கு சமூக கவலை இருந்தால் எப்படி சமாளிப்பது, தன்னம்பிக்கையை வளர்ப்பது எப்படி',
            dv:'How to cope if you have social anxiety, how to build confidence',
        },
        addResource6:{
            en:'How to make a difficult decision. And then follow up on specific decisions e.g. subject to study, career to choose',
            si:'දුෂ්කර තීරණයක් ගන්නේ කෙසේද. ඉන්පසු නිශ්චිත තීරණ ගැන පසු විපරම් කරන්න උදා. ඉගෙනීමට යටත්ව, තෝරා ගැනීමට වෘත්තිය',
            ta:'கடினமான முடிவை எடுப்பது எப்படி. பின்னர் குறிப்பிட்ட முடிவுகளைப் பின்தொடரவும் எ.கா. படிப்புக்கு உட்பட்டது, தேர்ந்தெடுக்கும் தொழில்',
            dv:'How to make a difficult decision. And then follow up on specific decisions e.g. subject to study, career to choose',
        },
        addResource7:{
            en:'Mental health, dealing with depression, anxiety, loneliness, disempowerment, frustration',
            si:'මානසික සෞඛ්‍යය, මානසික අවපීඩනය සමඟ කටයුතු කිරීම, කාංසාව, තනිකම, බල ගැන්වීම, කලකිරීම',
            ta:'மன ஆரோக்கியம், மனச்சோர்வு, பதட்டம், தனிமை, அதிகாரமின்மை, விரக்தி ஆகியவற்றைக் கையாள்வது',
            dv:'Mental health, dealing with depression, anxiety, loneliness, disempowerment, frustration',
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
    document.getElementById('additional-resources-list-item-text-5').innerText = langTexts.addResource5[langId]
    document.getElementById('additional-resources-list-item-text-6').innerText = langTexts.addResource6[langId]
    document.getElementById('additional-resources-list-item-text-7').innerText = langTexts.addResource7[langId]

}

//UI elements

document.getElementById('links-email-submit-button').addEventListener('click',function(){
    const email = document.getElementById('links-email-input').value.toLowerCase().trim()

    if(email === ''){
        alert("Email field is empty!")
        return
    }

    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    //validate email
    if (re.test(email)){
        main.submitEmail(email)
    }
    else{
        alert("You have entered an invalid email address!")
    }
})

//question answer containers
let questionContainer = document.getElementById('question-container')
let aboutAnswerContainer = document.getElementById('about-answer-container')// answer container holds the answer buttons for MCQ
let joystickAnswerContainer = document.getElementById('joystick-answer-container')
let countryAnswerContainer = document.getElementById('country-answer-container')

let countryLabelContainer = document.getElementById('country-label-container')
let sriLankaLabel = document.getElementById('srilanka-label')
let maldivesLabel = document.getElementById('maldives-label')

let regionAnswerContainer = document.getElementById('region-answer-container')
let joystickTutorialContainer = document.getElementById('joystick-tutorial-frame')

let likert5Container = document.getElementById('likert5-wrapper')
let likert4Container = document.getElementById('likert4-wrapper')
let likert7Container = document.getElementById('likert7-wrapper')

let resultTitle = document.getElementById('results-header-container')
let resultSubText = document.getElementById('results-subtext-container')
let resultFooterText = document.getElementById('results-footer-text')
let linkResultTitle = document.getElementById('links-result-header-container')
let linkResultSubText = document.getElementById('links-result-subtext-container')

joystickTutorialContainer.hidden = true

let surveyProgressBar = document.getElementById("survey-progress-bar");

const agrees = document.getElementsByName('likert5-checker');
agrees.forEach(buttons => {
    buttons.addEventListener('change', function(event){
        main.saveCurrentAnswer(event.target.value)
        setPlayerRotationLikert5(event.target.value)        
        enableConfirmation(event.target.value)
        //console.log("Agree value = ", event.target.value);
    })
});

const agrees4 = document.getElementsByName('likert4-checker');
agrees4.forEach(buttons => {
    buttons.addEventListener('change', function(event){
        main.saveCurrentAnswer(event.target.value)
        setPlayerRotationLikert4(event.target.value)
        enableConfirmation(event.target.value)
        spawnCharacters(event.target.value)
    })
});

const agrees7 = document.getElementsByName('likert7-checker');
agrees7.forEach(buttons => {
    buttons.addEventListener('change', function(event){
        main.saveCurrentAnswer(event.target.value)
        setPlayerRotationLikert7(event.target.value)
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
    let v = parseInt(sliderValue) + 50;
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

    var tolerance = -(sliderValue / 50) * 12
    //console.log("tolerance = ", tolerance)
    var s = "calc(" + v + "% + " + parseInt(tolerance) +"px)"
    sliderThumb.style.left = s
}




let countrySkipContainer = document.getElementById('country-skip-container')
let submitContainer = document.getElementById('submit-container') 
let submitConfirmationContainer = document.getElementById('submit-confirmation-container')
let submitLoadingContainer = document.getElementById('submit-loading-container')
let resultsConfirmationContainer = document.getElementById('submit-results-container')
let linksPageContainer = document.getElementById("links-page-container")

export const joystickSlider = document.getElementById('sliderRange')
export const sliderThumb = document.getElementById('slider-thumb')
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
let submitHeader = document.getElementById('submit-title-text-container')
let submitSubtext = document.getElementById('submit-sub-text-container')
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
            en : 'You are the Change Seeker',
            si : 'ඔබ තමයි වෙනස්කම් නිර්මාණය කරන්නා',
            ta : 'நீங்கள்தான் ஒரு மாற்றத்தை உருவாக்குபவர்',
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
    ],
    maldivesName:{
        en:'Maldives',
        si:'මාල දිවයින',
        ta:'மாலைத்தீவுகள்',
        dv:'Maldives',
    },
    sriLankaName:{
        en:'Sri Lanka',
        si:'ශ්‍රී ලංකා',
        ta:'இலங்கை',
        dv:'Sri Lanka',
    }
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
    
    submitHeader.innerText = allTexts.submitConfirmationTitleText[langId]
    submitSubtext.innerText = allTexts.submitConfirmationSubText[langId]

    resultFooterText.innerHTML = allTexts.resultsConfirmationFooterText[langId]   
    resultsMoreButton.innerText = allTexts.resultsMoreButtonText[langId]
    likert5_negativeTwo_Text.setAttribute("likert-scale-value", allTexts.stronglyDisagree[langId]);
    likert5_positiveTwo_Text.setAttribute("likert-scale-value", allTexts.stronlgyAgree[langId]);

    maldivesLabel.innerText = allTexts.maldivesName[langId]
    sriLankaLabel.innerText = allTexts.sriLankaName[langId]

    setUiTextSize()
}

function setUiTextSize(){
    switch(langId){
        case 'en':
            questionContainer.style.fontSize = 'calc(0.8em + 1vw)'
            regionSkipButton.style.fontSize = 'calc(0.6em + 0.8vw)'
            
            submitHeader.style.fontSize = 'calc(0.8em + 1.5vw)'
            submitSubtext.style.fontSize = 'calc(0.65em + 0.5vw)'
            submitButton.style.fontSize = 'calc(0.8em + 1vw)'

            resultTitle.style.fontSize = 'calc(1em + 1.5vw)'
            resultSubText.style.fontSize = 'calc(0.7em + 0.5vw)'
            resultsMoreButton.style.fontSize = 'calc(0.8em + 1vw)'

            resultFooterText.style.fontSize = 'calc(0.6em + 0.5vw)'

            sriLankaLabel.style.fontSize = 'calc(0.6em + 1vh)'
            maldivesLabel.style.fontSize = 'calc(0.6em + 1vh)'
            break
        case 'si':
            questionContainer.style.fontSize = 'calc(0.6em + 1vw)'
            regionSkipButton.style.fontSize = 'calc(0.55em + 0.75vw)'
            
            submitHeader.style.fontSize = 'calc(0.75em + 1.5vw)'
            submitSubtext.style.fontSize = 'calc(0.6em + 0.5vw)'
            submitButton.style.fontSize = 'calc(0.5em + 1vw)'

            resultTitle.style.fontSize = 'calc(0.75em + 1.5vw)'
            resultSubText.style.fontSize = 'calc(0.6em + 0.5vw)'
            resultsMoreButton.style.fontSize = 'calc(0.5em + 1vw)'

            resultFooterText.style.fontSize = 'calc(0.5em + 0.5vw)'
            
            sriLankaLabel.style.fontSize = 'calc(0.6em + 1vh)'
            maldivesLabel.style.fontSize = 'calc(0.6em + 1vh)'
            break
        case 'ta':
            questionContainer.style.fontSize = 'calc(0.5em + 1vw)'
            regionSkipButton.style.fontSize = 'calc(0.5em + 0.7vw)'

            submitHeader.style.fontSize = 'calc(0.7em + 1.5vw)'
            submitSubtext.style.fontSize = 'calc(0.6em + 0.5vw)'
            submitButton.style.fontSize = 'calc(0.5em + 1vw)'

            resultTitle.style.fontSize = 'calc(0.7em + 1.5vw)'
            resultSubText.style.fontSize = 'calc(0.5em + 0.5vw)'
            resultsMoreButton.style.fontSize = 'calc(0.5em + 1vw)'

            resultFooterText.style.fontSize = 'calc(0.5em + 0.5vw)'

            sriLankaLabel.style.fontSize = 'calc(0.6em + 0.75vh)'
            maldivesLabel.style.fontSize = 'calc(0.6em + 0.75vh)'
            break
        case 'dv':
            questionContainer.style.fontSize = 'calc(0.6em + 1vw)'
            regionSkipButton.style.fontSize = 'calc(0.5em + 0.75vw)'

            submitHeader.style.fontSize = 'calc(1em + 1.5vw)'
            submitSubtext.style.fontSize = 'calc(0.7em + 0.5vw)'
            submitButton.style.fontSize = 'calc(1em + 1vw)'

            resultTitle.style.fontSize = 'calc(1em + 1.5vw)'
            resultSubText.style.fontSize = 'calc(0.7em + 0.5vw)'
            resultsMoreButton.style.fontSize = 'calc(1em + 1vw)'

            resultFooterText.style.fontSize = 'calc(0.6em + 0.5vw)'

            sriLankaLabel.style.fontSize = 'calc(0.5em + 0.8vh)'
            maldivesLabel.style.fontSize = 'calc(0.5em + 0.8vh)'
            break
    }
    
}

// Test code - Remove when pushing

// document.addEventListener('keydown',function(e){
//     switch(e.key.toLowerCase()){
//         case '1':
//             updateResultTitle('0')
//             updateSubmitModel(0)
//             break;
//         case '2':
//             updateResultTitle('1')
//             updateSubmitModel(1)
//             break;
//         case '3':
//             updateResultTitle('2')
//             updateSubmitModel(2)
//             break;
//         case 'e':
//             languageSelected('en')
//             setLinksPageLang();
//             setUiText();
//             break;
//         case 's':
//             languageSelected('si')
//             setLinksPageLang();
//             setUiText();
//             break;
//         case 't':
//             languageSelected('ta')
//             setLinksPageLang();
//             setUiText();
//             break;
//         case 'd':
//             languageSelected('dv')
//             setLinksPageLang();
//             setUiText();
//             break;        
//     }
// })

function updateResultLinks(loc){
    const langTexts = {
        linkTop:[
            {
                en : 'How to cope if you have social anxiety, how to build confidence ',
                si : 'ඔබට සමාජ කනස්සල්ලක් ඇත්නම් එයට මුහුණ දෙන්නේ කෙසේද, විශ්වාසය ගොඩනඟා ගන්නේ කෙසේද',
                ta : 'உங்களுக்கு சமூக கவலை இருந்தால் எப்படி சமாளிப்பது, தன்னம்பிக்கையை வளர்ப்பது எப்படி',
                dv : 'link top loc 0'
            },
            {
                en : 'How to make a difficult decision.',
                si : 'දුෂ්කර තීරණයක් ගන්නේ කෙසේද',
                ta : 'கடினமான முடிவை எடுப்பது எப்படி',
                dv : 'link top loc 1'
            },
            {
                en : 'How to talk to friends to check if they are doing OK',
                si : 'මිතුරන් හොඳින් ක්‍රියා කරනවාද යන්න පරීක්ෂා කිරීමට ඔවුන් සමඟ කතා කරන්නේ කෙසේද',
                ta : 'நண்பர்கள் நலமா என்பதைச் அறிய அவர்களுடன் பேசுவது எப்படி',
                dv : 'link top loc 2'
            },
        ],
        linkLeft:[
            {
                en : 'Mental Health Care',
                si : 'මානසික සෞඛ්ය රැකවරණය',
                ta : 'மனநல பராமரிப்பு',
                dv : 'link left loc 0'
            },
            {
                en : 'Mental Health Care',
                si : 'මානසික සෞඛ්ය රැකවරණය',
                ta : 'மனநல பராமரிப்பு',
                dv : 'link left loc 1'
            },
            {
                en : 'How to get involved in volunteering ',
                si : 'ස්වේච්ඡා සේවයට සම්බන්ධ වන්නේ කෙසේද?',
                ta : 'தன்னார்வத் தொண்டுகளில் ஈடுபடுவது எப்படி',
                dv : 'link left loc 2'
            },
        ],
        linkRight:[
            {
                en : 'Self Confidence',
                si : 'ආත්ම විශ්වාසය',
                ta : 'தன்னம்பிக்கை',
                dv : 'link right loc 0'
            },
            {
                en : 'Volunteering opportunities',
                si : 'ස්වේච්ඡා අවස්ථා',
                ta : 'தன்னார்வ வாய்ப்புகள்',
                dv : 'link right loc 1'
            },
            {
                en : 'Mindfulness and meditation',
                si : 'සිහිය හා භාවනාව',
                ta : 'நினைவாற்றல் மற்றும் தியானம்',
                dv : 'link right loc 2'
            },
        ]
    }
    const links = {
        linkTop:[
            "https://www.nhs.uk/mental-health/conditions/social-anxiety/",
            "https://hbr.org/2015/11/3-timeless-rules-for-making-tough-decisions ",
            "https://www.nytimes.com/2020/07/28/smarter-living/coronavirus-how-to-check-in-with-a-friend.html",
        ],
        linkLeft:[
            "https://www.mentalhealth.org.uk/your-mental-health/looking-after-your-mental-health",
            "https://www.nimh.nih.gov/health/topics/caring-for-your-mental-health",
            "https://www.unv.org/",
        ],
        linkRight:[
            "https://www.nytimes.com/2019/06/03/smarter-living/how-to-improve-self-confidence.html ",
            "https://www.unv.org/ ",
            "https://news.harvard.edu/gazette/story/2018/04/less-stress-clearer-thoughts-with-mindfulness-meditation/",
        ],
    }

    const locValue = parseInt(loc)

    const topLink = document.getElementById('resource-link-top')
    const leftLink = document.getElementById('resource-link-left')
    const rightLink = document.getElementById('resource-link-right')


    topLink.innerText = langTexts.linkTop[locValue][langId]
    leftLink.innerText = langTexts.linkLeft[locValue][langId]
    rightLink.innerText = langTexts.linkRight[locValue][langId]

    topLink.href = links.linkTop[locValue]
    leftLink.href = links.linkLeft[locValue]
    rightLink.href = links.linkRight[locValue]

}

function updateResultSubtexts(loc){
    const langTexts ={
        resultsPage:[
            {
                en : 'You have ability and inner strength to…',   //'You can often feel at a loss when it comes to making big decisions in your life. Remember, you are the main character in your life story. Each of us has the ability and inner strength to make small changes for the better. Click to learn more'
                si : 'loc 0 sinhala',
                ta : 'loc 0 tamil',
                dv : 'loc 0 dhivehi'
            },
            {
                en : 'Confidence comes from within, and you can find…', //'You can sometimes feel a bit unsure when it comes to making big decisions in your life. Confidence comes from within, and you can find ways to build it. Find out more!'
                si : 'loc 0 sinhala',
                ta : 'loc 0 tamil',
                dv : 'loc 0 dhivehi'
            },
            {
                en : 'Nice one! You are not afraid to make big decisions and..',   //'Nice one! You are not afraid to make big decisions and confident you can accomplish whatever you set your mind to. Find out more.'
                si : 'loc 0 sinhala',
                ta : 'loc 0 tamil',
                dv : 'loc 0 dhivehi'
            },
        ],
        linksPage:[
            //low LOC - 0
            {
                // `From the way you’ve
                // answered, it sounds like you
                // can often feel at a loss when
                // it comes to making big
                // decisions in your life.
                en : `You have ability and inner strength to
                make small changes for the better. 
                You can often feel at a loss when it comes to making big decisions in your life. 
                Remember, you are the main character in your life story.
                
                <br>
                <br>
                In difficult situations or when
                experiencing life’s various
                challenges, you sometimes
                feel bitter towards the world.
                “Why is this happening to
                me?” you ask yourself. “Why
                do I always end up with such
                bad luck?” Even when it
                comes to your successes,
                you can lack faith in your
                own abilities and you find
                yourself downplaying your
                achievements. You
                sometimes have serious
                doubts about whether or not
                you have the power to turn
                your life around when things
                take a turn for the worse.
                Like a leaf blowing in the
                wind, you feel like life steers
                you in all these different
                directions without a moment
                to catch your breath. 
                
                <br>
                <br>
                Even when you feel
                overwhelmed or that
                situations are beyond your
                control, each of us has the
                ability and inner strength to
                make small changes for the
                better. Remember, you are
                the main character in your
                life story. You might not be
                able to change other people
                around you, but you can
                change the way in which you
                feel about them and adapt.
                Take a step back and think:
                what small steps can I take
                in the right direction, right
                now? Rather than focusing
                on the things you cannot
                control, concentrate on what
                you can. Even the littlethings can end up having a
                big impact further down the
                line.
                
                <br>
                <br>
                Need a boost? Check out
                these websites that might be
                helpful to you:`,
                si : `ඔබ පිළිතුරු සපයා තිබෙන ආකාරය අනුව, ඔබගේ ජීවිතය සම්බන්ධ වැදගත් තීරණ ගැනීමේදී ඔබට බොහෝ විට පරාජිත හැඟීමක් දැනෙන බව පෙනේ. 

                <br>
                <br>
                දුෂ්කර තත්වයන්හිදී හෝ ජීවිතයේ විවිධ අභියෝගවලදී ඔබට ඇතැම්විට හැඟෙන්නේ “ඇයි මටම මෙහෙම වෙන්නේ” කියාය. “මටම හැමවිටම මෙවැනි අවාසනාවන් වෙන්නේ ඇයි?” යි කියා ඔබ අසයි. ඔබගේ ජයග්‍රහණවලදී පවා ඔබට ඔබගේ හැකියාවන් ගැන විශ්වාසය අවම විය හැකිය. ඔබ ඔබේ ජයග්‍රහණ සුළුකොට තකයි. නරක දේ සිදුවෙද්දී ඒවා සමග අරගල කිරීමට ඔබට ශක්තිය තිබේදැයි ඇතැම්විට ඔබට සැක සිතෙයි. ඔබට හුස්ම ගන්නත් ඉඩ නොදී, ජීවිතය ඔබ සුළඟේ පාවන තුරු පතක් සේ විවිධ දිශාවලට රැගෙන යන බවක් ඔබට හැඟේ. 
                
                <br>
                <br>
                අධික පීඩනයට ලක්වූ විට හෝ තත්වය ඔබගේ පාලනයෙන් තොර බව හැඟෙන විට පවා, අප හැම කෙනෙකුටම තත්වය වඩා යහපත් කළ හැකි සුළු වෙනස්කම් සිදුකිරීමේ හැකියාව හා අභ්‍යන්තර ශක්තිය තිබේ. ඔබගේ ජීවිත කතාවේ ප්‍රධාන චරිතය ඔබම බව සිතන්න. ඔබට ඔබ වටා සිටින අනෙක් අය වෙනස් කළ නොහැකි වන්නට පුළුවන. එහෙත්, ඔබ එම තත්වයන් ගැන සිතන ආකාරය හා ඒවාට අනුගත වන ආකාරය ඔබට වෙනස් කළ හැකිය. පසුපසට පියවරක් තබා සිතන්න. නිවැරදි දිශාව දෙසට මට මේ දැන් තැබිය හැකි කුඩා පියවරක් තිබේද? ඔබට පාලනය කළ නොහැකි දෙයට වඩා, පාලනය කළ හැකි දෙය කෙරෙහි සිත යොමුකරන්න. සුළු දෙයින් පවා අවසානයේදී ලොකු ප්‍රතිඵල ඇතිවිය හැකිය. 
                
                <br>
                <br>
                දිරිගැන්වීමක් අවශ්‍යද? මෙම වෙබ් අඩවි ඔබට ප්‍රයෝජනවත් විය හැකිය.
                `,
                ta : `நீங்கள் பதிலளித்த விதத்தில் இருந்து, உங்கள் வாழ்க்கையில் பெரிய தீர்மானங்களை எடுக்கும்போது நீங்கள் அடிக்கடி இழப்பை உணரலாம்.
                
                <br>
                <br>
                கடினமான சூழ்நிலைகளில் அல்லது வாழ்க்கையில் பல்வேறு சவால்களை சந்திக்கும் போது, ​​நீங்கள் சில சமயங்களில் உலகத்தின் மீது கசப்பாக உணர்கிறீர்கள். "இது எனக்கு ஏன் நடக்கிறது?" என்றும் "நான் ஏன் எப்பொழுதும் இத்தகைய துரதிர்ஷ்டத்தை அடைந்தேன்?" என்றும் நீங்களே உங்களைக் கேட்டுக் கொள்கின்றீர்கள். உங்கள் வெற்றிகளைப் பொறுத்தவரை, உங்கள் சொந்த திறன்களில் நம்பிக்கை இல்லாமல் இருப்பதுடன்,  உங்கள் சாதனைகளை நீங்கள் குறைத்து மதிப்பிடுவதைக் காணலாம். சில சமயங்களில், விடயங்கள் மோசமான நிலைக்குத் திரும்பும்போது, ​​உங்கள் வாழ்க்கையைத் திருப்ப உங்களுக்கு சக்தி இருக்கிறதா இல்லையா என்பது குறித்து உங்களுக்கு சில நேரங்களில் தீவிர சந்தேகம் இருக்கும். காற்றில் வீசும் இலையைப் போல, உங்கள் மூச்சு விடக்கூட ஒரு நிமிடமும் இல்லாமல் வாழ்க்கை உங்களை வெவ்வேறு திசைகளில் தள்ளுவதைப் போல் உணர்கிறீர்கள்.
                
                <br>
                <br>
                நீங்கள் அதிகமாக உணர்ந்தாலும் அல்லது சூழ்நிலைகள் உங்கள் கட்டுப்பாட்டிற்கு அப்பாற்பட்டதாக இருந்தாலும் கூட, நம் ஒவ்வொருவருக்கும் சிறிய மாற்றங்களைச் செய்யும் திறனும் உள் வலிமையும் உள்ளது. நினைவிற் கொள்ளுங்கள், உங்கள் வாழ்க்கைக் கதையில் நீங்கள் தான் முக்கிய கதாபாத்திரம். உங்களைச் சுற்றியுள்ள மற்றவர்களை உங்களால் மாற்ற முடியாமல் போகலாம், ஆனால் அவர்களைப் பற்றி நீங்கள் உணரும் விதத்தை மாற்றிக்கொள்ளலாம். ஒரு தடவை பின்வாங்கி சிந்தியுங்கள்: இப்போது சரியான திசையில் நான் எவ்வாறு சிறிய காலடி எடுத்துவைக்க முடியும்?. உங்களால் கட்டுப்படுத்த முடியாத விஷயங்களில் கவனம் செலுத்துவதற்குப் பதிலாக, உங்களால் முடிந்தவற்றில் கவனம் செலுத்துங்கள். சிறிய விடயங்கள் கூட பெரிய தாக்கத்தை ஏற்படுத்தும்.
                
                <br>
                <br>
                உங்களுக்கு உந்துதல் தேவையா? உங்களுக்கு உதவியாக இருக்கும் இந்த இணையதளங்களைப் பாருங்கள்:`,
                dv : `From the way you’ve
                answered, it sounds like you
                can often feel at a loss when
                it comes to making big
                decisions in your life. 
                
                <br>
                <br>
                In difficult situations or when
                experiencing life’s various
                challenges, you sometimes
                feel bitter towards the world.
                “Why is this happening to
                me?” you ask yourself. “Why
                do I always end up with such
                bad luck?” Even when it
                comes to your successes,
                you can lack faith in your
                own abilities and you find
                yourself downplaying your
                achievements. You
                sometimes have serious
                doubts about whether or not
                you have the power to turn
                your life around when things
                take a turn for the worse.
                Like a leaf blowing in the
                wind, you feel like life steers
                you in all these different
                directions without a moment
                to catch your breath. 
                
                <br>
                <br>
                Even when you feel
                overwhelmed or that
                situations are beyond your
                control, each of us has the
                ability and inner strength to
                make small changes for the
                better. Remember, you are
                the main character in your
                life story. You might not be
                able to change other people
                around you, but you can
                change the way in which you
                feel about them and adapt.
                Take a step back and think:
                what small steps can I take
                in the right direction, right
                now? Rather than focusing
                on the things you cannot
                control, concentrate on what
                you can. Even the littlethings can end up having a
                big impact further down the
                line.
                
                <br>
                <br>
                Need a boost? Check out
                these websites that might be
                helpful to you:`
            },
            //Mid LOC - 1
            {
                // `From the answers you’ve
                // provided, it sounds like you
                // can sometimes feel a bit
                // unsure when it comes to
                // making big decisions in your
                // life.
                en : `Confidence comes from within, and you can find ways to build it. 
                You can sometimes feel a bit unsure when it comes to making big decisions in your life.

                <br>
                <br>
                People like you feel they
                have control over some of
                the situations and
                experiences that affect them
                but not others. When you
                face a crossroad or
                challenge in your life, you
                can sometimes lose
                confidence and falter, but
                you do find your way in the
                end. You feel like some of
                your successes are your
                own, but find yourself
                making excuses for these,
                telling people that your
                achievements were due to
                luck, or by being in the right
                place at the right time. On
                the other side of the table,
                when life knocks you back,
                you sometimes find yourself
                spending periods of time
                wondering why the universe
                is standing against you. But
                you should be proud of your
                achievements. When it
                comes to difficult life
                choices, have faith in your
                abilities to make the right
                decision for you. You’ve got
                this!

                <br>
                <br>
                Need a bit of advice for that?
                Here are some websites that
                might interest you:`,
                si : `ඔබ විසින් සපයන ලද පිළිතුරුවලින් ඇඟවෙන්නේ, ඔබගේ ජීවිතය සම්බන්ධයෙන් ඉතා වැදගත් තීරණ ගැනීමේදී ඔබ ඇතැම්විට විශ්වාසයෙන් කටයුතු නොකරන බවයි. 

                <br>
                <br>
                ඔබ වැනි පුද්ගලයන් සිතන්නේ, සෙසු අයට නොව, ඔබට බලපාන ඇතැම් තත්වයන් හා අත්දැකීම් සම්බන්ධයෙන් ඔබට පාලනයක් තිබෙන බවයි. ඔබ ජීවිතයේ ගැටලුවකට හෝ අභියෝගයකට මුහුණදුන් විට, ඇතැම්විට ඔබගේ ආත්ම විශ්වාසය ගිලිහීගොස් පසුබැසීමක් සිදුවිය හැකිය. එහෙත්, අවසානයේදී ඔබ ගත යුතු මාර්ගය සොයාගනියි. ඔබගේ ඇතැම් සාර්ථකත්වයන් ඔබගේම ඒවා යයි ඔබ සිතයි. එහෙත්, ඔබ එය විවෘතව කියන්නට මැලිවෙයි. ඔබගේ සාර්ථකත්වයට හේතුව වාසනාව හෝ අහම්බයකැයි කියයි. මේ අතරතුර, මුළු ලෝකයම ඔබට එරෙහිව නැගී සිටින්නේ මන්දැයි කල්පනා කිරීමට ද ඔබ ඇතැම්විට විශාල කාලයක් ගතකරයි. එහෙත්, ඔබ ඔබගේ ජයග්‍රහණ සම්බන්ධයෙන් ආඩම්බර විය යුතුය. ජීවිතය සම්බන්ධ දුෂ්කර තෝරාගැනීම් කිරීමට සිදුවූ විටදී, නිවැරදි තීරණ ගැනීම සඳහා ඔබගේ හැකියාවන් පිළිබඳ විශ්වාසය තබන්න. ඔබට එය වැටහේ. 
                
                <br>
                <br>
                ඒ සම්බන්ධ උපදෙස් අවශ්‍යද?  මෙහි දැක්වෙන්නේ ඒ සඳහා වෙබ් අඩවි කීපයකි.
                `,
                ta : `நீங்கள் வழங்கிய பதில்களிலிருந்து, உங்கள் வாழ்க்கையில் பெரிய தீர்மானங்களை எடுக்கும்போது சில சமயங்களில் நீங்கள் சற்று உறுதியற்றதாக உணரலாம்.
                
                <br>
                <br>
                உங்களைப் போன்றவர்கள் தங்களைப் பாதிக்கும் சில சூழ்நிலைகள் மற்றும் அனுபவங்களின் மீது கட்டுப்பாட்டைக் கொண்டிருப்பதாக உணர்கின்றதுடன், ஆனால் மற்றையவர்களின் மீது அல்ல. உங்கள் வாழ்க்கையில் ஒரு  வழி அல்லது சவாலை நீங்கள் எதிர்கொள்ளும்போது, ​​நீங்கள் சில சமயங்களில் நம்பிக்கையை இழந்து தடுமாறலாம், ஆனால் இறுதியில் உங்கள் வழியை நீங்கள் கண்டுபிடிப்பீர்கள். உங்களின் சில வெற்றிகள் உங்களுக்கே சொந்தம் என நீங்கள் உணர்கிறீர்கள், ஆனால் நீங்கள் இவற்றுக்கு சாக்குப்போக்குகளை கூறி, உங்கள் சாதனைகள் அதிர்ஷ்டம் அல்லது சரியான நேரத்தில் சரியான இடத்தில் இருப்பதன் மூலம் உங்களின் சாதனைகள் ஏற்பட்டதாக மக்களிடம் சொல்லுகிறீர்கள். மறுபக்கத்தில், வாழ்க்கை உங்களைப் பின் தள்ளும் போது, ​​பிரபஞ்சம் ஏன் உங்களுக்கு எதிராக நிற்கின்றது என்று அதிசயித்து அதை கண்டறிய நீங்கள் சில சமயங்களில் நேரத்தைச் செலவிடுவதைக் காணலாம். ஆனால் உங்களின் சாதனைகளைப் பற்றி நீங்கள் பெருமைப்பட வேண்டும். கடினமான வாழ்க்கைத் தெரிவுகள் என்று வரும்போது, ​​உங்களுக்கான சரியான தீர்மானத்தை எடுப்பதற்கான உங்கள் திறன்களில் நம்பிக்கை வைத்திருங்கள். உங்களுக்கு இது கிடைத்திருக்கின்றது!
                
                <br>
                <br>
                அதற்கான சிறிது  ஆலோசனை வேண்டுமா? உங்களுக்கு ஆர்வமூட்டக்கூடிய சில இணையதளங்கள் இதோ:`,
                dv : `From the answers you’ve
                provided, it sounds like you
                can sometimes feel a bit
                unsure when it comes to
                making big decisions in your
                life.

                <br>
                <br>
                People like you feel they
                have control over some of
                the situations and
                experiences that affect them
                but not others. When you
                face a crossroad or
                challenge in your life, you
                can sometimes lose
                confidence and falter, but
                you do find your way in the
                end. You feel like some of
                your successes are your
                own, but find yourself
                making excuses for these,
                telling people that your
                achievements were due to
                luck, or by being in the right
                place at the right time. On
                the other side of the table,
                when life knocks you back,
                you sometimes find yourself
                spending periods of time
                wondering why the universe
                is standing against you. But
                you should be proud of your
                achievements. When it
                comes to difficult life
                choices, have faith in your
                abilities to make the right
                decision for you. You’ve got
                this!

                <br>
                <br>
                Need a bit of advice for that?
                Here are some websites that
                might interest you:`
            },
            //High LOC - 2
            {
                // `Nice one! It sounds like you
                // feel reasonably empowered
                // when it comes to making big
                // decisions about which path
                // in life to take!
                en : `Nice one! You are not afraid to make big decisions and confident. You can accomplish whatever you set your mind to.

                <br>
                <br>
                People like you generally
                feel they have control over
                situations that affect them.
                When it comes to things like
                education and employment,
                you feel that your successes
                are to a large extent due to
                your own hard work and
                perseverance, rather than a
                product of society or
                systems around you. When
                it comes to challenges and
                struggles, you feel these are
                temporary because, despite
                life’s knocks and tumbles,
                you have the power and
                motivation within you to
                change your circumstances.
                You know that things will get
                better in the future if you
                maintain your proactive
                attitude.
                
                <br>
                <br>
                But sometimes there are
                people who don’t feel this
                way. They can feel trapped,
                like their options and
                opportunities are limited,
                and that they have to live
                with their lot. People like you
                can make a huge difference
                by helping others see
                beyond the confines of their
                immediate situation and
                lifting them up to realise they
                do have the power to take
                back control over their own
                lives.

                <br>
                <br>
                Want to help, but need some
                advice? Check out these
                helpful websites:`,
                si : `කදිමයි! ජීවිතයේදී ඔබ ගත යුතු මාර්ගය සම්බන්ධයෙන් වැදගත් තීරණ ගැනීමේදී ඔබ සෑහෙන දුරට සවිබලගැන්වී සිටින බව පෙනේ. 

                <br>
                <br>
                ඔබ වැනි ජනයා සාමාන්‍යයෙන් සිතන්නේ තමන්ට බලපාන තත්වයන් සම්බන්ධයෙන් තමන්ට පාලනය ඇති බවයි. අධ්‍යාපනය සහ රැකියා වැනි කාරණාවලදී ඔබගේ සාර්ථකත්වය වැඩියෙන් රඳාපවතින්නේ ඔබගේම සාර්ථකත්වය මත හා උද්‍යෝගය මත බවයි. එසේ නොමැතිව සමාජයේ හෝ ඔබ වටා තිබෙන ක්‍රමය මත නොවේ. අභියෝග හා අරගල සම්බන්ධයෙන් සැලකූ විට, ඔබ සිතන්නේ ඒවා තාවකාලික බවයි. හේතුව, ජීවිතයේ කුමන අභියෝග මතු වුවත්, තත්වයන් වෙනස් කරගැනීම සඳහා අවශ්‍ය බලය හා අභිප්‍රේරණය ඔබ සතුය. ඔබගේ ප්‍රගාමී ආකල්ප පවත්වාගෙන ගියහොත්, අනාගතයේදී තත්වයන් වෙනස් වන බව ඔබ දනී. 
                
                <br>
                <br>
                එහෙත්, ඇතැම්විට, ඒ අන්දමින් නොසිතන අය ද සිටිති. ඔවුන්ට තමන් උගුලක අසුවී සිටින බවක් සිතේ. ඔවුන්ගේ විකල්ප හා අවස්ථා සීමිත බව දැනේ. ඔවුන්ට එම තත්වය දරාගැනීමට සිදුවේ යයි සිතේ. වෙනත් අයට තම ආසන්න තත්වයේ සීමාවෙන් ඔබ්බට දැකීමට උපකාර කිරීම මගින් තම ජීවිතවල පාලනය යළි සියතට ගැනීමට බලය තිබෙන බව අවබෝධ කර දීමට ඔබ වැනි පුද්ගලයන්ට හැකිය.   
                
                <br>
                <br>
                උපකාර කිරීමට කැමතිද? ඒ සම්බන්ධ උපදෙස් අවශ්‍ය නම්, මෙම වෙබ් අඩවි බලන්න: 
                `,
                ta : `அழகானது! வாழ்க்கையில் எந்தப் பாதையில் செல்வது என்பது குறித்து பெரிய தீர்மானங்களை எடுக்கும்போது நீங்கள் நியாயமான முறையில் வலுவூட்டப்படுவது போல் தெரிகிறது!
                
                <br>
                <br>
                உங்களைப் போன்றவர்கள் பொதுவாக தங்களைப் பாதிக்கும் சூழ்நிலைகளில் கட்டுப்பாட்டைக் கொண்டிருப்பதாக உணர்கிறார்கள். கல்வி மற்றும் வேலைவாய்ப்பு போன்ற விடயங்களில், உங்கள் வெற்றிகள் பெருமளவிற்கு உங்களைச் சுற்றியுள்ள சமூகம் அல்லது அமைப்புகளின் உருவாக்கத்திலும் பார்க்க உங்கள் சொந்த உழைப்பு மற்றும் விடாமுயற்சியின் காரணமாக இருப்பதாக நீங்கள் உணர்கிறீர்கள். சவால்கள் மற்றும் போராட்டங்கள் என்று வரும்போது, ​​இவை தற்காலிகமானவை என்று நீங்கள் உணர்கிறீர்கள், ஏனெனில், வாழ்க்கையில் தடைகள் மற்றும் தடுமாற்றங்கள் வந்தபோதிலும், உங்கள் சூழ்நிலைகளை மாற்றுவதற்கான சக்தியும் உந்துதலும் உங்களுக்குள் உள்ளது. நீங்கள் முன்னெச்சரிக்கை நடத்தையை கடைப்பிடித்தால் எதிர்காலத்தில் விடயங்கள் சிறப்பாக இருக்கும் என்பதை நீங்கள் அறிவீர்கள். 
                
                <br>
                <br>
                ஆனால் சில நேரங்களில் இதை உணராதவர்கள் இருக்கிறார்கள். அவர்கள் தாம் அதிகமாக வாழ வேண்டும் என எண்ணுகையில் தங்களின் தெரிவுகள் மற்றும் வாய்ப்புகள் மட்டுப்படுத்தப்பட்டிருக்கும் போது தாம் பொறியில் சிக்கிக் கொண்டுள்ளதாக உணர முடியும். உங்களைப் போன்றவர்கள் மற்றவர்களுக்கு அவர்களின் உடனடி சூழ்நிலையின் எல்லைகளுக்கு அப்பால் பார்க்க உதவுவதன் மூலமும், அவர்கள் சொந்த வாழ்க்கையை மீண்டும் கட்டுப்படுத்தும் சக்தி தங்களுக்கு இருப்பதை உணர்ந்து அவர்களை உயர்த்துவதன் மூலமும் மிகப்பெரிய மாற்றத்தை ஏற்படுத்த முடியும்.
                
                <br>
                <br>
                உதவ விரும்புகிறீர்களா, ஆனால் சில ஆலோசனைகள் தேவையா? இந்த பயனுள்ள இணையதளங்களைப் பாருங்கள்:`,
                dv : `Nice one! It sounds like you
                feel reasonably empowered
                when it comes to making big
                decisions about which path
                in life to take!

                <br>
                <br>
                People like you generally
                feel they have control over
                situations that affect them.
                When it comes to things like
                education and employment,
                you feel that your successes
                are to a large extent due to
                your own hard work and
                perseverance, rather than a
                product of society or
                systems around you. When
                it comes to challenges and
                struggles, you feel these are
                temporary because, despite
                life’s knocks and tumbles,
                you have the power and
                motivation within you to
                change your circumstances.
                You know that things will get
                better in the future if you
                maintain your proactive
                attitude.
                
                <br>
                <br>
                But sometimes there are
                people who don’t feel this
                way. They can feel trapped,
                like their options and
                opportunities are limited,
                and that they have to live
                with their lot. People like you
                can make a huge difference
                by helping others see
                beyond the confines of their
                immediate situation and
                lifting them up to realise they
                do have the power to take
                back control over their own
                lives.

                <br>
                <br>
                Want to help, but need some
                advice? Check out these
                helpful websites:`
            },
        ]
    }
     
    const locValue = parseInt(loc)

    resultSubText.innerText = langTexts.resultsPage[locValue][langId]
    linkResultSubText.innerHTML = langTexts.linksPage[locValue][langId]
}

const image_Loc1 = "https://www.gstatic.com/webp/gallery/1.jpg";
const image_Loc2 = "https://www.gstatic.com/webp/gallery/2.jpg";
const image_Loc3 = "https://www.gstatic.com/webp/gallery/3.jpg";

export function updateResultTitle(loc){     //LOC 2 = High, 1 = Middle, 0 = Low
    console.log("Loc calculated = ", loc);
    resultTitle.innerText = allTexts.resultTitle[parseInt(loc)][langId];
    linkResultTitle.innerText = allTexts.resultTitle[parseInt(loc)][langId];

    updateResultLinks(loc)
    updateResultSubtexts(loc)
    updateSubmitModel(loc)

    //document.getElementsByTagName('meta')["og:url"].content = document.URL;
    //document.getElementsByTagName('meta')["twitter:domain"].content = document.URL;
    const changeSeekerHtml = "changeseeker.html";
    const mapMakerHtml = "mapmaker.html";
    const adventurerHtml = "adventurer.html";
    var finalHtml = 0;
    if(loc == 0){
        finalHtml = changeSeekerHtml;
    }
    else if(loc == 1){
        finalHtml = mapMakerHtml;
    }
    else{
        finalHtml = adventurerHtml;
    }

    var lodURL = "http://quiz-extremelives.tk/" + finalHtml;
    var FB_URL = "https://www.facebook.com/sharer/sharer.php?u=" + lodURL + "&quote=" + "I am the Change Seeker. Do you want to take a test?";
    var twitter_URL = "https://twitter.com/intent/tweet?text=" + "I am the Change Seeker or the Palm Reader. " + "Do you want to take a test? " + "Link :- " + lodURL;

    switch(loc){
        case 0:
            document.getElementsByTagName('meta')["og:image"].content = image_Loc1;
            document.getElementsByTagName('meta')["twitter:image"].content = image_Loc1;
            document.getElementById('facebook-share').setAttribute("href", FB_URL);
            document.getElementById('twitter-share').setAttribute("href", twitter_URL);
            break;
        case 1:
            document.getElementsByTagName('meta')["og:image"].content = image_Loc2;
            document.getElementsByTagName('meta')["twitter:image"].content = image_Loc2;
            FB_URL = "https://www.facebook.com/sharer/sharer.php?u=" + lodURL + "&quote=" + "I am the map maker. Do you want to take a test?";
            document.getElementById('facebook-share').setAttribute("href", FB_URL);

            twitter_URL = "https://twitter.com/intent/tweet?text=" + "I am the map maker. " + "Do you want to take a test? " + "Link :- " + lodURL;
            document.getElementById('twitter-share').setAttribute("href", twitter_URL);
            break;
        case 2:
            document.getElementsByTagName('meta')["og:image"].content = image_Loc3;
            document.getElementsByTagName('meta')["twitter:image"].content = image_Loc3;
            FB_URL = "https://www.facebook.com/sharer/sharer.php?u=" +lodURL + "&quote=" + "I am the adventurer. Do you want to take a test?";
            document.getElementById('facebook-share').setAttribute("href", FB_URL);

            twitter_URL = "https://twitter.com/intent/tweet?text=" + "I am the adventurer. " + "Do you want to take a test? " + "Link :- " + lodURL;
            document.getElementById('twitter-share').setAttribute("href", twitter_URL);
            break;
    }
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

export function setEmailSubmitIndicatorText(message){
    const langTexts = {
        success:{
            en:'email submitted',
            si:'ඊමේල් ඉදිරිපත් කරන ලදී',
            ta:'மின்னஞ்சல் சமர்ப்பிக்கப்பட்டது',
            dv:'email submitted',
        },
        failed:{
            en:'failed to submit email',
            si:'ඊමේල් ඉදිරිපත් කිරීමට අපොහොසත් විය',
            ta:'மின்னஞ்சலைச் சமர்ப்பிக்க முடியவில்லை',
            dv:'failed to submit email',
        }
    }

    const emailSubmitIndicator = document.getElementById('links-email-submit-indicator')
    emailSubmitIndicator.innerText = langTexts[message][langId]

    switch(langId){
        case'en':
            emailSubmitIndicator.style.fontSize = '1em'
            break;
        case'si':
            emailSubmitIndicator.style.fontSize = '0.8em'
            break;
        case'ta':
            emailSubmitIndicator.style.fontSize = '0.6em'
            break;
        case'dv':
            emailSubmitIndicator.style.fontSize = '0.8em'
            break;
    
    }

    switch(message){
        case 'success':
            emailSubmitIndicator.style.color = '#cbfa01'
            break;
        case 'failed':
            emailSubmitIndicator.style.color = '#ff2b2b'
            break;
    }
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
    
    let genderMiddleChildrenMargin = ((genderScrollContainer.offsetHeight/2) - genderFirstChildItem.offsetHeight * 4)/3

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
    setGenderFarthestStyle(genderItems[3])

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

    if(genderItems[genderCurrentItemIndex + 1]) setGenderNearestStyle(genderItems[genderCurrentItemIndex + 1])
    if(genderItems[genderCurrentItemIndex + 2]) setGenderFarthestStyle(genderItems[genderCurrentItemIndex + 2])
    if(genderItems[genderCurrentItemIndex + 3]) setGenderFarthestStyle(genderItems[genderCurrentItemIndex + 3])

    // if(genderCurrentItemIndex < (genderItems.length - 2)){
    //     setGenderNearestStyle(genderItems[genderCurrentItemIndex + 1])
    //     setGenderFarthestStyle(genderItems[genderCurrentItemIndex + 2])
    // }else if (genderCurrentItemIndex === (genderItems.length - 2)){
    //     setGenderNearestStyle(genderItems[genderCurrentItemIndex + 1])
    // }
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
    let ageMiddleChildrenMargin = ((ageScrollContainer.offsetHeight/2) - ageFirstChildItem.offsetHeight * 4)/3

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
    setAgeFarthestStyle(ageItems[3])


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
    if(ageItems[ageCurrentItemIndex + 1]) setAgeNearestStyle(ageItems[ageCurrentItemIndex + 1]) 
    if(ageItems[ageCurrentItemIndex + 2]) setAgeFarthestStyle(ageItems[ageCurrentItemIndex + 2]) 
    if(ageItems[ageCurrentItemIndex + 3]) setAgeFarthestStyle(ageItems[ageCurrentItemIndex + 3]) 

    // if(ageCurrentItemIndex < (ageItems.length - 2)){
    //     setAgeNearestStyle(ageItems[ageCurrentItemIndex + 1])
    //     setAgeFarthestStyle(ageItems[ageCurrentItemIndex + 2])
    // }else if (ageCurrentItemIndex === (ageItems.length - 2)){
    //     setAgeNearestStyle(ageItems[ageCurrentItemIndex + 1])
    // }


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
let mouseMoved = false

function mouseDownHandler(e){
    mouseMoved = false

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
    mouseMoved = true

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

    if(!mouseMoved){
        // console.log(e.clientY);
        // console.log(e.offsetY);
        // console.log(elementToScroll.clientHeight/2)

        const scrollValue = e.offsetY - (elementToScroll.clientHeight/2) + pos.top
        // console.log(scrollValue);

        if(elementToScroll === vidQuestionScrollContainer){
            elementToScroll.scroll({
                top:scrollValue,
                behavior:'smooth'
            })
        }
        else{
            if(scrollValue > pos.top){
                elementToScroll.scroll({
                    top:scrollValue,
                    behavior:'smooth'
                })
            }
        }
    }
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
        setPlayerRotationLikert5(3)
    }

    questionContainer.style.display = ''
    // questionText.replace('mother', '<span class="highlightText">'+'mother'+'</span>')
    // questionText = '<mark>'+ questionText +'</mark>'

    switch(langId){
        case 'en':
            const enBaseSize = 0.6
            const enSizeIncrementRate = 5 
            const enBaseSizeOffset = (enSizeIncrementRate/questionText.length)
            console.log(enBaseSizeOffset);
            
            const enNewBaseSize = enBaseSize + enBaseSizeOffset
            const enNewStyle = 'calc(' + enNewBaseSize + 'em + 0.5vw + 0.3vh)'
            console.log(enNewStyle);

            questionContainer.style.fontSize = enNewStyle
            break
        case 'si':
            const siBaseSize = 0.4

            const siSizeIncrementRate = 5 
            const siBaseSizeOffset = (siSizeIncrementRate/questionText.length)
            console.log(siBaseSizeOffset);
            
            const siNewBaseSize = siBaseSize + siBaseSizeOffset
            const siNewStyle = 'calc(' + siNewBaseSize + 'em + 0.5vw + 0.3vh)'
            console.log(siNewStyle);

            questionContainer.style.fontSize = siNewStyle
            // questionContainer.style.fontSize = 'calc(0.6em + 1vw)'
            break
        case 'ta':
            const taBaseSize = 0.4

            const taSizeIncrementRate = 5 
            const taBaseSizeOffset = (taSizeIncrementRate/questionText.length)
            console.log(taBaseSizeOffset);
            
            const taNewBaseSize = taBaseSize + taBaseSizeOffset
            const taNewStyle = 'calc(' + taNewBaseSize + 'em + 0.5vw + 0.3vh)'
            console.log(taNewStyle);

            questionContainer.style.fontSize = taNewStyle

            // questionContainer.style.fontSize = 'calc(0.5em + 1vw)'
            break
        case 'dv':
            const dvBaseSize = 0.4

            const dvSizeIncrementRate = 5 
            const dvBaseSizeOffset = (dvSizeIncrementRate/questionText.length)
            console.log(dvBaseSizeOffset);
            
            const dvNewBaseSize = dvBaseSize + dvBaseSizeOffset
            const dvNewStyle = 'calc(' + dvNewBaseSize + 'em + 0.5vw + 0.3vh)'
            console.log(dvNewStyle);

            questionContainer.style.fontSize = dvNewStyle

            // questionContainer.style.fontSize = 'calc(0.6em + 1vw)'
            break
    }


    // questionContainer.innerText = questionText
    questionContainer.innerHTML = questionText

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
            countryLabelContainer.style.display = ''
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
            countryLabelContainer.style.display = 'none'
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
            countryLabelContainer.style.display = 'none'

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
            countryLabelContainer.style.display = 'none'
            fadeInSliderContainer()
            // enableConfirmation(joystickSlideValue);
            enableConfirmation(Math.round((parseInt(joystickSlideValue)+50)/14.2857));
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
            countryLabelContainer.style.display = 'none'
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
            countryLabelContainer.style.display = 'none'
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
            countryLabelContainer.style.display = 'none'
            FadeInLikert7()
            //enableConfirmation(0)
            break;
    }
}

export function enableSubmitPage(){
    submitContainer.style.display = ''
    submitConfirmationContainer.style.display = ''
    resultsConfirmationContainer.style.display = 'none'
    submitLoadingContainer.style.display = 'none'
    uiHolder.style.display = 'none'
    resetPlayerRotation()
    FadeOutLikert7()
    // disableResultsContainer()
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
    vidQuestionCalculateMargins();
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

export function setMaldivesLabelPosition(left,top){
    maldivesLabel.style.top = top + 'px'
    maldivesLabel.style.left = left + 'px'
}

export function setSriLankaLabelPosition(left,top){
    sriLankaLabel.style.top = top + 'px'
    sriLankaLabel.style.left = left + 'px'
}

export function resetLabels(){
    maldivesLabel.classList.remove('unselected')
    maldivesLabel.classList.remove('hidden')

    sriLankaLabel.classList.remove('unselected')
    sriLankaLabel.classList.remove('hidden')
}

export function setMaldivesSelected(){
    maldivesLabel.classList.remove('unselected')
    maldivesLabel.classList.add('hidden')

    sriLankaLabel.classList.add('unselected')
    sriLankaLabel.classList.remove('hidden')
}

export function setSriLankaSelected(){
    sriLankaLabel.classList.remove('unselected')
    sriLankaLabel.classList.add('hidden')

    maldivesLabel.classList.add('unselected')
    maldivesLabel.classList.remove('hidden')
}

let progressBar = require('progressbar.js')
let submitLoadingBar = new progressBar.Circle('#submit-progress-bar-container' /* Element that will contain SVG generated by progressbar.js */,{ 
    //add necessary styling/properties. Refer https://progressbarjs.readthedocs.io/en/latest/api/shape/ 
    trailColor:"#cfcfcf",
    trailWidth:"7",
    strokeWidth:"7",
    color:'url(#loading-bar-gradient-2)',
    text:{
        className:"submit-progress-bar-text",
        autoStyleContainer:"false",
        style:{
            position:"absolute",
            top:"0px",
            width:"100%",
            height:"100%",
            color:"white",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            fontWeight:"600",
            zIndex:"3",
            fontFamily: '"Rubik",sans-serif',
            fontSize: '1em',
            opacity:'0.8'
        }
    },
    step: function(state, circle) {
        var value = Math.round(circle.value() * 100);
        circle.setText(value);
        if(value >= 100){
            // main.startSurvey()
            enableResultsContainer()
        }
    },
    svgStyle:{
        position:"relative",
        strokeLinecap:"round",
        zIndex:"3"
    }
})

const loadingBarGradient = `
    <defs>
        <linearGradient id="loading-bar-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#FF9494;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#DAFD04;stop-opacity:1" />
        </linearGradient>
    </defs>
`

submitLoadingBar.svg.insertAdjacentHTML('afterbegin',loadingBarGradient)


export function enableResultsLoadingContainer(){
    submitConfirmationContainer.style.display = 'none'
    resultsConfirmationContainer.style.display = 'none'
    submitLoadingContainer.style.display = ''

    submitLoadingBar.set(0)

    submitLoadingBar.animate(1,{
        duration:1500
    })
}

function enableResultsContainer(){
    submitConfirmationContainer.style.display = 'none'
    resultsConfirmationContainer.style.display = ''
    submitLoadingContainer.style.display = 'none'
}

function disableResultsContainer(){
    submitConfirmationContainer.style.display = ''
    resultsConfirmationContainer.style.display = 'none'
    submitLoadingContainer.style.display = 'none'
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
    // enableResultsContainer()
    // enableResultsLoadingContainer()
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


