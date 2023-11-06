import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Products.css'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import KitCard from '../../components/kitCard/KitCard'

function Products() {
    const { url } = useParams(null)
    const [kits, setKits] = useState([])

    useEffect(() => {
        if (url === '2023-2024') {
            fetch(`https://kitcraze-api.onrender.com/kits?season=2023-2024`)
                .then((res) => res.json())
                .then((data) => {
                    setKits(data)
                })
        } else if (url === 'vintage') {
            fetch(`https://kitcraze-api.onrender.com/kits`)
                .then((res) => res.json())
                .then((data) => {
                    const arr = []
                    setKits(
                        data.map((element) => {
                            if (element.season !== '2023-2024') {
                                arr.push(element)
                            }
                        })
                    )
                    setKits([...arr])
                })
        }
    }, [])

    return (
        <div>
            <Header />
            <div className="products-page-wrapper">
                <h1 className="products-title">{url}</h1>
                <div className="grid-wrapper">
                    <div className="products-grid">
                        {kits.map((kit) => (
                            <a
                                href={`/${kit.season.toLowerCase()}-${kit.team
                                    .replaceAll(' ', '-')
                                    .toLowerCase()}-${kit.type.toLowerCase()}/${
                                    kit.id
                                }`}
                                class="products-grid-card"
                            >
                                <img class="grid-card-img" src={kit.imgURL} />
                                <p className="card-details ">
                                    {kit.season} {kit.team} {kit.type}
                                </p>

                                <p class="card-price">{`€${kit.price}`}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Products
