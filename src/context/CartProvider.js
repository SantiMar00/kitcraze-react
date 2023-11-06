import { createContext, useState, useEffect } from 'react'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(
        localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : []
    )

    const addToCart = (item, size, qty) => {
        if (qty || size) {
            item = { ...item, id: item.id + size, productId: item.id }
        }

        if (!qty) {
            qty = 1
        }

        if (!size) {
            size = item.size
        }

        console.log(item)

        if (
            cartItems.findIndex(
                (cartItem) => cartItem.id === item.id && cartItem.size === size
            ) !== -1
        ) {
            setCartItems(
                cartItems.map((cartItem) =>
                    cartItem.id === item.id && cartItem.size === size
                        ? { ...cartItem, quantity: cartItem.quantity + qty }
                        : cartItem
                )
            )
        } else {
            // no existe el mismo producto con el mismo talle en el carrito
            setCartItems([...cartItems, { ...item, size: size, quantity: qty }])
        }
    }

    const removeFromCart = (item) => {
        const isItemInCart = cartItems.find(
            (cartItem) => cartItem.id === item.id
        )

        if (isItemInCart.quantity === 1) {
            setCartItems(
                cartItems.filter((cartItem) => cartItem.id !== item.id)
            )
        } else {
            setCartItems(
                cartItems.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity - 1 }
                        : cartItem
                )
            )
        }
    }

    const clearCart = () => {
        setCartItems([])
    }

    const getCartTotal = () => {
        return cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        )
    }

    const getCartQty = () => {
        return cartItems.reduce((cartQty, item) => cartQty + item.quantity, 0)
    }

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }, [cartItems])

    useEffect(() => {
        const cartItems = localStorage.getItem('cartItems')
        if (cartItems) {
            setCartItems(JSON.parse(cartItems))
        }
    }, [])

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                clearCart,
                getCartTotal,
                getCartQty,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}
