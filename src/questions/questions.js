import * as THREE from 'three'
import * as assetLoader from '../assets_loader/assets_loader'
import * as controls from '../character_controller/character_control'
import * as uiControl from '../ui_controller/ui_controller'
import * as scenes from './scenes'
import {getSelectedCountry} from '../script'
import { Camera, MathUtils } from 'three'
import * as sceneTransition from '../SceneTransition'
import { clamp } from 'three/src/math/mathutils'

//import main from 'progressbar.js'
//import * as mainScript from '../script.js'
//import { render } from 'progressbar.js/utils'

//      Assigning questions and answers
//
export let langId = 'en';
export function setLangId(id){
    if(id == null) return;  
    langId = id;
}
let qArray = [
    {   //1     Country
        type : 'country',
        question : {
            en : 'In which country do you live ?',
            si : 'ඔබ ජීවත් වන්නේ කුමන රටේද?',
            ta : 'நீங்கள் எந்த நாட்டில் வாழ்கிறீர்கள் ?',
            dv : 'In which country do you live ?'
        },
        compulsory : true
    },
    {   //2     Province
        type : 'province',
        question : {
            en : 'In which area do you live ?',
            si : 'ඔබ ජීවත් වන්නේ කුමන ප්‍රදේශයේද?',
            ta : 'நீங்கள் எந்த பகுதியில் வசிக்கிறீர்கள் ?',
            dv : 'In which area do you live ?'
        },
        compulsory : false
    },
    {   //3     About
        type : 'about',
        question : {
            main:{
                en : 'About you',
                si : 'ඔයාගේ වයස කීය ද ?',
                ta : 'உங்களுக்கு எவ்வளவு வயது ?',
                dv : 'How old are you ?'
            },
            age:{
                en : 'How old are you ?',
                si : 'ඔයාගේ වයස කීය ද ?',
                ta : 'உங்களுக்கு எவ்வளவு வயது ?',
                dv : 'How old are you ?'
            },
            gender:{
                en : 'What is your gender ?',
                si : 'ඔබේ ලිංගය කුමක්ද?',
                ta : 'உங்கள் பாலினம் என்ன ?',
                dv : 'What is your gender ?'
            }
        },
        answers :{
            age:[
                {
                    en : 'Under 18',
                    si : '18 ට අඩු',
                    ta : '18 வயதுக்குட்பட்டவர்',
                    dv : 'Under 18'
                },
                {
                    en : '18-25',
                    si : '18-25',
                    ta : '18-25',
                    dv : '18-25'
                },
                {
                    en : '26-35',
                    si : '26-35',
                    ta : '26-35',
                    dv : '26-35'
                },
                {
                    en : '35+',
                    si : '35+',
                    ta : '35+',
                    dv : '35'
                },
                {
                    en : 'Prefer not to Say',
                    si : 'නොකියන්න කැමති',
                    ta : 'சொல்ல விரும்பவில்லை',
                    dv : 'Prefer not to Say'
                }
            ], 
            gender:[
                {
                    en : 'Man',
                    si : 'මිනිසා',
                    ta : 'ஆண்',
                    dv : 'Man'
                },
                {
                    en : 'Woman',
                    si : 'කාන්තාවක්',
                    ta : 'பெண்',
                    dv : 'Woman'
                },
                {
                    en : 'Intersex',
                    si : 'අන්තර් ලිංගික',
                    ta : 'இருபால்',
                    dv : 'Intersex'
                },
                {
                    en : 'Non-binary',
                    si : 'ද්විමය නොවන',
                    ta : 'ஒரு பாலினம் அல்ல',
                    dv : 'Non-binary'
                },
                {
                    en : 'Other',
                    si : 'වෙනත්',
                    ta : 'மற்றவை',
                    dv : 'Other'
                },
                {
                    en : 'Prefer not to Say',
                    si : 'නොකියන්න කැමති',
                    ta : 'சொல்ல விரும்பவில்லை',
                    dv : 'Prefer not to Say'
                }
            ]
        },
        compulsory : false
    },
    {   //4     Mother
        type : 'joystick',
        question : {
            en : 'How close do you feel to your mother ?',
            si : 'ඔබ ඔබේ මවට කොතරම් සමීපද?',
            ta : 'உங்கள் தாயிடம் எவ்வளவு நெருக்கமாக உணர்கிறீர்கள் ?',
            dv : 'How close do you feel to your mother ?'
        },
        answers : [
            {
                en : 'answer1',
                si : 'පිළිතුර1',
                ta : 'பதில்1',
                dv : 'answer1'
            },
            {
                en : 'answer2',
                si : 'පිළිතුර2',
                ta : 'பதில்2',
                dv : 'answer2'
            },
            {
                en : 'answer3',
                si : 'පිළිතුර3',
                ta : 'பதில்3',
                dv : 'answer3'
            },
            {
                en : 'answer4',
                si : 'පිළිතුර4',
                ta : 'பதில்4',
                dv : 'answer4'
            },
            {
                en : 'answer5',
                si : 'පිළිතුර5',
                ta : 'பதில்5',
                dv : 'answer5'
            },
            {
                en : 'answer6',
                si : 'පිළිතුර6',
                ta : 'பதில்6',
                dv : 'answer6'
            },
            {
                en : 'answer7',
                si : 'පිළිතුර7',
                ta : 'பதில்7',
                dv : 'answer7'
            }
        ],
        centerModelKey:'mother',
        characterName: {
            en : 'Mother',
            si : 'මව',
            ta : 'அம்மா',
            dv : 'Mother'
        },
        compulsory: true
    },
    {   //5     Father
        type : 'joystick',
        question : {
            en : 'How close do you feel to your father ?',
            si : 'ඔබ ඔබේ පියාට කොතරම් සමීපද?',
            ta : 'உங்கள் தந்தையிடம் நீங்கள் எவ்வளவு நெருக்கமாக உணர்கிறீர்கள் ?',
            dv : 'How close do you feel to your father ?'
        },
        answers : [
            {
                en : 'answer1',
                si : 'පිළිතුර1',
                ta : 'பதில்1',
                dv : 'answer1'
            },
            {
                en : 'answer2',
                si : 'පිළිතුර2',
                ta : 'பதில்2',
                dv : 'answer2'
            },
            {
                en : 'answer3',
                si : 'පිළිතුර3',
                ta : 'பதில்3',
                dv : 'answer3'
            },
            {
                en : 'answer4',
                si : 'පිළිතුර4',
                ta : 'பதில்4',
                dv : 'answer4'
            },
            {
                en : 'answer5',
                si : 'පිළිතුර5',
                ta : 'பதில்5',
                dv : 'answer5'
            },
            {
                en : 'answer6',
                si : 'පිළිතුර6',
                ta : 'பதில்6',
                dv : 'answer6'
            },
            {
                en : 'answer7',
                si : 'පිළිතුර7',
                ta : 'பதில்7',
                dv : 'answer7'
            }
        ],
        centerModelKey:'father',
        characterName:{
            en : 'Father',
            si : 'පියා',
            ta : 'தந்தை',
            dv : 'Father'
        },
        compulsory: true
    },
    {   //6     Siblings
        type : 'joystick',
        question : {
            en : 'How close are you to you siblings?',
            si : 'ඔබ සහෝදර සහෝදරියන් සමඟ කෙතරම් සමීපද?',
            ta : 'நீங்கள் உடன்பிறந்தவர்களுடன் எவ்வளவு நெருக்கமாக இருக்கிறீர்கள்?',
            dv : 'How close are you to you siblings?'
        },
        answers : [
            {
                en : 'answer1',
                si : 'පිළිතුර1',
                ta : 'பதில்1',
                dv : 'answer1'
            },
            {
                en : 'answer2',
                si : 'පිළිතුර2',
                ta : 'பதில்2',
                dv : 'answer2'
            },
            {
                en : 'answer3',
                si : 'පිළිතුර3',
                ta : 'பதில்3',
                dv : 'answer3'
            },
            {
                en : 'answer4',
                si : 'පිළිතුර4',
                ta : 'பதில்4',
                dv : 'answer4'
            },
            {
                en : 'answer5',
                si : 'පිළිතුර5',
                ta : 'பதில்5',
                dv : 'answer5'
            },
            {
                en : 'answer6',
                si : 'පිළිතුර6',
                ta : 'பதில்6',
                dv : 'answer6'
            },
            {
                en : 'answer7',
                si : 'පිළිතුර7',
                ta : 'பதில்7',
                dv : 'answer7'
            }
        ],
        centerModelKey:'siblings',
        characterName:{
            en : 'Siblings',
            si : 'සහෝදර සහෝදරියන්',
            ta : 'உடன்பிறந்தவர்கள்',
            dv : 'Siblings'
        },
        compulsory: true
    },
    {   //7     Closest Friends
        type : 'joystick',
        question : {
            en : 'How close are you to your closest friends?',
            si : 'ඔබේ සමීපතම මිතුරන්ට ඔබ කෙතරම් සමීපද?',
            ta : 'உங்கள் நெருங்கிய நண்பர்களுடன் நீங்கள் எவ்வளவு நெருக்கமாக இருக்கிறீர்கள்?',
            dv : 'How close are you to your closest friends?'
        },
        answers : [
            {
                en : 'answer1',
                si : 'පිළිතුර1',
                ta : 'பதில்1',
                dv : 'answer1'
            },
            {
                en : 'answer2',
                si : 'පිළිතුර2',
                ta : 'பதில்2',
                dv : 'answer2'
            },
            {
                en : 'answer3',
                si : 'පිළිතුර3',
                ta : 'பதில்3',
                dv : 'answer3'
            },
            {
                en : 'answer4',
                si : 'පිළිතුර4',
                ta : 'பதில்4',
                dv : 'answer4'
            },
            {
                en : 'answer5',
                si : 'පිළිතුර5',
                ta : 'பதில்5',
                dv : 'answer5'
            },
            {
                en : 'answer6',
                si : 'පිළිතුර6',
                ta : 'பதில்6',
                dv : 'answer6'
            },
            {
                en : 'answer7',
                si : 'පිළිතුර7',
                ta : 'பதில்7',
                dv : 'answer7'
            }
        ],
        centerModelKey:'friends',
        characterName:{
            en : 'Closest Friends',
            si : 'සමීපතම මිතුරන්',
            ta : 'நெருங்கிய நண்பர்கள்',
            dv : 'Closest Friends'
        },
        compulsory: true
    },
    {   //8     Distant Friends
        type : 'joystick',
        question : {
            en : 'How close are you to your distant friends?',
            si : 'ඔබේ දුරස්ථ මිතුරන්ට ඔබ කෙතරම් සමීපද?',
            ta : 'உங்கள் தொலைதூர நண்பர்களுடன் நீங்கள் எவ்வளவு நெருக்கமாக இருக்கிறீர்கள்?',
            dv : 'How close are you to your distant friends?'
        },
        answers : [
            {
                en : 'answer1',
                si : 'පිළිතුර1',
                ta : 'பதில்1',
                dv : 'answer1'
            },
            {
                en : 'answer2',
                si : 'පිළිතුර2',
                ta : 'பதில்2',
                dv : 'answer2'
            },
            {
                en : 'answer3',
                si : 'පිළිතුර3',
                ta : 'பதில்3',
                dv : 'answer3'
            },
            {
                en : 'answer4',
                si : 'පිළිතුර4',
                ta : 'பதில்4',
                dv : 'answer4'
            },
            {
                en : 'answer5',
                si : 'පිළිතුර5',
                ta : 'பதில்5',
                dv : 'answer5'
            },
            {
                en : 'answer6',
                si : 'පිළිතුර6',
                ta : 'பதில்6',
                dv : 'answer6'
            },
            {
                en : 'answer7',
                si : 'පිළිතුර7',
                ta : 'பதில்7',
                dv : 'answer7'
            }
        ],
        centerModelKey:'centerCharacter',
        characterName:{
            en : 'Distant Friends',
            si : 'දුරස්ථ මිතුරන්',
            ta : 'தொலைதூர நண்பர்கள்',
            dv : 'Distant Friends'
        },
        compulsory: true
    },
    {   //9     Local Community
        type : 'joystick',
        question : {
            en : 'How close do you feel with your local community ?',
            si : 'ඔබේ ප්‍රාදේශීය ප්‍රජාව සමඟ ඔබට කෙතරම් සමීප බවක් දැනෙන්නේද?',
            ta : 'உங்கள் உள்ளூர் சமூகத்துடன் எவ்வளவு நெருக்கமாக உணர்கிறீர்கள்?',
            dv : 'How close do you feel with your local community ?'
        },
        answers : [
            {
                en : 'answer1',
                si : 'පිළිතුර1',
                ta : 'பதில்1',
                dv : 'answer1'
            },
            {
                en : 'answer2',
                si : 'පිළිතුර2',
                ta : 'பதில்2',
                dv : 'answer2'
            },
            {
                en : 'answer3',
                si : 'පිළිතුර3',
                ta : 'பதில்3',
                dv : 'answer3'
            },
            {
                en : 'answer4',
                si : 'පිළිතුර4',
                ta : 'பதில்4',
                dv : 'answer4'
            },
            {
                en : 'answer5',
                si : 'පිළිතුර5',
                ta : 'பதில்5',
                dv : 'answer5'
            },
            {
                en : 'answer6',
                si : 'පිළිතුර6',
                ta : 'பதில்6',
                dv : 'answer6'
            },
            {
                en : 'answer7',
                si : 'පිළිතුර7',
                ta : 'பதில்7',
                dv : 'answer7'
            }
        ],
        centerModelKey:'community',
        characterName:{
            en : 'Community',
            si : 'ප්රජාව',
            ta : 'சமூகம்',
            dv : 'Community'
        },
        compulsory: true
    },
    {   //10    Control over things
        type : 'likert5',
        question : {
            en : 'I have little control over things that happen to me.',
            si : 'ඔබ ඔබේ මවට කොතරම් සමීපද?',
            ta : 'உங்கள் தாயிடம் எவ்வளவு நெருக்கமாக உணர்கிறீர்கள் ?',
            dv : 'I have little control over things that happen to me.'
        },
        answers : [
            {
                en : 'answer1',
                si : 'පිළිතුර1',
                ta : 'பதில்1',
                dv : 'answer1'
            },
            {
                en : 'answer2',
                si : 'පිළිතුර2',
                ta : 'பதில்2',
                dv : 'answer2'
            },
            {
                en : 'answer3',
                si : 'පිළිතුර3',
                ta : 'பதில்3',
                dv : 'answer3'
            },
            {
                en : 'answer4',
                si : 'පිළිතුර4',
                ta : 'பதில்4',
                dv : 'answer4'
            },
            {
                en : 'answer5',
                si : 'පිළිතුර5',
                ta : 'பதில்5',
                dv : 'answer5'
            }
        ],
        compulsory: true
    }
]
uiControl.setUiText()

