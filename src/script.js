import './style.css'
import * as THREE from 'three'

//      Initializing application properties
//
let surveyStarted = false //other modules can read this value to see if the survey has started

let questionIndex = 0 //indicates the question to be loaded
 
let confirmedAnswers = [] //stores confirmed answers

function startSurvey(){//call this function when loading is complete
    surveyStarted = true
    console.log("Survey started")
    //Call any functions related to starting the survey (setting up the first scene etc..)
}

function isSurveyStarted(){
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

const scene = new THREE.Scene() //scene can be imported by questions module to add and remove question specific models

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)

const canvas = document.querySelector('canvas.webgl')

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})

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
    renderer.render(scene,camera)
}
//
//      end of Implementing game loop


//      Main JS Notes
//-Controls question index
//-Stores selected answers
//-Displays submit page and posts answers to DB
