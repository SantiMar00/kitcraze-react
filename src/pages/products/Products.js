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
            fetch(`http://localhost:4200/kits?season=2023-2024`)
                .then((res) => res.json())
                .then((data) => {
                    setKits(data)
                })
        } else if (url === 'vintage') {
            fetch(`http://localhost:4200/kits`)
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

    const kitCards = kits.map((kit) => <KitCard key={kit.id} kit={kit} />)

    return (
        <div>
            <Header />
            <h1>Products:</h1>
            <p>{url}</p>
            <div className="products-grid">{kitCards}</div>
            <Footer />
        </div>
    )
}

export default Products
