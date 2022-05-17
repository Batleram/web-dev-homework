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
    const [showTradeModal, setShowTradeModal]: [boolean, Function] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal]: [boolean, Function] = useState<boolean>(false);
    const [showAddAtributeModal, setShowAddAttributeModal]: [boolean, Function] = useState<boolean>(false);
    const [currentlySelectedCard, setCurrentlySelectedCard]: [Card, Function] = useState<Card>({} as Card);

    const getCards = async () => {
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

    const handleGenCardClick = () => {
        setShowNameModal(true);
    }

    const closeNameModal = () => {
        getCards();
        setShowNameModal(false);
    }

    const closeTradeModal = () => {
        getCards();
        setShowTradeModal(false);
    }

    const closeDeleteModal = () => {
        getCards();
        setShowDeleteModal(false);
    }

    const closeAddAttributeModal = () => {
        getCards();
        setShowAddAttributeModal(false);
    }

    const handleCardDeleteClick = (card: Card) => {
        setShowDeleteModal(true)
        setCurrentlySelectedCard(card)
    }
    const handleCardTradeClick = (card: Card) => {
        setShowTradeModal(true);
        setCurrentlySelectedCard(card)
    }

    const handleCardAttributeClick = (card: Card) => {
        if (parseInt(card.attribute_points,10) === 0)
            return;
        setShowAddAttributeModal(true);
        setCurrentlySelectedCard(card)
    }

    return (
        <>
            {showNameModal && <NameModal closeModal={closeNameModal} />}
            {showTradeModal && <TradeModal closeModal={closeTradeModal} card={currentlySelectedCard} />}
            {showDeleteModal && <DeleteConfirmModal closeModal={closeDeleteModal} card={currentlySelectedCard} />}
            {showAddAtributeModal && <AddAttributeModal closeModal={closeAddAttributeModal} card={currentlySelectedCard} />}
            {error !== "" &&
                <p id="cards-error-message">{error}</p>
            }
            {error === "" &&
                <>

                    <div className="card-actions">
                        <button className="card-action" onClick={handleGenCardClick}>+</button>
                    </div>
                    <div className="card-container">
                        {cards &&
                            Object.keys(cards).map((value, index) => {
                                return <Card key={index} card={cards[value]} cardDelete={handleCardDeleteClick} cardTrade={handleCardTradeClick} cardAttribute={handleCardAttributeClick} showButtons={true} />
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

    const handleModalSubmit = async () => {
        let inputElement = document.getElementById("modal-name-input") as HTMLInputElement;
        let inputText = inputElement.value;

        let csrfToken = await fetch("/api/v1/getcsrftoken.php").then(res=> res.json()).catch(e => console.error(e));
        fetch("/api/v1/cards.php", {
            method: "POST",
            headers: {
                "X-CSRF-TOKEN": csrfToken.CSRF_TOKEN,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                card_name: inputText
            })

        }).then(res => {
            if (res.status === 200) {
                props.closeModal();
            }
            else {
                return res.text()
            }
        }).then((data: any) => {
            setError(data)
        }).catch(err => {
            console.error(err)
        });
    }

    return (
        <>
            <div className="ui-blocker"></div>
            <div className="modal">
                <input id="modal-name-input"></input>
                <div className="card-buttons">
                    <button onClick={handleModalSubmit}>Gen Card</button>
                    <button onClick={() => props.closeModal()}>Close</button>
                </div>
                {error !== "" &&
                    <p id="modal-error-message">{error}</p>
                }
            </div>
        </>
    )
}

const AddAttributeModal = (props: { closeModal: Function, card: Card }) => {
    const [error, setError]: [string, Function] = useState<string>("");
    const [possibleAttributes, setPossibleAttributes]: [string[], Function] = useState<string[]>([]);

    useEffect(() => {
        fetch("/api/v1/attributes.php", { method: "GET" })
            .then(res => {
                if (res.status === 200) {
                    return Promise.all(["ok", res.json()]);
                }
                else {
                    return Promise.all(["error", res.text()])
                }
            }).then((data: any) => {
                if (data[0] === "ok") {
                    setPossibleAttributes(data[1]);
                    return;
                }
                if (data[0] === "error") {
                    setError(data[1])
                    return;
                }
            }).catch(err => {
                console.error(err)
            });
    }, [])

    const handleModalSubmit = async () => {
        const attributeElement = document.getElementById("attribute-type") as HTMLSelectElement;
        let attributeType = attributeElement.value;
        const attributeValueElement = document.getElementById("attribute-value") as HTMLInputElement;
        let attributeValue = attributeValueElement.value;


        let csrfToken = await fetch("/api/v1/getcsrftoken.php").then(res=> res.json()).catch(e => console.error(e));
        fetch("/api/v1/cards.php", {
            method: "PATCH",
            headers: {
                "X-CSRF-TOKEN": csrfToken.CSRF_TOKEN,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                cardid: parseInt(props.card.cardid,10),
                attribute_value: parseInt(attributeValue,10),
                attribute_name: attributeType
            })

        }).then(res => {
            if (res.status === 200) {
                props.closeModal();
            }
            else {
                return res.text()
            }
        }).then((data: any) => {
            setError(data)
        }).catch(err => {
            console.error(err)
        });
    }

    return (
        <>
            <div className="ui-blocker"></div>
            <div className="modal">
                <div className="attribute-setting-container">
                    <select id="attribute-type">
                        {possibleAttributes.map((val, id) => (
                            <option value={val} key={id}>{val}</option>
                        ))}
                    </select>
                    <input id="attribute-value" type="number" min="1" max="5" placeholder="Value"/>
                </div>
                <div className="card-buttons">
                    <button onClick={handleModalSubmit}>Save Attribute</button>
                    <button onClick={() => props.closeModal()}>Close</button>
                </div>
                {error !== "" &&
                    <p id="modal-error-message">{error}</p>
                }
            </div>
        </>
    )
}

const DeleteConfirmModal = (props: { closeModal: Function, card: Card }) => {
    const [error, setError]: [string, Function] = useState<string>("");

    const handleModalSubmit = async () => {
        let csrfToken = await fetch("/api/v1/getcsrftoken.php").then(res=> res.json()).catch(e => console.error(e));
        fetch("/api/v1/cards.php", {
            method: "DELETE",
            headers: {
                "X-CSRF-TOKEN":csrfToken.CSRF_TOKEN,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                cardid: props.card.cardid,
            })

        }).then(res => {
            if (res.status === 200) {
                props.closeModal();
            }
            else {
                return res.text()
            }
        }).then((data: any) => {
            setError(data)
        }).catch(err => {
            console.error(err)
        });
    }

    return (
        <>
            <div className="ui-blocker"></div>
            <div className="modal">
                <div className="card-buttons">
                    <button onClick={handleModalSubmit}>Confirm</button>
                    <button onClick={() => props.closeModal()}>Close</button>
                </div>
                {error !== "" &&
                    <p id="modal-error-message">{error}</p>
                }
            </div>
        </>
    )
}

const TradeModal = (props: { closeModal: Function, card: Card }) => {
    const [error, setError]: [string, Function] = useState<string>("");
    const handleModalSubmit = async() => {
        let csrfToken = await fetch("/api/v1/getcsrftoken.php").then(res=> res.json()).catch(e => console.error(e));
        fetch("/api/v1/trade.php", {
            method: "POST",
            headers: {
                "X-CSRF-TOKEN":csrfToken.CSRF_TOKEN,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                card_name: props.card.name,
                cardid: props.card.cardid
            })

        }).then(res => {
            if (res.status === 200) {
                props.closeModal();
            }
            else {
                return res.text();
            }
        }).then((data: any) => {
            setError(data)
        }).catch(err => {
            console.error(err)
        });
    }

    return (
        <>
            <div className="ui-blocker"></div>
            <div className="modal">
                <Card card={props.card} showButtons={false} />
                <div className="card-buttons">
                    <button onClick={handleModalSubmit}>Trade card</button>
                    <button onClick={() => props.closeModal()}>Close</button>
                </div>
                {error !== "" &&
                    <p id="modal-error-message">{error}</p>
                }
            </div>
        </>
    )

}

const Card = (props: { card: Card, cardTrade?: Function, cardDelete?: Function, cardAttribute?: Function, showButtons: boolean }) => {
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

    const handleTradeButtonClick = () => {
        props.cardTrade ? props.cardTrade(props.card) : console.error("Card missing property cardTrade()");
    }

    const handleDeleteButtonClick = () => {
        props.cardDelete ? props.cardDelete(props.card) : console.error("Card missing property cardDelete()");
    }

    const handleAddAttributeClick = () => {
        props.cardAttribute ? props.cardAttribute(props.card) : console.error("Card missing property cardDelete()");
    }

    return (
        <div className="card">
            <h1>{[props.card.name]}</h1>
            {props.showButtons &&
                <div className="card-buttons">
                    <button onClick={handleTradeButtonClick}>trade</button>
                    <button onClick={handleDeleteButtonClick}>delete</button>
                    <button onClick={handleAddAttributeClick}>add attribute</button>
                </div>
            }
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
                <p className="card-remaining-attributes">Attributs restants: {props.card.attribute_points}</p>
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
    });

    // let color = getRndInteger(0, 16777215);

    let rotationspeed = getRndFloat(-0.06, 0.06) / 10;
    useFrame((_state, _delta) => {
        mesh.current.rotation.z += rotationspeed;
    })

    return (
        <mesh position={props.position} ref={mesh}>
            <shapeGeometry args={[shape]} />
            <meshPhongMaterial color={16711680} />
        </mesh >
    )
}


function getRndInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRndFloat(min: number, max: number) {
    return Math.random() * (max - min) + min;
}
