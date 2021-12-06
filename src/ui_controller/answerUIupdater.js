import { TubeBufferGeometry } from "three"
import { confirmedAnswers } from "../script"
import * as questions from '../questions/questions'
import * as controls from '../character_controller/character_control'

const likert5_1 = document.getElementById('1')
const likert5_2 = document.getElementById('2')
const likert5_3 = document.getElementById('3')
const likert5_4 = document.getElementById('4')
const likert5_5 = document.getElementById('5')

const likert4_1 = document.getElementById('likert4-1')
const likert4_2 = document.getElementById('likert4-2')
const likert4_3 = document.getElementById('likert4-3')
const likert4_4 = document.getElementById('likert4-4')

const likert7_1 = document.getElementById('likert7-1')
const likert7_2 = document.getElementById('likert7-2')
const likert7_3 = document.getElementById('likert7-3')
const likert7_4 = document.getElementById('likert7-4')
const likert7_5 = document.getElementById('likert7-5')
const likert7_6 = document.getElementById('likert7-6')
const likert7_7 = document.getElementById('likert7-7')

function resetAllAnswers(){
    likert5_1.checked = false
    likert5_2.checked = false
    likert5_3.checked = false
    likert5_4.checked = false
    likert5_5.checked = false

    likert4_1.checked = false
    likert4_2.checked = false
    likert4_3.checked = false
    likert4_4.checked = false

    likert7_1.checked = false
    likert7_2.checked = false
    likert7_3.checked = false
    likert7_4.checked = false
    likert7_5.checked = false
    likert7_6.checked = false
    likert7_7.checked = false
}
resetAllAnswers()

export const updateLikert5 = function(value){
    //console.log("Value = ", value)
    likert5_1.checked = false
    likert5_2.checked = false
    likert5_3.checked = false
    likert5_4.checked = false
    likert5_5.checked = false
    if(value){
        switch(value){
            case '1':
                likert5_1.checked = true
                controls.setPlayerRotationForLikert5(1)
                break
            case '2':
                likert5_2.checked = true
                controls.setPlayerRotationForLikert5(2)
                break
            case '3':
                likert5_3.checked = true
                controls.setPlayerRotationForLikert5(3)
                break
            case '4':
                likert5_4.checked = true
                controls.setPlayerRotationForLikert5(4)
                break
            case '5':
                likert5_5.checked = true
                controls.setPlayerRotationForLikert5(5)
                break
        }
    }
    else
        controls.resetPlayerRotation()
    // questions.setPlayerRotationLikert5(3)
}

export const updateLikert4 = function(value){
    likert4_1.checked = false
    likert4_2.checked = false
    likert4_3.checked = false
    likert4_4.checked = false
    if(value){
        switch(value){
            case '1':
                likert4_1.checked = true
                controls.setPlayerRotationForLikert4(1)
                break;
            case '2':
                likert4_2.checked = true
                controls.setPlayerRotationForLikert4(2)
                break;
            case '3':
                likert4_3.checked = true
                controls.setPlayerRotationForLikert4(3)
                break;
            case '4':
                likert4_4.checked = true
                controls.setPlayerRotationForLikert4(4)
                break;
        }
    }
    else
        controls.resetPlayerRotation()
}

export const updateLikert7 = function(value){
    likert7_1.checked = false
    likert7_2.checked = false
    likert7_3.checked = false
    likert7_4.checked = false
    likert7_5.checked = false
    likert7_6.checked = false
    likert7_7.checked = false
    if(value){
        switch(value){
            case '1':
                likert7_1.checked = true
                controls.setPlayerRotationForLikert7(1)
                break;
            case '2':
                likert7_2.checked = true
                controls.setPlayerRotationForLikert7(2)
                break;
            case '3':
                likert7_3.checked = true
                controls.setPlayerRotationForLikert7(3)
                break;
            case '4':
                likert7_4.checked = true
                controls.setPlayerRotationForLikert7(4)
                break;
            case '5':
                likert7_5.checked = true
                controls.setPlayerRotationForLikert7(5)
                break;
            case '6':
                likert7_6.checked = true
                controls.setPlayerRotationForLikert7(6)
                break;
            case '7':
                likert7_7.checked = true
                controls.setPlayerRotationForLikert7(7)
                break;
        }
    }
    else
        controls.resetPlayerRotation()
}