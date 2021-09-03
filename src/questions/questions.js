import {mainScene} from '../script'
import * as assetLoader from '../assets_loader/assets_loader'
import * as uiControl from '../ui_controller/ui_controller'

//      Assigning questions and answers
//
let questionArray = [
    /* Code snippet for question structure. Each object has a single question and a set of answers
    {
        type: 'mcq | joystick', //Type of the question, Can be used for changing UI
        question: 'Question text', //Question text, which will be displayed on UI
        answers: [ //Answers should be written in a meaningful order to be easy to calculate LOC(eg- Not Close being first and Very Close being last etc...)
            'answer1',
            'answer2'
        ],
        centerModel: assetLoader.getModel('modelKey') //If available
    } 
    */
    {
        type: 'mcq', //Type of the question, Can be used for changing UI
        question: 'Question 1', //Question text, which will be displayed on UI
        answers: [ //Answers should be written in a meaningful order to be easy to calculate LOC(eg- Not Close being first and Very Close being last etc...)
            'answer1',
            'answer2',
            'answer3'
        ]
    },
    {
        type: 'mcq', //Type of the question, Can be used for changing UI
        question: 'Question 2', //Question text, which will be displayed on UI
        answers: [ //Answers should be written in a meaningful order to be easy to calculate LOC(eg- Not Close being first and Very Close being last etc...)
            'answer1',
            'answer2',
            'answer3'
        ]
    },
    {
        type: 'mcq', //Type of the question, Can be used for changing UI
        question: 'Question 3', //Question text, which will be displayed on UI
        answers: [ //Answers should be written in a meaningful order to be easy to calculate LOC(eg- Not Close being first and Very Close being last etc...)
            'answer1',
            'answer2',
            'answer3'
        ]
    },
    {
        type: 'mcq', //Type of the question, Can be used for changing UI
        question: 'Question 4', //Question text, which will be displayed on UI
        answers: [ //Answers should be written in a meaningful order to be easy to calculate LOC(eg- Not Close being first and Very Close being last etc...)
            'answer1',
            'answer2',
            'answer3'
        ]
    },
    {
        type: 'mcq', //Type of the question, Can be used for changing UI
        question: 'Question 5', //Question text, which will be displayed on UI
        answers: [ //Answers should be written in a meaningful order to be easy to calculate LOC(eg- Not Close being first and Very Close being last etc...)
            'answer1',
            'answer2',
            'answer3'
        ]
    },
    {
        type: 'mcq', //Type of the question, Can be used for changing UI
        question: 'Question 6', //Question text, which will be displayed on UI
        answers: [ //Answers should be written in a meaningful order to be easy to calculate LOC(eg- Not Close being first and Very Close being last etc...)
            'answer1',
            'answer2',
            'answer3'
        ]
    },
    {
        type: 'joystick', //Type of the question, Can be used for changing UI
        question: 'Question 7', //Question text, which will be displayed on UI
        answers: [ //Answers should be written in a meaningful order to be easy to calculate LOC(eg- Not Close being first and Very Close being last etc...)
            'answer1',
            'answer2',
            'answer3'
        ]
    },
    
] 
//
//      end of Assigning questions and answers

//Takes a question object from the array above and updates UI with the info.
//Implement updating models/ environment in respect to the question t
export function loadQuestion(questionIndex){
    const questionObject = questionArray[questionIndex]
    if(questionObject){
        let questionType = questionObject.type
        let questionText = questionObject.question
        let answers = questionObject.answers
        uiControl.updateUI(questionType, questionText, answers)
    }
}
