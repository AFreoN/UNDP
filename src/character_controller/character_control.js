import * as THREE from 'three'
import { Vector3 } from 'three';
import { joystickSlider,joystickSlideValue, resetJoystickSlider, sliderHolder } from '../ui_controller/ui_controller';
import {updateNameIndicator, EnableCharacterText} from '../questions/questions'
import { joystickScene ,ring1, ring2} from '../questions/scenes'
//Character control



//can enable/disable player control using canControlPlayer
let canControlPlayer = false;
let canControlOtherPlayer = false;
const controlDelay = 0.3;
var onInputDelay = false;
var targetTime = 0;

const ringYPos = -0.59;
const ringClearance = 0.001;

export function enablePlayerControl(){
    canControlPlayer = true;

    var xPos = -startX + stepValue * (joystickSlideValue + 50);
    player.position.set(xPos, PlayerYPos, 0);
    curPlayerPosition = player.position.clone();

    sliderHolder.hidden = false;

    ring1.position.set(player.position.x, ringYPos, player.position.z);
    if(otherCharacter)
        ring2.position.set(otherCharacter.position.x, ringYPos + ringClearance, otherCharacter.position.z);
    joystickScene.add(ring1);
    joystickScene.add(ring2);
}

export function disablePlayerControl(){
    canControlPlayer = false;
    sliderHolder.hidden = true;
    joystickScene.remove(ring1);
    joystickScene.remove(ring2);
}

sliderHolder.addEventListener('change', function(){     //On value changed and input ended
    onSliderInputEnd();
})

sliderHolder.addEventListener('input', function(){      //Called while giving input
    if(onInputDelay == false && canControlOtherPlayer == false){
        targetTime = clock.getElapsedTime();
        canControlOtherPlayer = false;
        onInputDelay = true;
    }
});

const onSliderInputEnd = function(){    //On Input end on the slider
    canControlOtherPlayer = false;
}

const startX = 0.4;   //Starting x position of the character eg. 1 for character 1 and -1 for character 2     //prev 1
const stepValue = 0.00005; //Distance of character movement on each change in slider value    //Prev 0.125

let player = null; //Holds player model
let playerMixer = null; //Holds player animation mixer
let playerAnimations = null //Holds player animation array
var animationIndex = -1;     //Id for current playing animation  2-Idle, 3-Walk

let otherCharacter = null;
var otherYPos = 0;
let otherMixer = null;
let otherAnimations = null;
var otherIdle = true;
var otherAnimationIndex = -1;    // 2- idle, 3-walk

var camera = null;

const playerSpeed = 0.15
var moveDirection = new THREE.Vector2(0,0)
var curDirection = new THREE.Vector2()

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize',()=>{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
})

//executes when loading is complete. Imports player model, animation mixer and animations
export function setPlayer(playerModel, playerAnims){
    player = playerModel
    playerMixer = new THREE.AnimationMixer(player)
    playerAnimations = playerAnims
    ring1.position.set(player.position.x, ringYPos, player.position.z);
}

const PlayerYPos = -0.6;
export function setOtherCharacter(otherModel, _otherAnimation){
    resetJoystickSlider();
    canControlOtherPlayer = false;
    otherIdle = 0;
    otherAnimationIndex = -1;
    otherMovingTime = 0;
    otherStoppingTime = 0;

    otherYPos = otherModel.position.clone().y;
    curOtherPosition.y = otherYPos;
    otherCharacter = otherModel;
    //curOtherPosition = otherCharacter.position;
    const idleId = 1, walkId = 2, startId = 0, endId = 1;
    if(_otherAnimation != null){
        otherMixer = new THREE.AnimationMixer(otherCharacter);
        otherAnimations = _otherAnimation;

        otherMixer.clipAction(otherAnimations[idleId]).reset();
        otherMixer.clipAction(otherAnimations[walkId]).reset();
    }
    else{
        otherAnimations = null;
        otherMixer = null;
    }

    var xPos = -startX + stepValue * (joystickSlideValue + 50);
    //player.position.set(xPos, PlayerYPos, 0);
    curPlayerPosition = player.position.clone();

    otherXpos = startX - stepValue * (joystickSlideValue + 50);
    otherCharacter.position.set(otherXpos, otherCharacter.position.y, 0);
    curOtherPosition.x = otherXpos;
    curOtherPosition.y = otherModel.position.y;

    ring1.position.set(player.position.x, ringYPos, player.position.z);
    ring2.position.set(otherCharacter.position.x, ringYPos + ringClearance, otherCharacter.position.z);
}