export let questionArray = [
    /* Code snippet for question structure. Each object has a single question and a set of answers
    {
        type: 'mcq | joystick', //Type of the question, Can be used for changing UI
        question: 'Question text', //Question text, which will be displayed on UI
        answers: [ //Answers should be written in a meaningful order to be easy to calculate LOC(eg- Not Close being first and Very Close being last etc...)
            'answer1',
            'answer2'
        ],
        centerModelKey: 'modelKey', //If available
        compulsory: true // is the question compulsory
    } 
    */
    {
        type: 'country', //Type of the question, Can be used for changing UI
        question: 'In which country do you live ?', //Question text, which will be displayed on UI
        compulsory: true
    },
    {
        type: 'province', //Type of the question, Can be used for changing UI
        question: 'In which area do you live ?', //Question text, which will be displayed on UI
        compulsory: false
    },
    {
        type: 'mcq', //Type of the question, Can be used for changing UI
        question: 'How old are you ?', //Question text, which will be displayed on UI
        answers: [ //Answers should be written in a meaningful order to be easy to calculate LOC(eg- Not Close being first and Very Close being last etc...)
            'Under 18',
            '18-25',
            '26-35',
            '35+',
            'Prefer Not to Say'
        ],
        compulsory: false
    },
    {
        type: 'mcq', //Type of the question, Can be used for changing UI
        question: 'What is your gender ?', //Question text, which will be displayed on UI
        answers: [ //Answers should be written in a meaningful order to be easy to calculate LOC(eg- Not Close being first and Very Close being last etc...)
            'Man',
            'Woman',
            'Intersex',
            'Non-binary',
            'Other',
            'Prefer not to Say'
        ],
        compulsory: false
    },
    {
        type: 'joystick', //Type of the question, Can be used for changing UI
        question: 'How close do you feel to your mother ?', //Question text, which will be displayed on UI
        answers: [ //Answers should be written in a meaningful order to be easy to calculate LOC(eg- Not Close being first and Very Close being last etc...)
            'answer1',
            'answer2',
            'answer3',
            'answer4',
            'answer5',
            'answer6',
            'answer7'
        ],
        centerModelKey:'centerCharacter',
        compulsory: true
    },
    {
        type: 'joystick', //Type of the question, Can be used for changing UI
        question: 'How close do you feel to your father ?', //Question text, which will be displayed on UI
        answers: [ //Answers should be written in a meaningful order to be easy to calculate LOC(eg- Not Close being first and Very Close being last etc...)
            'answer1',
            'answer2',
            'answer3',
            'answer4',
            'answer5',
            'answer6',
            'answer7'
        ],
        centerModelKey:'centerCharacter',       //prev 'centerEmoji'
        compulsory: true
    }
]

