import React, { useRef, useState, useEffect } from 'react'
import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import "../styles/Cards.page.css"
import { BackSide } from 'three'

export const Cards = () => {
    const [cards, setCards]: [any[], Function] = useState<any[]>([]);

    useEffect(() => {
        fetch("/api/v1/cards.php", { method: "GET" }).then(res => res.json()).then(data => {
            setCards(data);
            console.log(data)
        });
    }, [])

    return (
        <div className="card-container">
            {cards.map((value, index) => {
                return <Card key={index} card={value} />
            })
            }
        </div>
    )
}

const Card = (props: { card: { positions: [number, number][] } }) => {
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
                    <Shape position={[0, 0, 0]} vertices={props.card.positions} />
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

const Shape = (props: { position: [number, number, number], vertices: [number, number][] }) => {
    const mesh: any = useRef()

    const shape = new THREE.Shape();

    let positions = props.vertices;
    shape.moveTo(positions[0][0], positions[0][1]);

    positions.slice(1).forEach(function(pos: [number, number]) {
        shape.lineTo(pos[0], pos[1])
        // shape.bezierCurveTo(
        //     x + pos[0],
        //     y,
        //     x,
        //     y + pos[1],
        //     x + pos[0],
        //     y + pos[1]
        // );
    });

    let color = getRndInteger(0, 16777215);

    let rotationspeed = getRndFloat(-0.06, 0.06) / 10;
    useFrame((_state, _delta) => {
        mesh.current.rotation.z += rotationspeed;
    })

    return (
        <mesh position={props.position} ref={mesh}>
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
