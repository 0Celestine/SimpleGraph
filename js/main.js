var scene, camera, renderer, camera_pos;
var axisMaterial, textMaterial;
var font_url;

var mouse = { x: 0, y: 0 }, INTERSECTED;

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
    //controls.noRotate = true;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.6;
    controls.target.set(0, camera_pos.y*0.25, 0);

    //EVENT LISTENERS
    window.addEventListener('keydown', onKeyDown, false);
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    /* window.addEventListener('keyup', onKeyUp, false);*/
    //window.addEventListener( 'mousemove', onMouseMove, false);

}


function onKeyDown(event) {
    if (event.keyCode == "90") {
        controls.reset();
        controls.target.set(0, camera_pos.y*0.25, 0);
        //console.log(scene.children);
        //setCamera();
    }
}

function setCamera() {
    //console.log(point);
    camera.position.set(camera_pos.x, camera_pos.y, camera_pos.z);
    controls.target.set(0, camera_pos.y*0.5, 0);

}

//TODO Not working
function clearScene(){
    //console.log(scene.children);
    scene.children.forEach(function(object){
        if(object instanceof THREE.Mesh || object instanceof THREE.Line)
            //console.log("DISPOSE");
            scene.remove(object);
    });
}


function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
    update();
}