export const numberOfQuestions = qArray.length
uiControl.setSurveyProgressMax(numberOfQuestions)


export function isQuestionCompulsory(questionIndex){
    return qArray[questionIndex].compulsory
}

//
//      end of Assigning questions and answers

//      Setting up initial properties
//
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const canvas = document.querySelector('canvas.webgl')

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
})
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

let mainScene = new THREE.Scene() //scene can be imported by questions module to add and remove question specific models

let mainCamera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)

let ambLight = new THREE.AmbientLight(0x404040 ,0.7);
mainScene.add(ambLight);


// Update renderer
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
//
//      end of Setting up initial properties

//      Scene imports
//

const countryScene = scenes.countryScene 
const countryCamera = scenes.countryCamera

const aboutScene = scenes.aboutScene
const aboutCamera = scenes.aboutCamera
aboutScene.add(ambLight);

const joystickScene = scenes.joystickScene
const joystickCamera = scenes.joystickCamera

const maldivesScene = scenes.maldivesScene
const maldivesCamera = scenes.maldivesCamera

const sriLankaScene = scenes.sriLankaScene
const sriLankaCamera = scenes.sriLankaCamera


//an empty scene to load when no country was selected
const emptyScene = new THREE.Scene()

const emptyCube = new THREE.Mesh(new THREE.BoxGeometry(0.75,0.1,0.75), new THREE.MeshLambertMaterial({color: 0x222222}))
emptyScene.add(emptyCube)
emptyCube.position.set(0,0,0)

const emptyCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
emptyCamera.position.set(0,4,2)
emptyCamera.rotation.set(Math.PI * -0.4,0,0)

const emptyLight = new THREE.PointLight(0xffffff)
emptyLight.position.y = 1
emptyScene.add(emptyLight)




//
//      end of Scene imports

//      Enabling responsiveness for 3D scene
//
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    mainCamera.aspect = sizes.width / sizes.height
    mainCamera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
//
//      end of Enabling responsiveness for 3D scene

//      Implementing game loop
//
const clock = new THREE.Clock()
let previousTime = 0
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltatime = elapsedTime - previousTime //delta time can be retrieved from here
    previousTime = elapsedTime
    
    // scenes.updateShadowNormalOffset(deltatime/60)

    if(!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))){
        if(currentQuestion && currentQuestion.type === 'joystick'){
            scenes.calculateDistance(currentCenterModel,currentQuestion.answers)   
        }
    
        if(currentQuestion && currentQuestion.type === 'country'){
            scenes.raycastCountry()
        }
    
        if(currentQuestion && currentQuestion.type === 'province'){
            const selectedCountryIndex = getSelectedCountry()
            switch(selectedCountryIndex){
                case 0:
                    scenes.raycastMaldivesRegions()
                    break;
                case 1:
                    scenes.raycastSriLankaRegions()
                    break;
            }
        }
    }

    if(currentQuestion && currentQuestion.type === 'joystick'){
        // console.log(mainCamera.position)
        animateClouds(deltatime)
    }

    //Implement loop here

    window.requestAnimationFrame(tick)
    renderer.render(mainScene,mainCamera)
}

