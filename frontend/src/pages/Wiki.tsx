import React from 'react'
import "../styles/Wiki.page.css"

export const Wiki = () => {
    return (
        <div>
            <div id="wiki">
                <WikiSection />
                <WikiSection />
                <WikiSection />
                <WikiSection />
                <WikiSection />
            </div>
        </div>
    )
}

const WikiSection = () => {
    return (
        <section className="wiki-section">
            <h1>Info sur truc dans l'affaire</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur cumque voluptatum aliquid totam fugiat nulla rem quam, quo, mollitia earum eius iusto fuga. Quo cupiditate odio at quam, beatae fugiat.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur cumque voluptatum aliquid totam fugiat nulla rem quam, quo, mollitia earum eius iusto fuga. Quo cupiditate odio at quam, beatae fugiat.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur cumque voluptatum aliquid totam fugiat nulla rem quam, quo, mollitia earum eius iusto fuga. Quo cupiditate odio at quam, beatae fugiat.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur cumque voluptatum aliquid totam fugiat nulla rem quam, quo, mollitia earum eius iusto fuga. Quo cupiditate odio at quam, beatae fugiat.</p>
        </section>
    )
}
