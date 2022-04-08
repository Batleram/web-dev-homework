import React, { useRef, useState } from 'react'
import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import "../styles/Cards.page.css"
import { BackSide } from 'three'

export const Cards = () => {
    return (
        <div className="card-container">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
        </div>
    )
}

const Card = () => {
    const stats = ["Attaque: ", "Defense: ", "Intelligence: "]
    const camera = new THREE.PerspectiveCamera(
        45,
        1,
        1,
        500
    );
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);

    return (

        <div className="card">
            <h1>Nom Carte</h1>
            <div className="card-image">
                <Canvas camera={camera} >
                    <color attach="background" args={["black"]} />
                    <directionalLight position={[0, 5.0, 5.1]} castShadow={true} />
                    <Shape position={[0, 0, 0]} />
                </Canvas>
            </div>
            <b>Description</b>
            <p className="card-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur cumque voluptatum aliquid totam fugiat nulla rem quam, quo, mollitia earum eius iusto fuga. Quo cupiditate odio at quam, beatae fugiat.</p>

            <b>Infos</b>
            <ul>
                {stats.map((val, id) => (

                    <li key={id}>{val}</li>
                ))}
            </ul>
        </div >
    )
}

const Shape = (props: any) => {
    const mesh: any = useRef()

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

    let color = getRndInteger(0, 16777215);

    let rotationspeed = getRndFloat(-0.06, 0.06) / 10;
    useFrame((state, delta) => {
        mesh.current.rotation.z += 0.01;
    })
    // Return view, these are regular three.js elements expressed in JSX
    return (
        <mesh {...props} ref={mesh}>
            <shapeGeometry args={[shape]} />
            <meshPhongMaterial color={color} />
        </mesh >
    )
}


function getRndInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRndFloat(min: number, max: number) {
    return Math.random() * (max - min) + min;
}
