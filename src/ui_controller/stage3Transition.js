import * as THREE from 'three'
import * as uiController from "./ui_controller"

const questionContainer = document.getElementById('question-container')
questionContainer.style.animation = 'none'

let animate = false
let onFadeOut = true
let callBackFunction

const styleFadeIn = 'fadein'
const styleFadeOut = 'fadeout'
let transitionStyle

const fadeOutAnimation = 'questionContainerFadeOut 0.5s ease-out 0s 1 normal forwards'
const fadeInAnimation = 'questionContainerFadeIn 0.5s linear 0s 1 normal forwards'
const fadeOutDuration = 0.5
const fadeInDuration = 0.5
var timer = 0

const clock = new THREE.Clock()
let prevTime = clock.getElapsedTime()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltatime = elapsedTime - prevTime
    prevTime = elapsedTime
    //console.log("Runningt")

    if(animate){
        timer += deltatime
        //console.log("Timer running = ", timer)

        if(onFadeOut){
            if(timer >= fadeOutDuration){
                onFadeOut = false
                timer = 0
                resetElementAnimation(questionContainer)
                questionContainer.style.animation = fadeInAnimation
                callBackFunction()
            }
        }
        else{
            if(timer >= fadeInDuration){
                animate = false
                onFadeOut = true
                timer = 0
                questionContainer.style.animation = 'none'

                uiController.enableBackButton()
                uiController.enableNextButton()
            }
        }
    }

    window.requestAnimationFrame(tick);
}
tick()

export const startFadeIn = function(){
    resetElementAnimation(questionContainer)
    questionContainer.style.animation = fadeInAnimation
    onFadeOut = false
    timer = 0
    animate = true

    uiController.enableBackButton()
    uiController.enableNextButton()
}

export const startFadeOut = function(_callBack){
    resetElementAnimation(questionContainer)
    questionContainer.style.animation = fadeOutAnimation
    callBackFunction = _callBack
    onFadeOut = true
    timer = 0
    animate = true

    uiController.disableBackButton()
    uiController.disableNextButton()
}

const resetElementAnimation = function(element){
    element.style.animation = 'none'
    element.offsetHeight;
    element.style.animation = ''
}