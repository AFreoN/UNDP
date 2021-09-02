import './style.css'
import * as THREE from 'three'
import * as questions from './questions/questions' 
import * as assetLoader from './assets_loader/assets_loader'
import * as controls from './character_controller/character_control'

//      Initializing application properties
//
let surveyStarted = false //other modules can read this value to see if the survey has started

let questionIndex = 0 //indicates the question to be loaded
 
export let confirmedAnswers = [] //stores confirmed answers

export function startSurvey(){//call this function when loading is complete
    document.getElementById('loading-container').classList.add('closed')
    surveyStarted = true

    questions.loadQuestion(questionIndex)
    var player = assetLoader.getModel('playerCharacter')
    var playerAnimations = assetLoader.getPlayerAnimations()
    mainScene.add(player)
    
    controls.setPlayer(player, playerAnimations)
    controls.enablePlayerControl()
    //Call any functions related to starting the survey (setting up the first scene etc..)
}

export function isSurveyStarted(){
    return surveyStarted;
}
//
//      end of Initializing application properties

//      Initializing 3D scene properties
//
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

export const mainScene = new THREE.Scene() //scene can be imported by questions module to add and remove question specific models

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 2
camera.position.z = 4.0
camera.rotation.set(Math.PI * -0.2, 0, 0)

const canvas = document.querySelector('canvas.webgl')

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})

// Update camera
camera.aspect = sizes.width / sizes.height
camera.updateProjectionMatrix()

// Update renderer
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

//Setting up level

//add floor
const floorgeo = new THREE.BoxGeometry(100,.05,100);
const floorMaterial = new THREE.MeshBasicMaterial( {color: 0xfff4db});
const RingMaterial = new THREE.MeshBasicMaterial({color: 0xf5eddc})

const floor = new THREE.Mesh (floorgeo, floorMaterial);
floor.position.y = -.65

mainScene.add(floor);

//Adding rings

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

mainScene.add( cylinder);
mainScene.add( cylinder2 );
mainScene.add( cylinder3 );

//Adding light
const pointLight = new THREE.PointLight(0xffffff, 3)

pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
pointLight.intensity = 1.3

mainScene.add(pointLight)

//Models can be assigned here or in respective modules.

//
//      end of Initializing 3D scene properties


//      Enabling responsiveness for 3D scene
//
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

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
    
    //Implement loop here

    window.requestAnimationFrame(tick)
    renderer.render(mainScene,camera)
}

tick()
//
//      end of Implementing game loop


//      Main JS Notes
//-Controls question index
//-Stores selected answers
//-Displays submit page and posts answers to DB
