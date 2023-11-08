import { React, useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import './Products.css'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import Placeholder from '../../components/placeholder/Placeholder'

function Products() {
    const { url } = useParams(null)
    const [kits, setKits] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)

    const [searchParams] = useSearchParams()

    useEffect(() => {
        if (url === '2023-2024') {
            console.log('pepe')
            fetch(`${process.env.REACT_APP_BASE_URL}?season=2023-2024`)
                .then((res) => res.json())
                .then((data) => {
                    setKits(data)
                    setLoading(false)
                    window.scrollTo(0, 0)
                })
        } else if (url === 'vintage') {
            fetch(`${process.env.REACT_APP_BASE_URL}`)
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
                    window.scrollTo(0, 0)
                })
        } else {
            fetch(
                `${process.env.REACT_APP_BASE_URL}?q=${searchParams.get('q')}`
            )
                .then((res) => res.json())
                .then((data) => {
                    setKits(data)
                    setLoading(false)
                    window.scrollTo(0, 0)
                })
        }
    }, [currentPage, searchParams])

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
                    <div className="products-page-title-wrapper">
                        {url !== 'search' ? (
                            <h1 className="products-title">{url}</h1>
                        ) : (
                            <h1 className="products-title">
                                {searchParams.get('q')}
                            </h1>
                        )}
                        <h1 className="products-title">
                            {kits.length} elements
                        </h1>
                    </div>
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
                    {/* <div>
                        <button onClick={() => setCurrentPage(currentPage - 1)}>
                            <p> {'<'} </p>
                        </button>
                        <p> {currentPage} </p>
                        <button onClick={() => setCurrentPage(currentPage + 1)}>
                            <p> {'>'} </p>
                        </button>
                    </div> */}
                </div>
            )}
            <Footer />
        </div>
    )
}

export default Products
