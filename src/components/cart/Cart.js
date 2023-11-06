import { React, useContext } from 'react'
import { CartContext } from '../../context/CartProvider'
import EmptyCart from '../../assets/8882810.jpg'
import './Cart.css'

function Cart() {
    const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } =
        useContext(CartContext)

    return (
        <div className="cart-drawer">
            <h1 className="cart-title">Cart</h1>
            <div className="flex-cart">
                {cartItems.map((item) => (
                    <div className="item-wrapper" key={item.id}>
                        <a href={`/products/${item.productId}`}>
                            <img
                                style={{ width: '100px' }}
                                src={item.imgURL}
                                alt={item.title}
                            />
                        </a>
                        <div className="product-info-wrapper">
                            <p className="item-title product-info">
                                {item.season} {item.team} {item.type}
                            </p>
                            <p className="item-size product-info">
                                Size: {item.size}
                            </p>

                            <p className="item-price product-info">
                                € {item.price}
                            </p>

                            <div className="cart-btn-wrapper">
                                <button
                                    className="cart-qty-btn"
                                    onClick={() => {
                                        removeFromCart(item)
                                    }}
                                >
                                    -
                                </button>
                                <p className="cart-qty-number">
                                    {item.quantity}
                                </p>

                                <button
                                    className="cart-qty-btn"
                                    onClick={() => {
                                        addToCart(item)
                                    }}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {cartItems.length > 0 ? (
                    <div className="cart-total-wrapper">
                        <h1 className="cart-total">Total: €{getCartTotal()}</h1>
                        <button
                            className="cart-clear-btn"
                            onClick={() => {
                                clearCart()
                            }}
                        >
                            CLEAR CART
                        </button>
                    </div>
                ) : (
                    <div className="cart-empty">
                        <h1 className="">Your cart is empty</h1>
                        <img src={EmptyCart} style={{ width: '300px' }} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Cart