const cameraZoomDis = window.innerHeight / window.innerWidth;
var cameraPos = null;
export function setCamera(_camera){
    camera = _camera;
    if(camera && cameraPos == null){
        cameraPos = camera.position.clone();
    }
};

export function getPlayerInitialPosition(){
    var x = -startX + stepValue * 50;
    var vec = new THREE.Vector3(x, player.position.clone().y, 0);
    return vec;
}

export function getOtherCharacterInitialPosition(){
    var x = startX - stepValue * 50;
    var vec = new THREE.Vector3(x, otherCharacter.position.y, 0);
    return vec;
}

const up = new THREE.Vector2(0,1)
const startMousePos = new THREE.Vector2()
const curMousePos = new THREE.Vector2()
const startTouchPos =  new THREE.Vector2()
const curTouchPos = new THREE.Vector2()

const minMoveDis = 0.04     //Minimum distance(movePixels/screenwidth) to change start mouse position

window.addEventListener('mousemove', (event) =>
{
    onDocumentMouseMove(event)
})

//adding event listeners for controls

//mouse events
//document.addEventListener('mousedown', onDocumentMouseDown)
//document.addEventListener('mouseup', onDocumentMouseUp)

//touch events
//document.addEventListener('touchstart', onDocumentTouchStart)
//document.addEventListener('touchmove', onDocumenttouchMove, preventDefault)
//document.addEventListener('touchend', onDocumentTouchEnd)
//document.addEventListener('touchcancel', onDocumentTouchEnd)

//disable Scrolling
function preventDefault(e) {
    e.preventDefault();
}

//keyboard events
document.addEventListener('keydown', keyPressedNew )
document.addEventListener('keyup',  keyLiftedNew)

const windowX = window.innerWidth / 2 ;
const windowY = window.innerHeight / 2;

//Is character moving
var move= false;

//#region Event function set
//variables for touch movement
var touchy,touchx, touchnewy, touchnewx;

function onDocumentMouseDown(event){
    move = true;

    startMousePos.x = event.clientX;
    startMousePos.y = event.clientY;

    moveDirection.x = 0;
    moveDirection.y = 0;
    curDirection.x = 0;
    curDirection.y = 0;
}

function onDocumentMouseMove(event) {
    curMousePos.x = event.clientX;
    curMousePos.y = event.clientY;

    var deltaX = curMousePos.x - startMousePos.x;
    var deltaY = curMousePos.y - startMousePos.y;

    if(move)
    {
         idle = false;

         moveDirection.x = deltaX;
         moveDirection.y = deltaY;
         moveDirection.normalize();

         var val = curMousePos.clone().sub(startMousePos).length() / screen.width;

         if(val >= minMoveDis){
            startMousePos.x = curMousePos.x;
            startMousePos.y = curMousePos.y;
         }
    }   
}

function onDocumentMouseUp(event){
    move = false;
    moveforward = false;
    movebackwards= false;
    moveleft = false;
    moveright = false;
    idle = true;
}

function onDocumentTouchStart(event){
    
    move = true;

    startTouchPos.x = event.touches[0].clientX;
    startTouchPos.y = event.touches[0].clientY;
    
    moveDirection.x = 0;
    moveDirection.y = 0;
    curDirection.x = 0;
    curDirection.y = 0;

    window.scroll = false;
}    

