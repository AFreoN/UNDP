import * as THREE from 'three'
import * as assetLoader from '../assets_loader/assets_loader'
import * as controls from '../character_controller/character_control'
import * as uiControl from '../ui_controller/ui_controller'
import * as scenes from './scenes'
import {getSelectedCountry} from '../script'
//import main from 'progressbar.js'
//import * as mainScript from '../script.js'
//import { render } from 'progressbar.js/utils'

//      Assigning questions and answers
//
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
        question: 'Country Selection', //Question text, which will be displayed on UI
        compulsory: true
    },
    {
        type: 'province', //Type of the question, Can be used for changing UI
        question: 'Region Selection', //Question text, which will be displayed on UI
        compulsory: false
    },
    {
        type: 'mcq', //Type of the question, Can be used for changing UI
        question: 'Question 1', //Question text, which will be displayed on UI
        answers: [ //Answers should be written in a meaningful order to be easy to calculate LOC(eg- Not Close being first and Very Close being last etc...)
            'answer1',
            'answer2',
            'answer3'
        ],
        compulsory: false
    },
    {
        type: 'joystick', //Type of the question, Can be used for changing UI
        question: 'Question 2', //Question text, which will be displayed on UI
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
        question: 'Question 3', //Question text, which will be displayed on UI
        answers: [ //Answers should be written in a meaningful order to be easy to calculate LOC(eg- Not Close being first and Very Close being last etc...)
            'answer1',
            'answer2',
            'answer3',
            'answer4',
            'answer5',
            'answer6',
            'answer7'
        ],
        centerModelKey:'centerEmoji',
        compulsory: true
    }
]

export const numberOfQuestions = questionArray.length

export function isQuestionCompulsory(questionIndex){
    return questionArray[questionIndex].compulsory
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

const mcqScene = scenes.mcqScene
const mcqCamera = scenes.mcqCamera
mcqScene.add(ambLight);

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
    
    scenes.updateOceanNormalOffset(deltatime/60)

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
//Takes a question object from the array above and updates UI with the info.
//Implement updating models/ environment in respect to the question
export function loadQuestion(questionIndex){
    const player = assetLoader.getModel('playerCharacter')
    currentQuestion = questionArray[questionIndex]

    if(currentQuestion){
        if(questionIndex <= 0 ){
            uiControl.disableBackButton()
        }else{
            uiControl.enableBackButton()
        }
        // if(questionIndex >= numberOfQuestions - 1){
        //     uiControl.disableNextButton()
        // }else{
        //     uiControl.enableNextButton()
        // }
        uiControl.disableConfirmation()

        let questionType = currentQuestion.type
        let questionText = currentQuestion.question
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
            case 'mcq':
                scenes.resetCurrentSelectionScene()
                updateSceneAndCamera(mcqScene, mcqCamera)
                currentCenterModel = null
                player.position.set(0,-.6, 2)
                player.rotation.set(0,0,0)
                controls.disablePlayerControl()
                mcqScene.add(player)
                break;
            case 'joystick':
                scenes.resetCurrentSelectionScene()
                if(currentQuestion.centerModelKey){
                    const centerModel = assetLoader.getModel(currentQuestion.centerModelKey)
                    if(currentCenterModel){
                        joystickScene.remove(currentCenterModel)
                        currentCenterModel = null
                    }
                    joystickScene.add(centerModel)
                    currentCenterModel = centerModel
                    controls.setOtherCharacter(currentCenterModel)
                }
                uiControl.resetJoystickSlider();

                //scenes.updateRingLocation(currentCenterModel)
                currentCenterModel.position.set(2, currentCenterModel.position.y, 0);
                //currentCenterModel.rotation.set(0, -90,0);
                player.position.set(-1.5, -0.6, 0);
                //player.rotation.set(0, 90,0);

                updateSceneAndCamera(joystickScene, joystickCamera)
                joystickScene.add(player)
                //if(mainScript.isJoyStickTutorialDisplayed())
                controls.enablePlayerControl()
                break;
        }
        
        uiControl.updateUI(questionType, questionText, answers)
    }
}

//Used to change the scene and camera
function updateSceneAndCamera(sceneObject, cameraObject){
    mainScene = sceneObject
    mainCamera = cameraObject

    mainCamera.aspect = sizes.width / sizes.height
    mainCamera.updateProjectionMatrix()
}

//Calculating distance between player and the center model
