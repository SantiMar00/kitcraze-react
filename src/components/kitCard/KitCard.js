import React from 'react'
import './KitCard.css'

function KitCard({ kit }) {
    const { id, title, team, season, type, price, imgURL } = kit

    return (
        <div>
            <a href={`/product/${id}`} class="kit-card">
                <img class="card-img" src={imgURL} />
                <div class="team-season-wrapper">
                    <p>{season}</p>
                    <p>{team}</p>
                    <p>{type}</p>
                </div>

                <p class="card-price">{`€${price}`}</p>
            </a>
        </div>
    )
}

export default KitCard
