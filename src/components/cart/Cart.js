import { React, useContext } from 'react'
import { CartContext } from '../../context/CartProvider'
import './Cart.css'

function Cart() {
    const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } =
        useContext(CartContext)

    return (
        <div className="cart-drawer">
            <h1 className="text-2xl font-bold">Cart</h1>
            <div className="flex flex-col gap-4">
                {cartItems.map((item) => (
                    <div className="item-wrapper" key={item.id}>
                        <div className="item-details">
                            <p className="item-desc">
                                {item.season} {item.team} {item.type}
                            </p>
                        </div>
                        <p>Size: {item.size}</p>

                        <p>€ {item.price}</p>

                        <img
                            style={{ width: '250px' }}
                            src={item.imgURL}
                            alt={item.title}
                            className="rounded-md h-24"
                        />
                        <button
                            className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                            onClick={() => {
                                addToCart(item)
                            }}
                        >
                            +
                        </button>
                        <p>{item.quantity}</p>
                        <button
                            className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                            onClick={() => {
                                removeFromCart(item)
                            }}
                        >
                            -
                        </button>
                    </div>
                ))}
            </div>
            {cartItems.length > 0 ? (
                <div className="flex flex-col justify-between items-center">
                    <h1 className="text-lg font-bold">
                        Total: ${getCartTotal()}
                    </h1>
                    <button
                        className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                        onClick={() => {
                            clearCart()
                        }}
                    >
                        Clear cart
                    </button>
                </div>
            ) : (
                <h1 className="text-lg font-bold">Your cart is empty</h1>
            )}
        </div>
    )
}

export default Cart
