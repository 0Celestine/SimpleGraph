/**
 * @author Lee Stemkoski
 * Sourced from http://stemkoski.github.io/Three.js/Mouse-Over.html
 */

function onDocumentMouseMove(event) {
    // update the mouse variable
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}


function update() {

    var vector = new THREE.Vector3(mouse.x, mouse.y, 1);
    vector.unproject(camera);
    var ray = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

    // create an array containing all objects in the scene with which the ray intersects
    var intersects = ray.intersectObjects(scene.children);

    // if there is one (or more) intersections
    if (intersects.length > 0) {
        // if the closest object intersected is not the currently stored intersection object
        if (intersects[0].object != INTERSECTED) {
            // restore previous intersection object (if it exists) to its original color
            if (INTERSECTED){
                INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
            }
            // store reference to closest object as current intersection object
            INTERSECTED = intersects[0].object;
            // store color of closest object (for later restoration)
            INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
            // set a new color for closest object
            //console.log(INTERSECTED.name);
            if(INTERSECTED.geometry instanceof THREE.SphereGeometry){
                INTERSECTED.material.color.setHex(INTERSECTED.currentHex^0xfff000);
                INTERSECTED.material.transparent = false;
            }
        }
    } else {
        // restore previous intersection object (if it exists) to its original color
        if (INTERSECTED){
            INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
            INTERSECTED.material.transparent = true;
        }
        INTERSECTED = null;
    }

}
