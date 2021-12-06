import * as THREE from 'three';
// import Stats from '../jsm/libs/stats.module.js';
// import { GUI } from '../jsm/libs/dat.gui.module';
// import { EffectComposer } from '../jsm/postprocessing/EffectComposer.js';
// import { RenderPass } from '../jsm/postprocessing/RenderPass.js';
// import { OutlinePass } from '../jsm/postprocessing/OutlinePass.js';
import { EffectComposer, OutlinePass, RenderPass, ShaderPass } from 'three-outlinepass'
// import { ShaderPass } from '../jsm/postprocessing/ShaderPass.js';
import { FXAAShader } from '../jsm/shaders/FXAAShader.js';

let container, stats;
let camera, scene, renderer;
let composer, effectFXAA, outlinePass;
let selectedObjects = [];

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const obj3d = new THREE.Object3D();
const group = new THREE.Group();
const params = {
	edgeStrength: 3.0,
	edgeGlow: 0.0,
	edgeThickness: 1.0,
	pulsePeriod: 0,
	rotate: false,
	usePatternTexture: false
};

// Init gui
// const gui = new GUI( { width: 280 } );
// gui.add( params, 'edgeStrength', 0.01, 10 ).onChange( function ( value ) {
// 	outlinePass.edgeStrength = Number( value );
// } );
// gui.add( params, 'edgeGlow', 0.0, 1 ).onChange( function ( value ) {
// 	outlinePass.edgeGlow = Number( value );
// } );
// gui.add( params, 'edgeThickness', 1, 4 ).onChange( function ( value ) {
// 	outlinePass.edgeThickness = Number( value );
// } );
// gui.add( params, 'pulsePeriod', 0.0, 5 ).onChange( function ( value ) {
// 	outlinePass.pulsePeriod = Number( value );
// } );
// gui.add( params, 'rotate' );
// gui.add( params, 'usePatternTexture' ).onChange( function ( value ) {
// 	outlinePass.usePatternTexture = value;
// } );
function Configuration() {
	this.visibleEdgeColor = '#ffffff';
	this.hiddenEdgeColor = '#190a05';
}
const conf = new Configuration();
// gui.addColor( conf, 'visibleEdgeColor' ).onChange( function ( value ) {
// 	outlinePass.visibleEdgeColor.set( value );
// } );
// gui.addColor( conf, 'hiddenEdgeColor' ).onChange( function ( value ) {
// 	outlinePass.hiddenEdgeColor.set( value );
// } );

export function setOutlinerObjects(_cam, _scene, _render){
    camera = _cam
    scene = _scene
    renderer = _render
    init()
}
// init();
// animate();

const threeTone = new THREE.DataTexture(
    Uint8Array.from([0, 0, 0, 255 ,
         128, 128, 128, 255,
          255, 255, 255,255])
          ,3,1,THREE.RGBAFormat
);

function init() {
	// postprocessing
	composer = new EffectComposer( renderer );
	const renderPass = new RenderPass( scene, camera );
	composer.addPass( renderPass );
	outlinePass = new OutlinePass( new THREE.Vector2( window.innerWidth, window.innerHeight ), scene, camera );
	composer.addPass( outlinePass );
    outlinePass.patternTexture = threeTone;
	// const textureLoader = new THREE.TextureLoader();
	// textureLoader.load( 'textures/tri_pattern.jpg', function ( texture ) {
	// 	outlinePass.patternTexture = texture;
	// 	texture.wrapS = THREE.RepeatWrapping;
	// 	texture.wrapT = THREE.RepeatWrapping;
	// } );
	effectFXAA = new ShaderPass( FXAAShader );
	effectFXAA.uniforms[ 'resolution' ].value.set( 1 / window.innerWidth, 1 / window.innerHeight );
	composer.addPass( effectFXAA );
}

export function addOutlineObject(object){
    addSelectedObject(object)
    outlinePass.selectedObjects = selectedObjects
}

function addSelectedObject( object ) {
    selectedObjects = [];
    selectedObjects.push( object );
}

function animate() {
	requestAnimationFrame( animate );
    if(composer)
	    composer.render();
}
animate()