import { React, useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { CartContext } from '../../../context/CartProvider'
import Header from '../../../components/header/Header'
import './Product.css'

function Product() {
    const { id } = useParams(null)

    const { cartItems, addToCart } = useContext(CartContext)

    const [kit, setKit] = useState()
    const [size, setSize] = useState('')
    const [qty, setQty] = useState(1)

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
                    <div class="product-img-wrapper">
                        <img class="product-img" src={kit.imgURL} />
                    </div>
                    <div class="product-info-wrapper">
                        <div class="product-title">
                            <p>{kit.season}</p>
                            <p>{kit.team}</p>
                            <p>{kit.type}</p>
                        </div>
                        <div class="product-price">€{kit.price}</div>
                        <div class="product-size">
                            <p>{`Size: ${size}`}</p>
                            <div class="sizes-list">
                                <a
                                    onClick={() => {
                                        setSize('XS')
                                    }}
                                >
                                    XS
                                </a>
                                <a
                                    onClick={() => {
                                        setSize('S')
                                    }}
                                >
                                    S
                                </a>
                                <a
                                    onClick={() => {
                                        setSize('M')
                                    }}
                                >
                                    M
                                </a>
                                <a
                                    onClick={() => {
                                        setSize('L')
                                    }}
                                >
                                    L
                                </a>
                                <a
                                    onClick={() => {
                                        setSize('XL')
                                    }}
                                >
                                    XL
                                </a>
                                <a
                                    onClick={() => {
                                        setSize('XXL')
                                    }}
                                >
                                    XXL
                                </a>
                            </div>
                        </div>
                        <div class="product-cart-wrapper">
                            <input
                                name="qty"
                                class="qty-input"
                                type="text"
                                value={qty}
                                onChange={(e) => {
                                    setQty(parseInt(e.target.value))
                                }}
                            />
                            <button
                                class="add-to-cart-btn"
                                onClick={() => addToCart(kit, size, qty)}
                            >
                                ADD TO CART
                            </button>
                        </div>
                    </div>
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