function onDocumenttouchMove(event){
    curTouchPos.x = event.touches[0].clientX;
    curTouchPos.y = event.touches[0].clientY;

    var deltaX = curTouchPos.x - startTouchPos.x;
    var deltaY = curTouchPos.y - startTouchPos.y;

    if(move)
    {
         idle = false;

         moveDirection.x = deltaX;
         moveDirection.y = deltaY;
         moveDirection.normalize();

         var val = curTouchPos.clone().sub(startTouchPos).length() / screen.width;

         if(val >= minMoveDis){
            startTouchPos.x = curTouchPos.x;
            startTouchPos.y = curTouchPos.y;
         }
    } 
}

function onDocumentTouchEnd(event){
    move = false;
    moveforward = false;
    movebackwards= false;
    moveleft = false;
    moveright = false;
    idle = true;
}
//#endregion

var moveforward, movebackwards, moveleft, moveright
var idle = true;
var curPlayerPosition = new THREE.Vector3(-2, -0.6, 0);
var curOtherPosition = new THREE.Vector3(2, -0.6, 0);
var curCameraPosition = new THREE.Vector3();

var otherXpos;
const lerpSpeed = 0.1;
const oneVector = new THREE.Vector3(1,1,1);

var ringUp = true;
const minRingJoinDistance = 0.05;
var finalScale;

function Movecharacter(){
    //#region  For setting player position
    idle = true;
    otherIdle = true;

    var xPos = -startX + stepValue * (joystickSlideValue + 50);
    curPlayerPosition.lerp(new Vector3(xPos, PlayerYPos, 0), lerpSpeed);

    if(player.position.x != curPlayerPosition.x){
        //console.log("Player position is = ", player.position.x);
    }

    player.position.set(curPlayerPosition.x, curPlayerPosition.y, curPlayerPosition.z);

    let minDis = 0.005;

    var abs = Math.abs(xPos - player.position.x);
    if((abs) < minDis){
        idle = true;
    }
    else{
        idle = false;
    }
    //#endregion

    //#region For setting other character position
    if(!otherXpos) otherXpos = otherCharacter.position.clone().x;

    if(canControlOtherPlayer)
        otherXpos = startX - stepValue * (joystickSlideValue + 50);
    // else if(prevSlideValue != joystickSlideValue && onInputDelay == false){

    //     prevSlideValue = joystickSlideValue;
    //     targetTime = clock.getElapsedTime();
    //     onInputDelay = true;
    // }

    curOtherPosition.lerp(new Vector3(otherXpos, otherYPos, 0), lerpSpeed);

    otherCharacter.position.set(curOtherPosition.x, curOtherPosition.y, curOtherPosition.z);
    updateNameIndicator(otherCharacter);
    EnableCharacterText();

    abs = Math.abs(otherXpos - otherCharacter.position.x);
    if((abs) < minDis){
        otherIdle = true;
    }
    else{
        otherIdle = false;
    }
//#endregion

    //#region For setting camera position
    var curZoomDis = joystickSlideValue / 50 * cameraZoomDis;
    camera.getWorldDirection(curCameraPosition);
    curCameraPosition.normalize();

    curCameraPosition.multiplyScalar(curZoomDis);

    curCameraPosition.add(cameraPos);
    camera.position.lerp(curCameraPosition, lerpSpeed * 0.3);
    //#endregion

    //#region For setting up ring position
    const scaleLerpSpeed = 0.3;
    if(joystickSlideValue != 50){
        var finalPos = player.position.clone();
        finalPos.y = ringYPos;
        ring1.position.lerp(finalPos, lerpSpeed);
        finalPos = otherCharacter.position.clone();
        finalPos.y = ringYPos + ringClearance;
        ring2.position.lerp(finalPos, lerpSpeed * 2);

        ring1.scale.lerp(oneVector, scaleLerpSpeed);
        ring2.scale.lerp(oneVector, scaleLerpSpeed);
        ringUp = true;
    }
    else{
        var finalPos = player.position.clone().add(otherCharacter.position);
        finalPos.x *= 0.5;
        finalPos.y = ringYPos;
        finalPos.z *= 0.5;
        ring1.position.lerp(finalPos, lerpSpeed);
        finalPos.y += ringClearance;
        ring2.position.lerp(finalPos,lerpSpeed * 2);

        var dis = Math.abs(ring2.position.x - ring1.position.x);
        if(dis < minRingJoinDistance){
            if(ringUp == true){
                if(!finalScale){
                    finalScale = ring1.scale.clone();
                    finalScale.x *= 0.7;
                    finalScale.z *= 1.3;
                }

                ring1.scale.lerp(finalScale, scaleLerpSpeed);
                ring2.scale.lerp(finalScale, scaleLerpSpeed);

                if(Math.abs(ring1.scale.x - finalScale.x) < 0.05){
                    ringUp = false;
                }
            }
            else{
                ring1.scale.lerp(oneVector, scaleLerpSpeed);
                ring2.scale.lerp(oneVector, scaleLerpSpeed);
            }
        }
    }
    //#endregion
}

