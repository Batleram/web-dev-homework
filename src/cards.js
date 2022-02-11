import * as THREE from "https://cdn.skypack.dev/three@0.137.5";

const AllCanvas = document.getElementsByClassName("card-image");

for (let i = 0; i < AllCanvas.length; i++) {
    let canvas = AllCanvas[i];
    const canvasHeight = canvas.getBoundingClientRect().height;
    const canvasWidth = canvas.getBoundingClientRect().height;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(canvasWidth, canvasHeight);
    canvas.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(
        45,
        canvasWidth / canvasHeight,
        1,
        500
    );
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);
    const scene = new THREE.Scene();

    const light = new THREE.DirectionalLight();
    light.position.set(0.5, 0.5, 1);
    light.castShadow = true;
    light.shadow.camera.zoom = 4; // tighter shadow map
    scene.add(light);

    const material = new THREE.MeshPhongMaterial({ color: 0x0000ff });

    const sphereGeometry = new THREE.SphereGeometry(15, 16, 16);
    const cylinderGeometry = new THREE.CylinderGeometry(5, 10, 40, 32);

    let sphereL = new THREE.Mesh(sphereGeometry, material);
    sphereL.position.set(-20, -25, 0);
    let sphereR = new THREE.Mesh(sphereGeometry, material);
    sphereR.position.set(20, -25, 0);
    let cylinder = new THREE.Mesh(cylinderGeometry, material);

    // scene.add(sphereL);
    // scene.add(sphereR);
    scene.add(cylinder);

    // const loader = new OBJLoader();
    // loader.load("./assts/BossTree.obj", function (obj) {
    //     scene.add(obj);
    // });

    function animate() {
        cylinder.rotation.x += 0.005;
        cylinder.rotation.z += 0.007;
        cylinder.rotation.y += 0.003;
        renderer.render(scene, camera);

        requestAnimationFrame(animate);
    }

    animate();
}
