import * as THREE from "three"
import React from 'react'
import "../styles/Cards.page.css"

export const Cards = () => {
    return (
        <div className="card-container">
            <Card id={1} />
            <Card id={2} />
            <Card id={3} />
            <Card id={4} />
            <Card id={5} />
            <Card id={6} />
            <Card id={7} />
        </div>
    )
}

const Card = (props: { id: number }) => {
    const stats = ["Attaque: ", "Defense: ", "Intelligence: "]
    const cardId = `card-${props.id}`
    renderCard(cardId)
    return (

        <div className="card">
            <h1>Nom Carte</h1>
            <div id={cardId} className="card-image"></div>
            <b>Description</b>
            <p className="card-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur cumque voluptatum aliquid totam fugiat nulla rem quam, quo, mollitia earum eius iusto fuga. Quo cupiditate odio at quam, beatae fugiat.</p>

            <b>Infos</b>
            <ul>
                {stats.map((val, id) => (

                    <li key={id}>{val}</li>
                ))}
            </ul>
        </div>
    )
}


function getRndInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRndFloat(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

const renderCard = (cardId: string) => {
    const canvas = document.getElementById(cardId);

    if (canvas == null) {
        return;
    }
    if (canvas.childNodes.length > 0) { //already has a canvas
        return
    }

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

    positions.forEach(function(pos) {
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

    let rotationspeed = getRndFloat(-0.06, 0.06) / 10;
    function animate() {
        mesh.rotation.z += rotationspeed;
        renderer.render(scene, camera);

        requestAnimationFrame(animate);

    }
    animate();
}