tick()
//
//      end of Implementing game loop

//References current loaded center model
var currentCenterModel
var currentQuestion
var qId = 0;
var prevQues = '';
var prevPlayerModel, prevOtherModel, prevCamera;
let player = null;
const characterText = document.getElementById('Character_name');
const playerName = document.getElementById('Player_name');
const playerNamesLang = {
    en : 'You',
    si : 'ඔබට',
    ta : 'நீங்கள்',
    dv : 'You'
}

//Takes a question object from the array above and updates UI with the info.
//Implement updating models/ environment in respect to the question
export function loadQuestion(questionIndex){
    if(player == null){
        player = assetLoader.getModel('playerCharacter');
        playerName.innerText = playerNamesLang[langId];
    }
    sceneTransition.initializeData(player, joystickCamera, controls.getPlayerInitialPosition());
    controls.disablePlayerControl();
    characterText.hidden = true;
    playerName.hidden = true;

    var UIUpdateNeeded = true;
    currentQuestion = qArray[questionIndex]

    if(currentQuestion){
        if(questionIndex <= 0 ){
            uiControl.disableBackButton()
        }else{
            uiControl.enableBackButton()
        }
        // if(questionIndex >= numberOfQuestions - 1){
        //     // uiControl.disableNextButton()
        // }else{
            uiControl.enableNextButton()
        // }
        uiControl.disableConfirmation()

        let questionType = currentQuestion.type
        let questionText
        if(questionType === 'about'){
            questionText = currentQuestion.question.main[langId]
        }else{
            questionText = currentQuestion.question[langId]
        }
        let answers = currentQuestion.answers

        switch(questionType.toLowerCase()){
            case 'country':
                scenes.resetCountrySelection()
                // uiControl.disableNextButton()
                updateSceneAndCamera(countryScene, countryCamera)
                break;
            case 'province':
                const selectedCountryIndex = getSelectedCountry()
                switch(selectedCountryIndex){
                    case 0:
                        scenes.resetMaldivesSelection()
                        updateSceneAndCamera(maldivesScene, maldivesCamera)
                        break;
                    case 1:
                        scenes.resetSriLankaSelection()
                        updateSceneAndCamera(sriLankaScene, sriLankaCamera)
                        break;
                    default:
                        console.log('select a country');
                        updateSceneAndCamera(emptyScene, emptyCamera)
                        break;
                }
                
                break;
            case 'about':
                if(prevQues != 'joystick'){
                    scenes.resetCurrentSelectionScene()
                    updateSceneAndCamera(aboutScene, aboutCamera)
                    currentCenterModel = null
                    player.position.set(0,-.6, 2)
                    player.rotation.set(0,0,0)
                    controls.disablePlayerControl()
                    aboutScene.add(player)
                }
                else{
                    UIUpdateNeeded = false;
                    sceneTransition.jumpOut(function() {
                        scenes.resetCurrentSelectionScene()
                        updateSceneAndCamera(aboutScene, aboutCamera)
                        currentCenterModel = null
                        player.position.set(0,-.6, 2)
                        player.rotation.set(0,0,0)
                        controls.disablePlayerControl()
                        aboutScene.add(player)
                        uiControl.updateUI(questionType, questionText, answers)
                        uiControl.setSurveyProgressValue(questionIndex)
                    });
                }
                break;
            case 'joystick':
                scenes.resetCurrentSelectionScene();
                uiControl.sliderHolder.hidden = true;

                var slideDirection = questionIndex - qId;
                var dir = slideDirection > 0 ? 'right' : 'left';
                if(prevQues == 'joystick' || prevQues == 'likert5'){     //If previos scene is joystick scene, then scene has to fadeout first then fadein to other scene
                    UIUpdateNeeded = false;
                    sceneTransition.fadeOut(prevOtherModel, dir, function(){
                        setupJoystickScene(currentQuestion, player, questionIndex);
                        //updateSceneAndCamera(joystickScene, joystickCamera, true);
                        sceneTransition.fadeIn(prevOtherModel, dir,true, null);
                    });
                }
                else{
                    if(questionIndex != 3){     //questionIndex 3 is mother scene
                        setupJoystickScene(currentQuestion, player, questionIndex);
                        updateSceneAndCamera(joystickScene, joystickCamera);
                        sceneTransition.fadeIn(prevOtherModel, dir,true, null);
                    }
                    else{
                        setupJoystickScene(currentQuestion, player, questionIndex);
                        updateSceneAndCamera(joystickScene, joystickCamera);
                        sceneTransition.jumpIn();
                    }
                }
<<<<<<< HEAD
                break;
            case 'likert5':
                var slideDirection = questionIndex - qId;
                var dir = slideDirection > 0 ? 'right' : 'left';
                if(prevQues == 'joystick'){
                    UIUpdateNeeded = false;
                    sceneTransition.fadeOut(prevOtherModel, dir, function(){
                        scenes.resetCurrentSelectionScene();
                        removeModelsFromScene(joystickScene, models);
                        updateSceneAndCamera(joystickScene, joystickCamera);
                        if(currentCenterModel)
                            joystickScene.remove(currentCenterModel);
                        currentCenterModel = null;
                        player.position.set(0,-.6, 0);
                        player.rotation.set(0,0,0);
                        controls.disablePlayerControl();
                        addModelToScene(joystickScene, player);
                        controls.setOtherCharacter(null, null, null);
                        uiControl.updateUI(questionType, questionText, answers);
                        uiControl.setSurveyProgressMax(questionIndex);

                        sceneTransition.fadeIn(prevOtherModel, dir,false, null);
                    });
                }
                else{
                    scenes.resetCurrentSelectionScene();
                    removeModelsFromScene(joystickScene, models);
                    updateSceneAndCamera(joystickScene, joystickCamera);
                    if(currentCenterModel)
                        joystickScene.remove(currentCenterModel);
                    currentCenterModel = null;
                    player.position.set(0,-.6, 0);
                    player.rotation.set(0,0,0);
                    controls.disablePlayerControl();
                    addModelToScene(joystickScene, player);
                    controls.setOtherCharacter(null, null, null);

                    sceneTransition.fadeIn(prevOtherModel, dir,false, null);
                }
=======
                // const fatherModel = assetLoader.getModel('father');
                // if(fatherModel){
                //     fatherModel.position.set(0,-0.6,0);
                //     fatherModel.scale.set(1,1,1);
                //     fatherModel.rotation.y = MathUtils.degToRad(0);
                //     joystickScene.add(fatherModel);
                // }
                
                //updateSceneAndCamera(joystickScene, joystickCamera)
                //if(mainScript.isJoyStickTutorialDisplayed())
                //controls.enablePlayerControl()
>>>>>>> 05de0622fa0e177835c3ab01abfb30319b2ef3f0
                break;
        }
        
        prevQues = questionType.toLowerCase();
        qId = questionIndex;
        if(UIUpdateNeeded){
            uiControl.updateUI(questionType, questionText, answers)
            uiControl.setSurveyProgressValue(questionIndex)
        }
    }
}