//#region JoystickControls

function oldPlayerMovement(){
    if(moveforward ){
        player.position.z +=  -.01
        player.rotation.set(0,Math.PI * 1,0)
        idle = false;
    }

    if(movebackwards ){
        player.position.z +=  .01
        player.rotation.set(0, 0 , 0)
        idle = false;
    }

    if(moveright ){
        player.position.x +=  .01
        player.rotation.set(0,Math.PI * .5 ,0)
        idle = false;
    }
  
    if(moveleft ){
        player.position.x += -.01
        idle = false;
        player.rotation.set(0,Math.PI * -.5 ,0)
    }
}

function newPlayerMovement(){
    if(!move){
        return;
    }

    //idle = false;
    idle = moveDirection.length() > 0 ? false : true;
    curDirection.lerpVectors(curDirection, moveDirection, 0.7);
    player.position.x += curDirection.x * playerSpeed * 0.1;
    player.position.z += curDirection.y * playerSpeed * 0.1;

    newPlayerRotation();
}

function newPlayerRotation(){

    var dot = up.dot(curDirection);
    var angle = Math.acos(dot) * 57.296;
    //curMousePos.x < startMousePos.x
    if(curDirection.x < 0){
        angle = 360-angle;
    }

    var eu = new THREE.Euler(0, THREE.Math.degToRad(angle), 0, 'XYZ');
    var quat = new THREE.Quaternion().setFromEuler(eu);

    //player.rotation.set(0, THREE.Math.degToRad(angle), 0);
    player.quaternion.set(quat.x, quat.y, quat.z, quat.w);
}

function oldPlayerRotation(){
    if(moveleft && moveforward){
        player.rotation.set(0,Math.PI * -.7 ,0)
    }
    
    if(moveright && moveforward){
        player.rotation.set(0,Math.PI * .7 ,0)
    }

    if(moveleft && movebackwards){
        player.rotation.set(0,Math.PI * -.3 ,0)
    }

    if(moveright && movebackwards){
        player.rotation.set(0,Math.PI * .3 ,0)
    }
}

function limitArea(){
    //limit the player movment area
    if(player !== null){
        if( player.position.z >= 2.5){
            player.position.z = 2.5
        }

        if( player.position.z <= -2.5){
            player.position.z = -2.5
        }

        if( player.position.x >= 2.5){
            player.position.x = 2.5
        }

        if( player.position.x <= -2.5){
            player.position.x = -2.5
        }
    }
}


function keyPressed(){
    document.onkeydown = function(e){
        if(!e.ctrlKey){
            switch (e.key.toLowerCase()){
                case 'w':
                        moveforward = true;
                        idle = false;
                    break;
                    
                case 's':
                        movebackwards = true;
                        idle = false;
                    break;
    
                case 'd':
                        moveright = true;
                        idle = false;
                    break;  
                    
                case 'a':
                        moveleft = true;
                        idle = false;
                    break;
            }
        }        
    };
}

