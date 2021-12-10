import * as THREE from 'three'
import * as assetLoader from '../assets_loader/assets_loader'
import * as controls from '../character_controller/character_control'
import * as uiControl from '../ui_controller/ui_controller'
import * as scenes from './scenes'
import {getSelectedCountry, confirmedAnswers} from '../script'
import { Camera, MathUtils } from 'three'
import * as sceneTransition from '../SceneTransition'
import { clamp } from 'three/src/math/mathutils'
import { Questions } from './QuestionArray'
import * as answerUpdater from '../ui_controller/answerUIupdater'
import * as stage3Transition from '../ui_controller/stage3Transition'
import * as outliner from '../character_controller/charcater_outliner'

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
export const qArray = Questions;
uiControl.setUiText()

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

export const renderer = new THREE.WebGLRenderer({
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

const stage3Scene = scenes.stage3Scene
const stage3Camera = scenes.stage3Camera

const submitScene = scenes.submitScene
const submitCamera = scenes.submitCamera

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

    document.getElementsByTagName('body')[0].style.height = window.innerHeight + "px" 
    document.getElementsByTagName('html')[0].style.height = window.innerHeight + "px" 

    // console.log(window.innerHeight);
    // console.log(window.outerHeight);
    // console.log(document.getElementsByTagName('body')[0].clientHeight)

    window.scrollTo(0,0)
})

document.getElementsByTagName('body')[0].style.height = window.innerHeight + "px" 
document.getElementsByTagName('html')[0].style.height = window.innerHeight + "px" 

// console.log(window.innerHeight);
// console.log(window.outerHeight);
// console.log(document.getElementsByTagName('body')[0].clientHeight)
//
//      end of Enabling responsiveness for 3D scene

//      Implementing game loop
var animMixers = []

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
    if(currentQuestion){
        var cloudMoveCondition = currentQuestion.type == 'joystick' || currentQuestion.type == 'likert5' || currentQuestion.type == 'likert4' || currentQuestion.type == 'likert7'
        if(cloudMoveCondition)
            animateClouds(deltatime)
    }

    if(animMixers){
        animMixers.forEach(element => {
            element.update(deltatime)
        });
    }
    //Implement loop here

    window.requestAnimationFrame(tick)
    // if(currentQuestion && currentQuestion.type == 'joystick')
    //     outliner.renderOutlineJoystickscene()
    // else
    //     outliner.renderOutline()
    if(currentQuestion){
        const transitionCondition = currentQuestion.type == 'joystick' || currentQuestion.type == 'likert4' || currentQuestion.type == 'likert5' || currentQuestion.type == 'likert7'
        if(transitionCondition){
            outliner.renderOutlineJoystickscene()
        }
        else
            outliner.renderOutline()
    }
    else
        renderer.render(mainScene, mainCamera)
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
    si : 'ඔබ',
    ta : 'நீங்கள்',
    dv : 'You'//Note - Unfinished Translations
}


