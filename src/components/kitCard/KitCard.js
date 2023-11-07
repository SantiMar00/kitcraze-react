import React from 'react'
import './KitCard.css'

function KitCard({ kit }) {
    const { id, title, team, season, type, price, imgURL } = kit

    const urlTeam = team.replaceAll(' ', '-')

    const productURL = `${season.toLowerCase()}-${urlTeam.toLowerCase()}-${type.toLowerCase()}`

    return (
        <div>
            <a href={`/${productURL}/${id}`} class="kit-card">
                <img class="card-img" src={imgURL} />
                <div class="card-details">
                    <p className="card-kit-name">
                        {season} {team} {type}
                    </p>

                    <p class="card-price">{`€${price}`}</p>
                </div>
            </a>
        </div>
    )
}

export default KitCard