var models = null;
const clouds = {
    high: null,
    mid: null,
    low: null
}
function setupJoystickScene(currentQuestion, player, questionIndex){

    if(currentQuestion.centerModelKey){
        const centerModel = assetLoader.getModel(currentQuestion.centerModelKey)
        if(currentCenterModel){
            joystickScene.remove(currentCenterModel)
            currentCenterModel = null
        }
        joystickScene.add(centerModel)
        
        let treeYPos = -0.6; 
        let r = 0.1;


        document.getElementById("Slider_Filler").style.width = "10%";

        let tree1 = assetLoader.getModel('Tree1')
        tree1.position.set(2.0 + MathUtils.randFloat(-r,r),treeYPos,-2 + MathUtils.randFloat(-r,r))     //prev (2.0,-0.3,-2)
        tree1.rotation.y = MathUtils.randFloat(0.1, 359)
        
        let tree2 = assetLoader.getModel('Tree2')
        tree2.position.set(1.5 + MathUtils.randFloat(-r,r),treeYPos,-3 + MathUtils.randFloat(-r,r))
        tree2.rotation.y = MathUtils.randFloat(0.1, 359)

        let tree3 = assetLoader.getModel('Tree3')
        tree3.position.set(-1.5 + MathUtils.randFloat(-r,r),treeYPos,-3 + MathUtils.randFloat(-r,r))
        tree3.rotation.y = MathUtils.randFloat(0.1, 359)

        let tree4 = assetLoader.getModel('Tree4')
        tree4.position.set(-2.0 + MathUtils.randFloat(-r,r),treeYPos,-2 + MathUtils.randFloat(-r,r))
        tree4.rotation.y = MathUtils.randFloat(0.1, 359)

        let tree5 = assetLoader.getModel('Tree5')
        tree5.position.set( 2.4 + MathUtils.randFloat(-r,r),treeYPos,-5 + MathUtils.randFloat(-r,r))
        tree5.rotation.y = MathUtils.randFloat(0.1, 359)

        let tree6 = assetLoader.getModel('Tree6')
        tree6.position.set(-2.8 + MathUtils.randFloat(-r,r),treeYPos,-6 + MathUtils.randFloat(-r,r))
        tree6.rotation.y = MathUtils.randFloat(0.1, 359)

        let tree7 = assetLoader.getModel('Tree7')
        tree7.position.set( -2.20 + MathUtils.randFloat(-r,r),treeYPos,-10 + MathUtils.randFloat(-r,r))
        tree7.rotation.y = MathUtils.randFloat(0.1, 359)

        let tree8 = assetLoader.getModel('Tree8')
        tree8.position.set(0.1 + MathUtils.randFloat(-r,r), treeYPos, -6 + MathUtils.randFloat(-r,r))
        tree8.rotation.y = MathUtils.randFloat(0.1, 359)

        let tree9 = assetLoader.getModel('Tree9')
        tree9.position.set(-1.3 + MathUtils.randFloat(-r,r), treeYPos, -8 + MathUtils.randFloat(-r,r))
        tree9.rotation.y = MathUtils.randFloat(0.1, 359)

        let tree10 = assetLoader.getModel('Tree10')
        tree10.position.set(1.1 + MathUtils.randFloat(-r,r), treeYPos, -5 + MathUtils.randFloat(-r,r))
        tree10.rotation.y = MathUtils.randFloat(0.1, 359)

        let cloud1 = assetLoader.getModel('cloud1')
        cloud1.position.set(2, 1.8,-12)
        clouds.low = cloud1 

        let cloud2 = assetLoader.getModel('cloud2')
        cloud2.position.set(0.5, 2.2,-12)
        clouds.high = cloud2

        let cloud3 = assetLoader.getModel('cloud3')
        cloud3.position.set(-1.5, 1.8,-10)
        clouds.mid = cloud3
    
        addModelToScene(joystickScene, tree1);
        addModelToScene(joystickScene, tree2);
        addModelToScene(joystickScene, tree3);
        addModelToScene(joystickScene, tree4);
        addModelToScene(joystickScene, tree5);
        addModelToScene(joystickScene, tree6);
        addModelToScene(joystickScene, tree7);
        addModelToScene(joystickScene, tree8);
        addModelToScene(joystickScene, tree9);
        addModelToScene(joystickScene, tree10);

        addModelToScene(joystickScene, cloud1);
        addModelToScene(joystickScene, cloud2);
        addModelToScene(joystickScene, cloud3);

        // const carp = assetLoader.getModel('carpet');
        // let lamp = assetLoader.getModel('lamp');
        // if(questionIndex == 3 || questionIndex == 4){
        //     addModelToScene(joystickScene, carp);
    
        //     addModelToScene(joystickScene, lamp);
        //     lamp.position.z = -0.6;
        //     lamp.rotation.y = MathUtils.degToRad(45);
        // }
        // else{
        //     joystickScene.remove(carp);
        //     joystickScene.remove(lamp);
        // }
        
        currentCenterModel = centerModel;
        prevOtherModel = currentCenterModel;
        
        controls.setOtherCharacter(currentCenterModel, assetLoader.getOtherCharacterAnimations(currentQuestion.centerModelKey), assetLoader.getAnimationIds(currentQuestion.centerModelKey) );
        // if(!joystickScene.getObjectByName('player')){
        //     joystickScene.add(player)
        // }
        addModelToScene(joystickScene, player);

        if(currentQuestion.characterName){
            characterText.innerText = currentQuestion.characterName[langId];
            playerName.innerText = playerNamesLang[langId];
        }

        //uiTextCheck(centerModel);
    }
    
    controls.setCamera(joystickCamera);

    if(models != null)
        removeModelsFromScene(joystickScene, models);

    models = scenes.GetModelIds(questionIndex);
    if(models != null){
        addModelsForThisScene(joystickScene, models);
    }
    else{
        console.log("No models array avaiable for this scene (Question index = ", questionIndex,")")
    }

    uiControl.updateUI(currentQuestion.type, currentQuestion.question[langId], currentQuestion.answers);
    uiControl.setSurveyProgressValue(questionIndex);
}

