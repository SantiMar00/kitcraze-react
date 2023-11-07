import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Products.css'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import Placeholder from '../../components/placeholder/Placeholder'

function Products() {
    const { url } = useParams(null)
    const [kits, setKits] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (url === '2023-2024') {
            fetch(`${process.env.REACT_APP_BASE_URL}?season=2023-2024`)
                .then((res) => res.json())
                .then((data) => {
                    setKits(data)
                    setLoading(false)
                })
        } else if (url === 'vintage') {
            fetch(process.env.REACT_APP_BASE_URL)
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
                    setLoading(false)
                })
        }
    }, [])

    return (
        <div>
            <Header />
            {loading && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Placeholder />
                </div>
            )}
            {!loading && (
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
                                    <img
                                        class="grid-card-img"
                                        src={kit.imgURL}
                                    />
                                    <p className="grid-card-details">
                                        {kit.season} {kit.team} {kit.type}
                                    </p>

                                    <p class="grid-card-price">{`€${kit.price}`}</p>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    )
}

export default Products
