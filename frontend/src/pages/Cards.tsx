import React from 'react'
import "../styles/Cards.page.css"

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
    return (

        <div className="card">
            <h1>Nom Carte</h1>
            <div className="card-image"></div>
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
