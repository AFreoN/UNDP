import * as THREE from 'three'
import { Vector3 } from 'three';
import { joystickSlideValue } from '../ui_controller/ui_controller';

//Character control



//can enable/disable player control using canControlPlayer
let canControlPlayer = false

export function enablePlayerControl(){
    canControlPlayer = true
}

export function disablePlayerControl(){
    canControlPlayer = false
}


let player = null; //Holds player model
let playerMixer = null; //Holds player animation mixer
let playerAnimations = null //Holds player animation array
var animationIndex = 0;     //Id for current playing animation  2-Idle, 3-Walk

let otherCharacter = null;
var otherYPos = 0;
let otherMixer = null;
let otherAnimations = null;
var otherIdle = true;
var otherAnimationIndex = 0;    // 2- idle, 3-walk

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
}

export function setOtherCharacter(otherModel, _otherAnimation){
    otherYPos = otherModel.position.y;
    curOtherPosition.y = otherYPos;
    otherCharacter = otherModel;
    //curOtherPosition = otherCharacter.position;
    if(_otherAnimation != null){
        otherMixer = new THREE.AnimationMixer(otherCharacter);
        otherAnimations = _otherAnimation;
    }
    else{
        otherAnimations = null;
        otherMixer = null;
    }
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

function Movecharacter(){
    idle = true;
    let lerpSpeed = 0.1;

    var xPos = -2 + 0.25 * joystickSlideValue;
    curPlayerPosition.lerp(new Vector3(xPos, player.position.y, 0), lerpSpeed);

    player.position.set(curPlayerPosition.x, curPlayerPosition.y, curPlayerPosition.z);

    var abs = Math.abs(xPos - player.position.x);
    if((abs) < 0.05){
        idle = true;
    }
    else{
        idle = false;
    }

    xPos = 2 - 0.25 * joystickSlideValue;
    curOtherPosition.lerp(new Vector3(xPos, otherYPos, 0), lerpSpeed);

    otherCharacter.position.set(curOtherPosition.x, curOtherPosition.y, curOtherPosition.z);

    abs = Math.abs(xPos - otherCharacter.position.x);
    if((abs) < 0.05){
        otherIdle = true;
    }
    else{
        otherIdle = false;
    }

    //newPlayerMovement()
    //limitArea()
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

const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltatime = elapsedTime - previousTime //delta time can be retrieved from here
    previousTime = elapsedTime

    if(canControlPlayer){
        Movecharacter()
    }

    if(playerMixer !== null){
        playerMixer.update(deltatime)
        animatePlayer()
    }

    if(otherMixer != null) {
        otherMixer.update(deltatime)
        animateOtherCharacter()
    }

    //Implement loop here
    window.requestAnimationFrame(tick)
}
tick()