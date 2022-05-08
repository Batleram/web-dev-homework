import React, { useRef, useState, useEffect } from 'react'
import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import "../styles/Cards.page.css"
import { BackSide } from 'three'

type WierdPhpCardFormat = {
    [key: string]: Card
}

export const Cards = () => {
    const [cards, setCards]: [WierdPhpCardFormat, Function] = useState<WierdPhpCardFormat>({});
    const [error, setError] = useState<String>("");
    const [showNameModal, setShowNameModal]: [boolean, Function] = useState<boolean>(false);

    const getCards = () => {
        fetch("/api/v1/cards.php", { method: "GET" })
            .then(res => {
                if (res.status === 200) {
                    return Promise.all(["ok", res.json()]);
                }
                else {
                    return Promise.all(["error", res.text()])
                }
            }).then((data: any) => {
                if (data[0] === "ok") {
                    setCards(data[1]);
                    return;
                }
                if (data[0] === "error") {
                    setError(data[1])
                    return;
                }
            }).catch(err => {
                console.error(err)
            });
    }

    useEffect(() => {
        getCards()
    }, [])

    const handleTradeClick = () => {

    }

    const handleGenCardClick = () => {
        setShowNameModal(true);
    }

    const closeNameModal = () => {
        getCards();
        setShowNameModal(false);
    }

    return (
        <>
            {showNameModal && <NameModal closeModal={closeNameModal} />}
            {error !== "" &&
                <p id="cards-error-message">{error}</p>
            }
            {error === "" &&
                <>

                    <div className="card-actions">
                        <button className="card-action" onClick={handleTradeClick}>↻</button>
                        <button className="card-action" onClick={handleGenCardClick}>+</button>
                    </div>
                    <div className="card-container">
                        {cards &&
                            Object.keys(cards).map((value, index) => {
                                return <Card key={index} card={cards[value]} />
                            })
                        }
                    </div>
                </>
            }
        </>
    )
}

const NameModal = (props: { closeModal: Function }) => {
    const [error, setError]: [string, Function] = useState<string>("");

    const handleModalSubmit = () => {
        let inputElement = document.getElementById("modal-name-input") as HTMLInputElement;
        let inputText = inputElement.value;

        fetch("/api/v1/cards.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                card_name: inputText
            })

        }).then(res => {
            if (res.status === 200) {
                return Promise.all(["ok", res.json()]);
            }
            else {
                return Promise.all(["error", res.text()])
            }
        }).then((data: any) => {
            if (data[0] === "ok") {
                props.closeModal();
                return;
            }
            if (data[0] === "error") {
                setError(data[1])
                return;
            }
        }).catch(err => {
            console.error(err)
        });
    }

    return (
        <>
            <div id="ui-blocker"></div>
            <div className="modal">
                <input id="modal-name-input"></input>
                <button onClick={handleModalSubmit}>Gen Card</button>
                {error !== "" &&
                    <p id="modal-error-message">{error}</p>
                }
            </div>
        </>
    )
}

const Card = (props: { card: Card }) => {
    const stats = ["Attaque: ", "Defense: ", "Intelligence: "]
    const camera = new THREE.PerspectiveCamera(
        45,
        1,
        1,
        500
    );
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);

    const parsePoints = () => {
        let points: [number, number][] = []
        props.card.points.map((value) => {
            points.push([
                parseInt(value.x, 10),
                parseInt(value.y, 10),
            ])
        })
        return points.length === 0 ? [[0, 0] as [number, number]] : points; // this is to prevent a page crash if, for some reason, a car has no points
    }

    return (
        <div className="card">
            <h1>{[props.card.name]}</h1>
            <div className="card-image">
                <Canvas camera={camera} >
                    <color attach="background" args={["black"]} />
                    <directionalLight position={[0, 5.0, 5.1]} castShadow={true} />
                    <Shape position={[0, 0, 0]} vertices={parsePoints()} />
                </Canvas>
            </div>
            <b>Description</b>
            <p className="card-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur cumque voluptatum aliquid totam fugiat nulla rem quam, quo, mollitia earum eius iusto fuga. Quo cupiditate odio at quam, beatae fugiat.</p>

            <b>Infos</b>
            <ul className="card-info">
                {props.card.stats.map((val, id) => (

                    <li className="card-stat" key={id}>{val.name}: {val.value}</li>
                ))}
                {props.card.attributes.map((val, id) => (

                    <li className="card-attribute" key={id}>{val.name}: {val.value}</li>
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
