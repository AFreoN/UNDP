import {mainScene} from '../script'
import * as assetLoader from '../assets_loader/assets_loader'

//      Assigning questions and answers
//
let questionArray = [
    /* Code snippet for question structure. Each object represents a single question and a set of answers
    {
        questionType: 'mcq | joystick', //Type of the question, Can be used for changing UI
        question: 'Question text', //Question text, which will be displayed on UI
        answers: [ //Answers should be written in a meaningful order to be easy to calculate LOC(eg- Not Close being first and Very Close being last etc...)
            'answer1',
            'answer2'
        ]
        centerModel: assetLoader.getModel('modelKey') //If available
    } 
    */
] 
//
//      end of Assigning questions and answers

export function loadQuestion(questionIndex){
    const questionObject = questionArray[questionIndex]
    
}
