import { React, useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { CartContext } from '../../../context/CartProvider'
import Header from '../../../components/header/Header'
import './Product.css'
import Footer from '../../../components/footer/Footer'

function Product() {
    const { product, id } = useParams()

    const { addToCart } = useContext(CartContext)

    const [kit, setKit] = useState()
    const [size, setSize] = useState('')
    const [qty, setQty] = useState(1)
    const [clicked, setClicked] = useState()

    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

    const addItemCartHandle = () => {
        if (size) {
            addToCart(kit, size, qty)
        } else {
            alert('Please select size before adding to cart.')
        }
    }

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URL}/${id}`)
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
                        <h1 class="product-title">
                            {kit.season} {kit.team} {kit.type}
                        </h1>
                        <div class="product-price">€{kit.price}</div>
                        <div class="product-size">
                            <p>{`Size: ${size}`}</p>
                            <div className="sizes-list">
                                {sizes.map((size, index) => (
                                    <a
                                        key={index}
                                        name={size}
                                        onClick={() => {
                                            setSize(size)
                                            setClicked(index)
                                        }}
                                        className={
                                            index === clicked
                                                ? 'size-btn active'
                                                : 'size-btn'
                                        }
                                    >
                                        {size}
                                    </a>
                                ))}
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
                                onClick={() => addItemCartHandle()}
                            >
                                ADD TO CART
                            </button>
                        </div>
                    </div>
                </div>
                <Footer />
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