function keyPressedNew(){
    document.onkeydown = function(e){
        if(!e.ctrlKey){
            var isMoveKeyPressed = e.key.toLowerCase() == 'w' || e.key.toLowerCase() == 's' || 
                e.key.toLowerCase() == 'd' || e.key.toLowerCase() == 'a';
            
            if(!isMoveKeyPressed){
                return;
            }
            
            if(e.key.toLowerCase() == 'w'){     //Forward
                moveDirection.y += -1;
            }
            if(e.key.toLowerCase() == 's'){     //Backward
                moveDirection.y += 1;
            }
            if(e.key.toLowerCase() == 'd'){     //Right
                moveDirection.x += 1;
            }
            if(e.key.toLowerCase() == 'a'){      //Left
                moveDirection.x += -1;
            }

            move = true;
            moveDirection.normalize();
        }        
    };
}

function keyLiftedNew(){
    document.onkeyup = function(e){
        if(!e.ctrlKey){
            

            if(e.key.toLowerCase() == 'w'){     //Forward
                moveDirection.y = 0;
            }
            if(e.key.toLowerCase() == 's'){     //Backward
                moveDirection.y = 0;
            }
            if(e.key.toLowerCase() == 'd'){     //Right
                moveDirection.x = 0;
            }
            if(e.key.toLowerCase() == 'a'){      //Left
                moveDirection.x = 0;
            }

            moveDirection.normalize();
            move = moveDirection.length() > 0 ? true : false;
        }        
    };
}
function keylifted(){
    document.onkeyup = function(e){
        switch(e.key.toLowerCase()){
            case 'w':
                moveforward = false;
                idle = true;
                break;

            case 's':
                movebackwards = false;
                idle = true;
                break;    

            case 'd':
                moveright = false;
                idle = true;
                break;
                
            case 'a':
                moveleft = false;
                idle = true;
                break;    
        }
    }
}
//#endregion

//animates player depending on player's start (eg - idle/ running)  //2 - Idle, 3 - Walk
function animatePlayer(){
    const fadeDuration = 0.25;
    const idleId = 2, walkId = 4;
    if(canControlPlayer){
        const idleAction = playerMixer.clipAction(playerAnimations[idleId]);
        const walkAction = playerMixer.clipAction(playerAnimations[walkId]);
        if(idle){
            if(playerMixer)
            {
                // playerMixer.clipAction(playerAnimations[3]).stop();
                // playerMixer.clipAction(playerAnimations[2]).play();
                //Go to Idle
                if(animationIndex != idleId){
                    animationIndex = idleId;

                    //walkAction.stop();
                    idleAction.reset();
                    idleAction.crossFadeFrom(walkAction ,fadeDuration);
                    idleAction.play();
                }
            }
        }
        else
        {
            if(playerMixer)
            {
                // playerMixer.clipAction(playerAnimations[2]).stop();      
                // playerMixer.clipAction(playerAnimations[3]).play();
                //Go to Walk
                if(animationIndex != walkId){
                    animationIndex = walkId;

                    //idleAction.stop();
                    walkAction.reset();
                    walkAction.crossFadeFrom(idleAction, fadeDuration);
                    walkAction.play();
                }
            }
        }
    }else{
        if(playerMixer)
            {
                //Go to Idle
                if(animationIndex != idleId){
                    animationIndex = idleId;

                    const idleAction = playerMixer.clipAction(playerAnimations[idleId]);
                    const walkAction = playerMixer.clipAction(playerAnimations[walkId]);

                    //walkAction.stop();
                    idleAction.reset();
                    idleAction.crossFadeFrom(walkAction ,fadeDuration);
                    idleAction.play();
                }
            }
    }
    
}