//Takes a question object from the array above and updates UI with the info.
//Implement updating models/ environment in respect to the question
export function loadQuestion(questionIndex){
    if(player == null){
        player = assetLoader.getModel('playerCharacter')
        playerName.innerText = playerNamesLang[langId]
        sceneTransition.initializeData(player, joystickCamera, controls.getPlayerInitialPosition())

        // outliner.setOutlineObject(joystickCamera, joystickScene, renderer)
        outliner.addOutlineObject(player)
    }
    controls.disablePlayerControl()
    characterText.hidden = true
    playerName.hidden = true

    var UIUpdateNeeded = true
    const transitionCondition = prevQues == 'joystick' || prevQues == 'likert5' || prevQues == 'likert4' || prevQues == 'likert7'
    currentQuestion = qArray[questionIndex]

    if(currentQuestion){
        // if(questionIndex <= 0 ){
        //     uiControl.disableBackButton()
        // }else{
        //     uiControl.enableBackButton()
        // }
        // if(questionIndex >= numberOfQuestions - 1){
        //     // uiControl.disableNextButton()
        // }else{
        uiControl.enableBackButton()
        uiControl.enableNextButton()
        // }
        uiControl.disableConfirmation()

        let questionType = currentQuestion.type
        let questionText 
        if(questionType === 'about'){
            questionText = currentQuestion.question
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
                        // updateSceneAndCamera(emptyScene, emptyCamera)
                        break;
                }
                
                break;
            case 'about':
                console.log(player);
                if(prevQues != 'joystick'){
                    scenes.resetCurrentSelectionScene()
                    updateSceneAndCamera(aboutScene, aboutCamera)
                    currentCenterModel = null
                    player.position.set(0,-.6, 2)
                    player.rotation.set(0,0,0)
                    controls.disablePlayerControl()
                    aboutScene.add(player)
                    controls.playIdleAnimation()
                }
                else{
                    UIUpdateNeeded = false;
                    fadeOutCurrentUI(prevQues)
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
                        controls.playIdleAnimation()
                    });
                }
                break;
            case 'joystick':
                uiControl.sliderHolder.hidden = true;
                
                var slideDirection = questionIndex - qId;
                var dir = slideDirection > 0 ? 'right' : 'left';
                fadeOutCurrentUI(prevQues);
                if(transitionCondition){     //If previos scene is joystick scene, then scene has to fadeout first then fadein to other scene
                    UIUpdateNeeded = false;
                    
                    sceneTransition.fadeOut(prevOtherModel, dir, function(){
                        scenes.resetCurrentSelectionScene();
                        setupJoystickScene(currentQuestion, player, questionIndex);
                        setPlayerRotationLikert5(3);
                        //updateSceneAndCamera(joystickScene, joystickCamera, true);
                        sceneTransition.fadeIn(prevOtherModel, dir,true, null, controls.getPlayerInitialPosition().x, joystickCamera);
                    });
                }
                else{
                    scenes.resetCurrentSelectionScene();
                    if(questionIndex != 3){     //questionIndex 3 is mother scene
                        setupJoystickScene(currentQuestion, player, questionIndex);
                        updateSceneAndCamera(joystickScene, joystickCamera);
                        sceneTransition.fadeIn(prevOtherModel, dir,true, null, controls.getPlayerInitialPosition().x, joystickCamera);
                    }
                    else{
                        setupJoystickScene(currentQuestion, player, questionIndex);
                        updateSceneAndCamera(joystickScene, joystickCamera);
                        sceneTransition.jumpIn();
                    }
                }
                break;
            case 'likert5':
                var slideDirection = questionIndex - qId;
                var dir = slideDirection > 0 ? 'right' : 'left';
                if(transitionCondition){
                    UIUpdateNeeded = false;
                    fadeOutCurrentUI(prevQues);

                    sceneTransition.fadeOut(prevOtherModel, dir, function(){
                        scenes.resetCurrentSelectionScene();

                        addModelToScene(joystickScene, clouds.low)
                        addModelToScene(joystickScene, clouds.mid)
                        addModelToScene(joystickScene, clouds.high)
                        removeModelsFromScene(joystickScene, models);
                        removeModelsFromScene(stage3Scene, models)
                        models = scenes.GetModelIds(questionIndex)
                        if(models != null)
                            addModelsForThisScene(joystickScene, models)

                        updateSceneAndCamera(joystickScene, joystickCamera);
                        if(currentCenterModel)
                            joystickScene.remove(currentCenterModel);
                        currentCenterModel = null;
                        player.position.set(0,-.6, 0);
                        //player.rotation.set(0,0,0);
                        controls.disablePlayerControl();
                        addModelToScene(joystickScene, player);
                        controls.setOtherCharacter(null, null, null);
                        uiControl.updateUI(questionType, questionText, answers);
                        uiControl.setSurveyProgressValue(questionIndex);
                        answerUpdater.updateLikert5(confirmedAnswers[questionIndex])
                        if(currentQuestion.options){
                            uiControl.setLikert5Options(currentQuestion.options);
                        }

                        sceneTransition.fadeIn(prevOtherModel, dir,false, null, 0, joystickCamera);
                    });
                }
                else{
                    scenes.resetCurrentSelectionScene();

                    addModelToScene(joystickScene, clouds.low)
                    addModelToScene(joystickScene, clouds.mid)
                    addModelToScene(joystickScene, clouds.high)
                    removeModelsFromScene(joystickScene, models);
                    removeModelsFromScene(stage3Scene, models)
                    models = scenes.GetModelIds(questionIndex)
                    if(models != null)
                        addModelsForThisScene(joystickScene, models)

                    updateSceneAndCamera(joystickScene, joystickCamera);
                    if(currentCenterModel)
                        joystickScene.remove(currentCenterModel);
                    currentCenterModel = null;
                    player.position.set(0,-.6, 0);
                    //player.rotation.set(0,0,0);
                    controls.disablePlayerControl();
                    addModelToScene(joystickScene, player);
                    controls.setOtherCharacter(null, null, null);
                    answerUpdater.updateLikert5(confirmedAnswers[questionIndex])
                    if(currentQuestion.options){
                        uiControl.setLikert5Options(currentQuestion.options);
                    }

                    sceneTransition.fadeIn(prevOtherModel, dir,false, null, 0, joystickCamera);
                }
                break;
            case 'likert4':
                var slideDirection = questionIndex - qId;
                var dir = slideDirection > 0 ? 'right' : 'left';
                if(transitionCondition){
                    UIUpdateNeeded = false;
                    fadeOutCurrentUI(prevQues);

                    sceneTransition.fadeOut(prevOtherModel, dir, function(){
                        scenes.resetCurrentSelectionScene();

                        addModelToScene(joystickScene, clouds.low)
                        addModelToScene(joystickScene, clouds.mid)
                        addModelToScene(joystickScene, clouds.high)
                        removeModelsFromScene(joystickScene, models);
                        removeModelsFromScene(stage3Scene, models)
                        models = scenes.GetModelIds(questionIndex)
                        if(models != null)
                            addModelsForThisScene(joystickScene, models)

                        updateSceneAndCamera(joystickScene, joystickCamera);
                        if(currentCenterModel)
                            joystickScene.remove(currentCenterModel);
                        currentCenterModel = null;
                        player.position.set(0,-.6, 0);
                        //player.rotation.set(0,0,0);
                        controls.disablePlayerControl();
                        addModelToScene(joystickScene, player);
                        controls.setOtherCharacter(null, null, null);
                        uiControl.updateUI(questionType, questionText, answers);
                        uiControl.setSurveyProgressValue(questionIndex);
                        answerUpdater.updateLikert4(confirmedAnswers[questionIndex])
                        spawnCharacters(confirmedAnswers[questionIndex])
                        if(currentQuestion.options)
                            uiControl.setLikert4Options(currentQuestion.options);

                        sceneTransition.fadeIn(prevOtherModel, dir,false, null, 0,joystickCamera);
                    });
                }
                else{
                    scenes.resetCurrentSelectionScene();

                    addModelToScene(joystickScene, clouds.low)
                    addModelToScene(joystickScene, clouds.mid)
                    addModelToScene(joystickScene, clouds.high)
                    removeModelsFromScene(joystickScene, models);
                    removeModelsFromScene(stage3Scene, models)
                    models = scenes.GetModelIds(questionIndex)
                    if(models != null)
                        addModelsForThisScene(joystickScene, models)

                    updateSceneAndCamera(joystickScene, joystickCamera);
                    if(currentCenterModel)
                        joystickScene.remove(currentCenterModel);
                    currentCenterModel = null;
                    player.position.set(0,-.6, 0);
                    //player.rotation.set(0,0,0);
                    controls.disablePlayerControl();
                    addModelToScene(joystickScene, player);
                    controls.setOtherCharacter(null, null, null);
                    answerUpdater.updateLikert4(confirmedAnswers[questionIndex])
                    spawnCharacters(confirmedAnswers[questionIndex])
                    if(currentQuestion.options)
                        uiControl.setLikert4Options(currentQuestion.options);

                    sceneTransition.fadeIn(prevOtherModel, dir,false, null, 0,joystickCamera);
                }
                break;
            case 'likert7':
                var slideDirection = questionIndex - qId;
                var dir = slideDirection > 0 ? 'right' : 'left';
                fadeOutCurrentUI(prevQues)

                //#region old code
                // if(prevQues != 'likert7'){
                //     UIUpdateNeeded = true;

                //     scenes.resetCurrentSelectionScene();
                //     removeModelsFromScene(joystickScene, models);
                //     removeModelsFromScene(stage3Scene, models)
                //     models = scenes.GetModelIds(questionIndex)
                //     if(models != null)
                //         addModelsForThisScene(stage3Scene, models)

                //     updateSceneAndCamera(stage3Scene, stage3Camera);
                //     if(currentCenterModel)
                //         joystickScene.remove(currentCenterModel);
                //     currentCenterModel = null;
                //     player.position.set(0,-.6, 0);
                //     //player.rotation.set(0,0,0);
                //     controls.disablePlayerControl();
                //     addModelToScene(stage3Scene, player);
                    
                //     const landModel = assetLoader.getModel('landstage3');
                //     if(questionIndex < 35){
                //         addModelToScene(stage3Scene, landModel);
                //         stage3Scene.getObjectByName('floor').position.set(0,-0.72,0);
                //     }
                //     else{
                //         stage3Scene.remove(landModel);
                //         stage3Scene.getObjectByName('floor').position.set(0,-0.6,0);
                //     }
                //     controls.setOtherCharacter(null, null, null);
                //     //uiControl.updateUI(questionType, questionText, answers);
                //     //uiControl.setSurveyProgressValue(questionIndex);
                //     answerUpdater.updateLikert7(confirmedAnswers[questionIndex])
                //     stage3Transition.startFadeIn()
                // }
                //#endregion
                if(prevQues != 'likert7'){
                    UIUpdateNeeded = false;
                    fadeOutCurrentUI(prevQues)

                    sceneTransition.fadeOut(prevOtherModel, dir, function(){
                        scenes.resetCurrentSelectionScene();

                        addModelToScene(stage3Scene, clouds.low)
                        addModelToScene(stage3Scene, clouds.mid)
                        addModelToScene(stage3Scene, clouds.high)
                        removeModelsFromScene(joystickScene, models);
                        removeModelsFromScene(stage3Scene, models)
                        models = scenes.GetModelIds(questionIndex)
                        if(models != null)
                            addModelsForThisScene(stage3Scene, models)
    
                        updateSceneAndCamera(stage3Scene, stage3Camera);
                        if(currentCenterModel)
                            joystickScene.remove(currentCenterModel);
                        currentCenterModel = null;
                        player.position.set(0,-.6, 0);
                        //player.rotation.set(0,0,0);
                        controls.disablePlayerControl();
                        addModelToScene(stage3Scene, player);
                        
                        const landModel = assetLoader.getModel('landstage3');
                        if(questionIndex < 35){
                            addModelToScene(stage3Scene, landModel);
                            stage3Scene.getObjectByName('floor').position.set(0,-0.72,0);
                        }
                        else{
                            stage3Scene.remove(landModel);
                            stage3Scene.getObjectByName('floor').position.set(0,-0.6,0);
                        }
                        controls.setOtherCharacter(null, null, null);
                        uiControl.updateUI(questionType, questionText, answers);
                        uiControl.setSurveyProgressValue(questionIndex);
                        answerUpdater.updateLikert7(confirmedAnswers[questionIndex])
                        sceneTransition.fadeIn(prevOtherModel, dir, false, null, 0, stage3Camera)
                        //stage3Transition.startFadeIn()
                    })
                }
                else{
                    UIUpdateNeeded = false;
                    stage3Transition.startFadeOut(function(){
                        scenes.resetCurrentSelectionScene();

                        addModelToScene(stage3Scene, clouds.low)
                        addModelToScene(stage3Scene, clouds.mid)
                        addModelToScene(stage3Scene, clouds.high)
                        removeModelsFromScene(joystickScene, models);
                        removeModelsFromScene(stage3Scene, models)
                        models = scenes.GetModelIds(questionIndex)
                        if(models != null)
                            addModelsForThisScene(stage3Scene, models)

                        updateSceneAndCamera(stage3Scene, stage3Camera);
                        if(currentCenterModel)
                            joystickScene.remove(currentCenterModel);
                        currentCenterModel = null;
                        player.position.set(0,-.6, 0);
                        //player.rotation.set(0,0,0);
                        controls.disablePlayerControl();
                        addModelToScene(stage3Scene, player);
                        
                        const landModel = assetLoader.getModel('landstage3');
                        if(questionIndex < 35){
                            addModelToScene(stage3Scene, landModel);
                            stage3Scene.getObjectByName('floor').position.set(0,-0.72,0);
                        }
                        else{
                            stage3Scene.remove(landModel);
                            stage3Scene.getObjectByName('floor').position.set(0,-0.6,0);
                        }
                        controls.setOtherCharacter(null, null, null);
                        uiControl.updateUI(questionType, questionText, answers);
                        uiControl.setSurveyProgressValue(questionIndex);
                        answerUpdater.updateLikert7(confirmedAnswers[questionIndex])
                    })
                }
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

    // outliner.setOutlineObject(joystickCamera, joystickScene, renderer)
    // outliner.addOutlineObject(player)
    if(currentQuestion.centerModelKey){
        const centerModel = assetLoader.getModel(currentQuestion.centerModelKey)
        if(currentCenterModel){
            joystickScene.remove(currentCenterModel)
            currentCenterModel = null
        }
        outliner.addOutlineObject(centerModel)
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

        if(clouds.low == null){
            let cloud1 = assetLoader.getModel('cloud1')
            cloud1.position.set(2, 2.8,-12)     //prev (2, 1.8,-12)
            clouds.low = cloud1 
        }

        if(clouds.mid == null){
            let cloud2 = assetLoader.getModel('cloud2')
            cloud2.position.set(0.5, 2.2,-12)
            clouds.mid = cloud2
        }

        if(clouds.high == null){
            let cloud3 = assetLoader.getModel('cloud3')
            cloud3.position.set(-1.5, 1.6,-10)
            clouds.high = cloud3
        }
    
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

        addModelToScene(joystickScene, clouds.low);
        addModelToScene(joystickScene, clouds.mid);
        addModelToScene(joystickScene, clouds.high);
        /*
        outliner.addOutlineObject(cloud1)
        outliner.addOutlineObject(cloud2)
        outliner.addOutlineObject(cloud3)
        outliner.addOutlineObject(tree1)
        outliner.addOutlineObject(tree2)
        outliner.addOutlineObject(tree3)
        outliner.addOutlineObject(tree4)
        outliner.addOutlineObject(tree5)
        outliner.addOutlineObject(tree6)
        outliner.addOutlineObject(tree7)
        outliner.addOutlineObject(tree8)
        outliner.addOutlineObject(tree9)
        outliner.addOutlineObject(tree10)
*/
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
        player.position.set(0,-0.6,0);
        //player.rotation.y = 0
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
        //console.log("No models array avaiable for this scene (Question index = ", questionIndex,")")
    }

    uiControl.updateUI(currentQuestion.type, currentQuestion.question[langId], currentQuestion.answers);
    uiControl.setSurveyProgressValue(questionIndex);
}

