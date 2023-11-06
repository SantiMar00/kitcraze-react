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
                <p className="card-details ">
                    {season} {team} {type}
                </p>

                <p class="card-price">{`€${price}`}</p>
            </a>
        </div>
    )
}

export default KitCard