function animateOtherCharacter(){
    const fadeDuration = 0.25;
    const idleId = 2, walkId = 4;
    if(canControlPlayer){
        const idleAction = otherMixer.clipAction(otherAnimations[idleId]);
        const walkAction = otherMixer.clipAction(otherAnimations[walkId]);
        if(otherIdle){
            if(otherMixer)
            {
                //Go to Idle
                if(otherAnimationIndex != idleId){
                    otherAnimationIndex = idleId;

                    //walkAction.stop();
                    idleAction.reset();
                    idleAction.crossFadeFrom(walkAction ,fadeDuration);
                    idleAction.play();
                }
            }
        }
        else
        {
            if(otherMixer)
            {
                //Go to Walk
                if(otherAnimationIndex != walkId){
                    otherAnimationIndex = walkId;

                    //idleAction.stop();
                    walkAction.reset();
                    walkAction.crossFadeFrom(idleAction, fadeDuration);
                    walkAction.play();
                }
            }
        }
    }else{
        if(otherMixer)
            {
                //Go to Idle
                if(otherAnimationIndex != idleId){
                    otherAnimationIndex = idleId;

                    const idleAction = otherMixer.clipAction(otherAnimations[idleId]);
                    const walkAction = otherMixer.clipAction(otherAnimations[walkId]);

                    //walkAction.stop();
                    idleAction.reset();
                    idleAction.crossFadeFrom(walkAction ,fadeDuration);
                    idleAction.play();
                }
            }
    }
    
}

var movingTime = 0;
var stoppingTime = 0;
const startDuration = 0.2;
const endDuration = 0.2;
const startFadeDuration = 0.15;
const endFadeDuration = 0.15;

function animatePlayerTHREE(){
    const fadeDuration = 0.25;
    //const idleId = 2, walkId = 4, startId = 1, endId = 0;
    const idleId = 0, walkId = 3, startId = 1, endId = 2;
    const idleAction = playerMixer.clipAction(playerAnimations[idleId]);
    const walkAction = playerMixer.clipAction(playerAnimations[walkId]);
    const startAction = playerMixer.clipAction(playerAnimations[startId]);
    const endAction = playerMixer.clipAction(playerAnimations[endId]);
    if(canControlPlayer){

        if(playerMixer == null)
            return;
        if(idle){
            if(stoppingTime >= endDuration){
                if(animationIndex != idleId){
                    animationIndex = idleId;
    
                    //walkAction.stop();
                    idleAction.reset();
                    idleAction.crossFadeFrom(endAction ,fadeDuration);
                    idleAction.play();
                }
            }
            else if(stoppingTime < endDuration){
                if(animationIndex != endId){
                    animationIndex = endId;

                    endAction.reset();
                    endAction.crossFadeFrom(walkAction, endFadeDuration);
                    endAction.play();
                }
            }
        }
        else
        {
            if(movingTime < startDuration){
                if(animationIndex != startId){
                    animationIndex = startId;

                    startAction.reset();
                    startAction.crossFadeFrom(idleAction, startFadeDuration);
                    startAction.play();
                }
            }
            else if(movingTime >= startDuration){
                if(animationIndex != walkId){
                    animationIndex = walkId;
    
                    //idleAction.stop();
                    walkAction.reset();
                    walkAction.crossFadeFrom(startAction, fadeDuration);
                    walkAction.play();
                }
            }
        }
    }else{
            //Go to Idle
            if(animationIndex != idleId){
                animationIndex = idleId;

                //walkAction.stop();
                idleAction.reset();
                idleAction.crossFadeFrom(walkAction ,endFadeDuration);
                idleAction.play();
            }
    }
}

var otherMovingTime = 0;
var otherStoppingTime = 0;