function fadeOutCurrentUI(questionType){
    switch(questionType){
        case 'joystick':
            uiControl.fadeOutSliderContainer();
            break;
        case 'likert4':
            uiControl.FadeOutLikert4();
            break;
        case 'likert5':
            uiControl.FadeOutLiker5();
            break;
        case 'likert7':
            uiControl.FadeOutLikert7();
            break;
    }
}

export function spawnCharacters(value){
    if(qId == 19)   //19 is non number 4 option question
        return

    removeModelsFromScene(joystickScene, models)
    models = scenes.GetSpawnModelIds(value)
    
    if(models != null)
        addModelsForThisScene(joystickScene, models)
}

function addModelsForThisScene(scene, modelsArray){
    if(modelsArray == null)
        return

    // if(currentQuestion.type == 'likert4' || currentQuestion.type == 'likert5' || currentQuestion.type == 'likert7')
    //     controls.disableOtherCharacterMixer()}

    if(animMixers){
        animMixers.forEach(am => {
            am.stopAllAction()
            am.uncacheRoot(am.getRoot())
        })
    }
    animMixers = []

    modelsArray.forEach(element => {
        var m = assetLoader.getModel(element.name);
        if(m != null){
            if(element.anim != null){
                var mixer = new THREE.AnimationMixer(m)
                var animations  = assetLoader.getOtherCharacterAnimations(element.name)
                animations.forEach(a => {
                    mixer.clipAction(a).reset()
                    mixer.clipAction(a).stop()
                })
                if(parseInt(element.anim) == 0){
                    console.log("Playing 0 animation = ", animations[parseInt(element.anim)])
                }
                if(element.animSpeed != null){
                    mixer.timeScale = parseFloat(element.animSpeed)
                }
                mixer.clipAction(animations[parseInt(element.anim)]).play()
                animMixers.push( mixer )
            }

            m.position.set(element.position.x, element.position.y, element.position.z);
            m.rotation.x = MathUtils.degToRad(element.rotation.x);
            m.rotation.y = MathUtils.degToRad(element.rotation.y);
            m.rotation.z = MathUtils.degToRad(element.rotation.z);
            if(element.scale){
                m.scale.set(element.scale.x, element.scale.y, element.scale.z)
            }
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

// export function removeModelsInLastScene(){
//     if(currentCenterModel){
//         joystickScene.remove(currentCenterModel)
//     }
//     if(mainScene === joystickScene){
//         if(models){
//             removeModelsFromScene(joystickScene, models)

//         }
//     }
// }


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

    outliner.setOutlineObject(cameraObject, sceneObject, renderer)

    mainCamera.aspect = sizes.width / sizes.height
    mainCamera.updateProjectionMatrix()
}

function animateClouds(deltaTime){
    const baseSpeed = -0.1
    const speedMultiplier = {
        high: 0.6,
        mid: 1.7,
        low: 1.1
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

export function setPlayerRotationLikert5(value){
    controls.setPlayerRotationForLikert5(value)
}

export function setPlayerRotationLikert4(value){
    controls.setPlayerRotationForLikert4(value)
}

export function setPlayerRotationLikert7(value){
    controls.setPlayerRotationForLikert7(value)
}

export function resetPlayerRotation(){
    controls.resetPlayerRotation()
}

//Sets scene submit scene, enabled separately due to submit scene not being in the questions array
export function enableSubmitScene(){
    const player = assetLoader.getModel('playerCharacter')
    console.log(player);


    if(prevQues != 'joystick'){
        updateSceneAndCamera(submitScene,submitCamera)
        currentCenterModel = null
        player.position.set(0,-.6, 2)
        player.rotation.set(0,0,0)
        controls.disablePlayerControl()
        submitScene.add(player)
    }
    else{
        sceneTransition.jumpOut(function() {
            scenes.resetCurrentSelectionScene()
            updateSceneAndCamera(submitScene,submitCamera)
            currentCenterModel = null
            player.position.set(0,-.6, 2)
            player.rotation.set(0,0,0)
            controls.disablePlayerControl()
            submitScene.add(player)
            prevQues = ''
        });
    }
}

let newModel = assetLoader.getModel('playerCharacter')
export function updateSubmitModel(loc){
    submitScene.remove(assetLoader.getModel('playerCharacter'))
    submitScene.remove(newModel)

    switch(loc){
        case 0:
            newModel = assetLoader.getModel('changeSeeker')
            break;
        case 1:
            newModel = assetLoader.getModel('mapMaker')
            break;
        case 2:
            newModel = assetLoader.getModel('adventurer')
            break;        
    }

    submitScene.add(newModel)

}
//Calculating distance between player and the center model