function addModelsForThisScene(scene, modelsArray){
    modelsArray.forEach(element => {
        var m = assetLoader.getModel(element.name);
        if(m != null){
            m.position.set(element.position.x, element.position.y, element.position.z);
            m.rotation.x = MathUtils.degToRad(element.rotation.x);
            m.rotation.y = MathUtils.degToRad(element.rotation.y);
            m.rotation.z = MathUtils.degToRad(element.rotation.z);
            scene.add(m);
        }
        else{
            console.log("No models exist in the assets based on the key given by models array")
        }
    });
}

function removeModelsFromScene(scene, modelsArray){
    if(modelsArray == null)
        return;

    modelsArray.forEach(element => {
        var m = assetLoader.getModel(element.name);
        if(m != null)
            scene.remove(m);
    });
}

//#region Character name indicator position update
export const EnableCharacterText = function(isOtherCharacterAvailable){
    characterText.hidden = !isOtherCharacterAvailable;
    playerName.hidden = false;
}

const objPos = new THREE.Vector3();
export const updateNameIndicator = function(player, other){
    let pos = new THREE.Vector3();
    let widthHalf = window.innerWidth / 2;
    let heightHalf = window.innerHeight / 2;

    if(other != null){
        other.getWorldPosition(objPos);
        //emptyObject.position.y += 0.3;
    
        pos.x = objPos.x;
        pos.y = objPos.y + 0.5 ;
        pos.z = objPos.z;
    
        pos.project(joystickCamera);
    
    
        pos.x = (pos.x * widthHalf) + widthHalf;
        pos.y = - (pos.y * heightHalf) + heightHalf;
        pos.z = 0;
        
        characterText.style.position = "absolute";
        characterText.style.top = (pos.y - characterText.clientHeight * 0.5) + "px";
        characterText.style.left = (pos.x - characterText.clientWidth * 0.5) + "px";
    }

    if(player != null){
        //For setting player name indicator
        player.getWorldPosition(objPos);
        
        pos.x = objPos.x;
        pos.y = objPos.y + 0.5 ;
        pos.z = objPos.z;
        
        pos.project(joystickCamera);
        
        pos.x = (pos.x * widthHalf) + widthHalf;
        pos.y = - (pos.y * heightHalf) + heightHalf;
        pos.z = 0;
        
        playerName.style.position = "absolute";
        playerName.style.top = (pos.y - playerName.clientHeight * 0.5) + "px";
        playerName.style.left = (pos.x - playerName.clientWidth * 0.5) + "px";
    }

    //checkingBoundbox(other);
}
//#endregion