function animateOtherPlayerTHREE(){
    const fadeDuration = 0.25;
    const idleId = 0, walkId = 3, startId = 1, endId = 2;
    const idleAction = otherMixer.clipAction(otherAnimations[idleId]);
    const walkAction = otherMixer.clipAction(otherAnimations[walkId]);
    const startAction = otherMixer.clipAction(otherAnimations[startId]);
    const endAction = otherMixer.clipAction(otherAnimations[endId]);
    if(canControlOtherPlayer){
        if(otherMixer == null)
            return;
        if(otherIdle){
            if(otherStoppingTime < endDuration){    //Walk -> Stop
                if(otherAnimationIndex != endId){
                    otherAnimationIndex = endId;

                    endAction.reset();
                    endAction.crossFadeFrom(walkAction, endFadeDuration);
                    endAction.play();
                    //console.log("Walk to End, Can Control");
                }
            }
            else if(otherStoppingTime >= endDuration){      //Stop -> Idle
                if(otherAnimationIndex != idleId){
                    otherAnimationIndex = idleId;
    
                    //walkAction.stop();
                    idleAction.reset();
                    idleAction.crossFadeFrom(endAction ,endFadeDuration);
                    idleAction.play();
                    //console.log("End to Idle, Can Control");
                }
            }
        }
        else
        {
            if(otherMovingTime < startDuration){        //Idle -> Start
                if(otherAnimationIndex != startId){
                    otherAnimationIndex = startId;

                    startAction.reset();
                    startAction.crossFadeFrom(idleAction, startFadeDuration);
                    startAction.play();
                    //console.log("Idle to Start, Can Control");
                }
            }
            else if(otherMovingTime >= startDuration){      //Start to Walk
                if(otherAnimationIndex != walkId){
                    otherAnimationIndex = walkId;
    
                    //idleAction.stop();
                    walkAction.reset();
                    walkAction.crossFadeFrom(startAction, fadeDuration);
                    walkAction.play();
                    //console.log("Start to Walk, Can Control");
                }
            }
        }
        //console.log("Can control, ", otherAnimationIndex, " , Idle=", otherIdle);
    }
    else if(otherMixer){
            if(otherStoppingTime < endDuration){    //Walk -> Stop
                if(otherAnimationIndex != endId){
                    otherAnimationIndex = endId;

                    endAction.reset();
                    endAction.crossFadeFrom(walkAction, endFadeDuration);
                    endAction.play();
                    //console.log("Walk to End, No Control");
                }
            }
            else if(otherStoppingTime >= endDuration){      //Stop -> Idle
                if(otherAnimationIndex != idleId){
                    otherAnimationIndex = idleId;
    
                    //walkAction.stop();
                    idleAction.reset();
                    idleAction.crossFadeFrom(endAction ,endFadeDuration);
                    idleAction.play();
                    //console.log("End to Idle, No control");
                }
            }
            //console.log("no control, ", otherAnimationIndex, " ,", otherIdle);
    }
}

const clock = new THREE.Clock()
let previousTime = 0
let prevPos = new THREE.Vector3();

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltatime = elapsedTime - previousTime //delta time can be retrieved from here
    previousTime = elapsedTime

    if(canControlPlayer){
        Movecharacter()

        if(idle){
            movingTime = 0;
            stoppingTime += deltatime;
        }
        else{
            movingTime += deltatime;
            stoppingTime = 0;
        }
    }

    if(playerMixer != null){
        playerMixer.update(deltatime)
        animatePlayerTHREE()
    }
    
    
    if(canControlPlayer){
        if(otherIdle == false){
            otherMovingTime += deltatime;
            otherStoppingTime = 0;
            //console.log("Moving time =", otherMovingTime);
        }
        else{
            otherMovingTime = 0;
            otherStoppingTime += deltatime;
            //console.log("Stopping time = ", otherStoppingTime);
        }
        
        if(onInputDelay){
            var timeDif = elapsedTime - targetTime;
            if(timeDif >= controlDelay){
                canControlOtherPlayer = true;

                onInputDelay = false;
            }
        }

        //console.log("Anim = ", otherAnimationIndex, " , Idle = ", otherIdle, " ,control=", canControlOtherPlayer);
    }
    
    if(otherMixer != null) {
        otherMixer.update(deltatime)
        animateOtherPlayerTHREE()
    }
    //Implement loop here
    window.requestAnimationFrame(tick)
}
tick()