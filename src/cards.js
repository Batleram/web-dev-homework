import * as THREE from "https://cdn.skypack.dev/three@0.137.5";

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRndFloat(min, max) {
    return Math.random() * (max - min) + min;
}

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
    light.shadow.camera.zoom = 4;
    scene.add(light);

    let color = getRndInteger(0, 16777215);
    const material = new THREE.MeshPhongMaterial({ color: color });
    const shape = new THREE.Shape();

    let x = 0,
        y = 0;
    let positions = [];
    let complexity = getRndInteger(5, 12);
    for (let i = 0; i < complexity; i++) {
        positions.push([getRndFloat(-20, 20), getRndFloat(-20, 20)]);
    }
    shape.moveTo(x, y);

    positions.forEach(function (pos) {
        shape.bezierCurveTo(
            x + pos[0],
            y,
            x,
            y + pos[1],
            x + pos[0],
            y + pos[1]
        );
    });

    const geom = new THREE.ShapeGeometry(shape);

    const mesh = new THREE.Mesh(geom, material);
    scene.add(mesh);
    //     const sphereGeometry = new THREE.SphereGeometry(15, 16, 16);
    //     const cylinderGeometry = new THREE.CylinderGeometry(5, 10, 40, 32);

    //     let sphereL = new THREE.Mesh(sphereGeometry, material);
    //     sphereL.position.set(-20, -25, 0);
    //     let sphereR = new THREE.Mesh(sphereGeometry, material);
    //     sphereR.position.set(20, -25, 0);
    //     let cylinder = new THREE.Mesh(cylinderGeometry, material);

    // scene.add(sphereL);
    // scene.add(sphereR);
    // scene.add(cylinder);

    // const loader = new OBJLoader();
    // loader.load("./assts/BossTree.obj", function (obj) {
    //     scene.add(obj);
    // });

    let rotationspeed = getRndFloat(-0.06, 0.06) / 10;
    function animate() {
        // cylinder.rotation.x += 0.005;
        // cylinder.rotation.z += 0.007;
        // cylinder.rotation.y += 0.003;
        mesh.rotation.z += rotationspeed;
        renderer.render(scene, camera);

        requestAnimationFrame(animate);
    }

    animate();
}