function checkingBoundbox(model){

    let bb = new THREE.Box3().setFromObject(model);
    var size = new THREE.Vector3();
    bb.getSize(size);
    console.log("Model size = ", size);
}

const addModelToScene = function(_scene, _model){
    if(_scene.getObjectById(_model.id) == null){
        _scene.add(_model);
    }
}

//Used to change the scene and camera
function updateSceneAndCamera(sceneObject, cameraObject, dontUpdate){
    if(dontUpdate) return;
    mainScene = sceneObject
    mainCamera = cameraObject

    mainCamera.aspect = sizes.width / sizes.height
    mainCamera.updateProjectionMatrix()
}

function animateClouds(deltaTime){
    const baseSpeed = -0.1
    const speedMultiplier = {
        high: 1,
        mid: 2,
        low: 4
    }
    const vanishingXcoordinate = 3
    clouds.low.position.x += baseSpeed * speedMultiplier.low * deltaTime
    if(clouds.low.position.x < vanishingXcoordinate*-1){
        clouds.low.position.x = vanishingXcoordinate
    }

    clouds.mid.position.x += baseSpeed * speedMultiplier.mid * deltaTime
    if(clouds.mid.position.x < vanishingXcoordinate*-1){
        clouds.mid.position.x = vanishingXcoordinate
    }

    clouds.high.position.x += baseSpeed * speedMultiplier.high * deltaTime
    if(clouds.high.position.x < vanishingXcoordinate*-1){
        clouds.high.position.x = vanishingXcoordinate
    }

    clouds.low.material.opacity = (vanishingXcoordinate - Math.abs(clouds.low.position.x))/vanishingXcoordinate
    clouds.mid.material.opacity = (vanishingXcoordinate - Math.abs(clouds.mid.position.x))/vanishingXcoordinate
    clouds.high.material.opacity = (vanishingXcoordinate - Math.abs(clouds.high.position.x))/vanishingXcoordinate

}

//Calculating distance between player and the center model
