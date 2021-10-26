import * as main from '../script'

//Ui control

//UI elements

//question answer containers
let questionContainer = document.getElementById('question-container')
let mcqAnswerContainer = document.getElementById('mcq-answer-container')// answer container holds the answer buttons for MCQ
let joystickAnswerContainer = document.getElementById('joystick-answer-container')
let countryAnswerContainer = document.getElementById('country-answer-container')
let regionAnswerContainer = document.getElementById('region-answer-container')
let joystickTutorialContainer = document.getElementById('joystick-tutorial-frame')
<<<<<<< HEAD
// let countrySkipContainer = document.getElementById('country-skip-container')
=======
let sliderFiller = document.getElementById('Slider_Filler')
let sliderHolder = document.getElementById('slider-holder')

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
>>>>>>> 8bf5c1f54ac3927436d934c3edce788a13aa00d7
let submitContainer = document.getElementById('submit-container') 

//Pagination
let countryPage_dot = document.getElementById('country_selection_dot');
let regionPage_dot = document.getElementById('region_selection_dot');
let question1_dot = document.getElementById('question1_dot');
let question2_dot = document.getElementById('question2_dot');
let question3_dot = document.getElementById('question3_dot');
let question4_dot = document.getElementById('question4_dot');
paginate(0);

export function paginate(quesIndex){
    countryPage_dot.className = 'pagination__dot';
    regionPage_dot.className = 'pagination__dot';
    question1_dot.className = 'pagination__dot';
    question2_dot.className = 'pagination__dot';
    question3_dot.className = 'pagination__dot';
    question4_dot.className = 'pagination__dot';
    switch(quesIndex){
        case 0:
            countryPage_dot.className = 'pagination__dot pagination__dot--active';
            break;
        case 1:
            regionPage_dot.className = 'pagination__dot pagination__dot--active';
            break;
        case 2:
            question1_dot.className = 'pagination__dot pagination__dot--active';
            break;
        case 3:
            question2_dot.className = 'pagination__dot pagination__dot--active';
            break;
        case 4:
            question3_dot.className = 'pagination__dot pagination__dot--active';
            break;
        case 5:
            question4_dot.className = 'pagination__dot pagination__dot--active';
            break;
    }
}

let joystickSlider = document.getElementById('myRange');
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
let backButton = document.getElementById('control-back-button')
let nextButton = document.getElementById('control-next-button')
let regionSkipButton = document.getElementById('country-skip-button')
let submitButton = document.getElementById('submit-button')
let joystickTutCloseButton = document.getElementById('joystick-tutorial-close-button');

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
            if(answers){
                for (let i = 0; i < answers.length; i++) {
                    // creating a new answer box with text and radio buttons for each in answer for MCQs
                    const answer = answers[i];
                    
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

export function enableSubmitPage(){
    submitContainer.style.display = ''
}

export function disableSubmitPage(){
    submitContainer.style.display = 'none'
}

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
            console.log("answer confirmed")
            main.saveCurrentAnswer(selectedAnswerIndex)
        }
        main.loadNextQuestion()   
    }
})

regionSkipButton.addEventListener('click',function(){
    main.skipCountrySelection()
})

submitButton.addEventListener('click',function(){
    main.validateAnswers()
})
