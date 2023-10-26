import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../../components/header/Header'
import './Product.css'

function Product() {
    const { id } = useParams(null)

    const [kit, setKit] = useState()

    useEffect(() => {
        fetch(`http://localhost:4200/kits/${id}`)
            .then((res) => res.json())
            .then((kit) => setKit(kit))
    }, [id])

    if (kit) {
        return (
            <div>
                <Header />
                <div class="product-main">
                    <img class="product-img" src={kit.imgURL} />
                </div>
            </div>
        )
    } else {
        return (
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <h1>Loading...</h1>
            </div>
        )
    }
}

export default Product
