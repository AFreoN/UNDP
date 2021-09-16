import * as THREE from 'three'
import * as assetLoader from '../assets_loader/assets_loader'
import * as controls from '../character_controller/character_control'
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
        centerModelKey: 'modelKey' //If available
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
        type: 'joystick', //Type of the question, Can be used for changing UI
        question: 'Question 2', //Question text, which will be displayed on UI
        answers: [ //Answers should be written in a meaningful order to be easy to calculate LOC(eg- Not Close being first and Very Close being last etc...)
            'answer1',
            'answer2',
            'answer3'
        ],
        centerModelKey:'centerCharacter'
    },
    {
        type: 'joystick', //Type of the question, Can be used for changing UI
        question: 'Question 3', //Question text, which will be displayed on UI
        answers: [ //Answers should be written in a meaningful order to be easy to calculate LOC(eg- Not Close being first and Very Close being last etc...)
            'answer1',
            'answer2',
            'answer3'
        ],
        centerModelKey:'centerCharacter'
    },
    {
        type: 'joystick', //Type of the question, Can be used for changing UI
        question: 'Question 4', //Question text, which will be displayed on UI
        answers: [ //Answers should be written in a meaningful order to be easy to calculate LOC(eg- Not Close being first and Very Close being last etc...)
            'answer1',
            'answer2',
            'answer3'
        ],
        centerModelKey:'centerCharacter'
    }
]

export const numberOfQuestions = questionArray.length
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
    alpha: true
})

let mainScene = new THREE.Scene() //scene can be imported by questions module to add and remove question specific models

let mainCamera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)


// Update renderer
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

//
//      end of Setting up initial properties


//      MCQ scene
//
const mcqScene = new THREE.Scene() 
const mcqCamera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
mcqScene.add(mcqCamera)

mcqCamera.position.x = -.1
mcqCamera.position.y = -.4
mcqCamera.position.z = 2.6
mcqCamera.rotation.set(Math.PI * 0, 0, 0)

const mcqPointLight = new THREE.PointLight(0xffffff, 3)

mcqPointLight.position.x = 2
mcqPointLight.position.y = 3
mcqPointLight.position.z = 4
mcqPointLight.intensity = 1.3

mcqScene.add(mcqPointLight)

//
//      end of MCQ scene

//      Joystick scene
//
const joystickScene = new THREE.Scene() 
const joystickCamera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)

joystickCamera.position.x = 0
joystickCamera.position.y = 2
joystickCamera.position.z = 4.0
joystickCamera.rotation.set(Math.PI * -0.2, 0, 0)
joystickScene.add(joystickCamera)

//Setting up level

//add floor
const floorgeo = new THREE.BoxGeometry(100,.05,100);
const floorMaterial = new THREE.MeshBasicMaterial( {color: 0xfff4db});
const RingMaterial = new THREE.MeshBasicMaterial({color: 0xf5eddc})

const floor = new THREE.Mesh (floorgeo, floorMaterial);
floor.position.y = -.65

joystickScene.add(floor);

//Adding rings
//Highlight material
const rad1Material = new THREE.MeshBasicMaterial( { color: 0xfcf8ed } );

//radius 1
const geometry = new THREE.CylinderGeometry( .5, .5, 0.008, 64 );
const cylinder = new THREE.Mesh( geometry, RingMaterial );
cylinder.position.set(0,-.59,0)

//radius 2
const geometry2 = new THREE.CylinderGeometry( 1, 1, 0.008, 64 );
const cylinder2 = new THREE.Mesh( geometry2, floorMaterial );
cylinder2.position.set(0,-.60,0)

//radius 3
const geometry3 = new THREE.CylinderGeometry( 1.5, 1.5, 0.008, 64 );
const cylinder3 = new THREE.Mesh( geometry3, RingMaterial );
cylinder3.position.set(0,-.61,0)

joystickScene.add( cylinder);
joystickScene.add( cylinder2 );
joystickScene.add( cylinder3 );

//Adding light
const joystickPointLight = new THREE.PointLight(0xffffff, 3)

joystickPointLight.position.x = 2
joystickPointLight.position.y = 3
joystickPointLight.position.z = 4
joystickPointLight.intensity = 1.3

joystickScene.add(joystickPointLight)
//
//      end of Joystick scene

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
    
    calculateDistance()

    //Implement loop here

    window.requestAnimationFrame(tick)
    renderer.render(mainScene,mainCamera)
}

tick()
//
//      end of Implementing game loop

//      Implementation for loading a question 
//
var currentCenterModel

//Takes a question object from the array above and updates UI with the info.
//Implement updating models/ environment in respect to the question
export function loadQuestion(questionIndex){
    const player = assetLoader.getModel('playerCharacter')
    const questionObject = questionArray[questionIndex]
    if(questionObject){
        if(questionIndex <= 0 ){
            uiControl.disableBackButton()
        }else{
            uiControl.enableBackButton()
        }
        if(questionIndex >= numberOfQuestions - 1){
            uiControl.disableNextButton()
        }else{
            uiControl.enableNextButton()
        }
        uiControl.disableConfirmation()

        let questionType = questionObject.type
        let questionText = questionObject.question
        let answers = questionObject.answers
        
        switch(questionType.toLowerCase()){
            case 'mcq':
                updateSceneAndCamera(mcqScene, mcqCamera)
                currentCenterModel = null
                player.position.set(0,-.6, 2)
                player.rotation.set(0,0,0)
                controls.disablePlayerControl()
                break;
            case 'joystick':
                if(questionObject.centerModelKey){
                    const centerModel = assetLoader.getModel(questionObject.centerModelKey)
                    if(currentCenterModel){
                        joystickScene.remove(currentCenterModel)
                        currentCenterModel = null
                    }
                    joystickScene.add(centerModel)
                    currentCenterModel = centerModel
                }
                updateSceneAndCamera(joystickScene, joystickCamera)
                controls.enablePlayerControl()
                break;
        }
        
        uiControl.updateUI(questionType, questionText, answers)
        mainScene.add(player)
    }
}

//Used to change the scene and camera
function updateSceneAndCamera(sceneObject, cameraObject){
    mainScene = sceneObject
    mainCamera = cameraObject

    mainCamera.aspect = sizes.width / sizes.height
    mainCamera.updateProjectionMatrix()
}
//
//      end of Implementation for loading a question

//      Calculating distance between player and the center model
//

function calculateDistance(){
    const player = assetLoader.getModel('playerCharacter')
    let distance

    if(player && currentCenterModel){
        distance = player.position.distanceTo(currentCenterModel.position)
    }

    if(distance > 1 && distance < 1.5){
        cylinder3.material = rad1Material
    }
    else
    {
        cylinder3.material = RingMaterial
    }

     //neutral face
    if(distance > 0.5 && distance < 1){
        cylinder2.material = rad1Material
    }
    else{
        cylinder2.material = floorMaterial
    
    }

     // Happy face
    if(distance > 0 && distance < 0.5){
        cylinder.material = rad1Material
        }  
    else{
        cylinder.material = RingMaterial  
    }
}

//
//      end of Calculating distance between player and the center model