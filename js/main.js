var scene, camera, renderer, camera_pos;
var shape, geometry, material, mesh, axisMaterial, textMaterial;
var font_url, raycaster, mouse, mouseToWorld;


init();
animate();

function init() {

    //SCENE
    scene = new THREE.Scene();
    var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;
    scene.background = new THREE.Color(0xffffff);


    //RENDERER
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(WIDTH, HEIGHT);
    document.body.appendChild(renderer.domElement);

    //CAMERA
    camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 20000);
    camera.position.set(170, 90, 170);
    camera_pos = camera.position;
    scene.add(camera);

    //WINDOW RESIZING
    window.addEventListener('resize', function() {
        var WIDTH = window.innerWidth,
            HEIGHT = window.innerHeight;
        renderer.setSize(WIDTH, HEIGHT);
        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();
    });

    //LIGHT
    var light = new THREE.PointLight(0xffffff);
    light.position.set(100, 200, 100);
    scene.add(light);


    //MATERIALS/FONTS
    //material = new THREE.MeshBasicMaterial( { color: 0x79bcff, side: THREE.DoubleSide, vertexColors: THREE.FaceColors} );
    axisMaterial = new THREE.LineBasicMaterial({
        color: 0x000000, transparent: true, opacity: 0.2
    });

    textMaterial = new THREE.MeshBasicMaterial({
        color: 0x3b3b3b
    });

    font_url = "https://raw.githubusercontent.com/rollup/three-jsnext/master/examples/fonts/helvetiker_regular.typeface.json";

    //TRACKBALL CONTROLS
    controls = new THREE.TrackballControls(camera, renderer.domElement);
    controls.rotateSpeed = 2.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noRotate = true;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.6;
    //controls.target.set(0, camera.position.y*0.5, 0);
    controls.target.set(0, camera_pos.y*0.25, 0);


    // RAYCASTING
    mouse = new THREE.Vector2();
    raycaster = new THREE.Raycaster();

    //EVENT LISTENERS
    window.addEventListener('keydown', onKeyDown, false);
    /* window.addEventListener('keyup', onKeyUp, false);*/
 // window.addEventListener( 'mousemove', onMouseMove, false);

}
/*
function highlightOnMouseOver(){
    // update the picking ray with the camera and mouse position
	raycaster.setFromCamera(mouse, camera);

	// calculate objects intersecting the picking ray
	var intersects = raycaster.intersectObjects(scene.children);

	for ( var i = 0; i < intersects.length; i++ ) {
        mouseToWorld = intersects[i].point;
        for(var j = 0; j < intersects[i].object.geometry.faces.length; j++){
            intersects[i].object.geometry.faces[j].color.set(0xff0000);
        }
        intersects[i].object.geometry.colorsNeedUpdate = true;
	}
}

function unhighlightObjects(){
    for(var i = 0; i < scene.children.length; i ++){
        if(scene.children[i] instanceof THREE.Mesh){
            for(var j = 0; j < scene.children[i].geometry.faces.length; j++){
                scene.children[i].geometry.faces[j].color.set(0x79bcff);
            }
            scene.children[i].geometry.colorsNeedUpdate = true;
        }
    }
}
*/

function onKeyDown(event) {
    if (event.keyCode == "90") {
        controls.reset();
        controls.target.set(0, camera_pos.y*0.25, 0);
        //setCamera();
    }
}

/*function onMouseMove(event){
    console.log(camera.position);
}*/

function setCamera() {
    //console.log(point);
    camera.position.set(camera_pos.x, camera_pos.y, camera_pos.z);
    controls.target.set(0, camera_pos.y*0.5, 0);

}

function translateAll(dist){
    console.log(scene.children);
    for(var i = 0; i <scene.children.length; i++){
        if(scene.children[i].type == "Mesh" ||scene.children[i].type == "Line"  )
        scene.children[i].translateY(-1*dist);
    }
    /*scene.traverse (function (object){
        console.log(object);
        object.translateY(-1*dist);

    });*/
}

function animate() {
    requestAnimationFrame(animate);
    //highlightOnMouseOver();
    renderer.render(scene, camera);
    //unhighlightObjects();
    //console.log(camera.position);
    controls.update();
}
