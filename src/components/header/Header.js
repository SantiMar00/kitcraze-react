import React, { useState, useEffect, useRef, useContext } from 'react'
import { CartContext } from '../../context/CartProvider'
import { useNavigate, createSearchParams } from 'react-router-dom'
import './Header.css'
import Logo from '../../assets/logo.png'
import Cart from '../cart/Cart'

function Header() {
    const { getCartQty } = useContext(CartContext)

    const [isCartShown, setIsCartShown] = useState(false)
    const [isMounted, setIsMounted] = useState(false)
    const [isSearchBar, setIsSearchBar] = useState(false)
    const [query, setQuery] = useState('')

    const navigate = useNavigate()

    const mountedStyle = {
        animation: 'inAnimation 0.4s ease-in',
    }
    const unmountedStyle = {
        animation: 'outAnimation 0.4s ease-out',
        animationFillMode: 'forwards',
    }

    const mountedOverlayStyle = {
        animation: 'inOverlayAnimation 0.3s ease-in',
    }
    const unmountedOverlayStyle = {
        animation: 'outOverlayAnimation 0.3s ease-out',
        animationFillMode: 'forwards',
    }

    const showSearchBar = () => {
        setIsSearchBar(!isSearchBar)
    }

    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setIsMounted(false)
                }
            }
            document.addEventListener('mousedown', handleClickOutside)
            return () => {
                document.removeEventListener('mousedown', handleClickOutside)
            }
        }, [ref])
    }

    const wrapperRef = useRef(null)
    useOutsideAlerter(wrapperRef)

    return (
        <div class="header">
            <div class="header logo-wrapper">
                <a class="header logo-wrapper" href="/">
                    <img src={Logo} class="logo-image" />
                    <h1 class="logo-text">KITCRAZE</h1>
                </a>
            </div>
            <div class="nav-menu">
                <ul class="header nav-list">
                    <li>
                        <a href="/2023-2024" class="li-a">
                            2023-2024
                        </a>
                    </li>
                    <li>
                        <a href="/vintage" class="li-a">
                            VINTAGE
                        </a>
                    </li>
                    <li>
                        <a href="/popular" class="li-a">
                            POPULAR
                        </a>
                    </li>

                    <li className="search-icon-box-wrapper">
                        <input
                            type="text"
                            className={
                                isSearchBar
                                    ? 'header-search-bar-open header-search-bar'
                                    : 'header-search-bar-closed header-search-bar'
                            }
                            value={query}
                            placeholder={'Search'}
                            onChange={(e) => {
                                setQuery(e.target.value)
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    navigate({
                                        pathname: '/search',
                                        search: createSearchParams({
                                            q: query,
                                        }).toString(),
                                    })
                                }
                            }}
                        />

                        <a
                            className="header-cursor-pointer header-search-icon"
                            onClick={() => showSearchBar()}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="1em"
                                viewBox="0 0 512 512"
                            >
                                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                            </svg>
                        </a>
                    </li>

                    <li>
                        <a
                            className="header-cursor-pointer"
                            onClick={() => {
                                if (getCartQty() !== 0) {
                                    setIsMounted(!isMounted)
                                    if (!isCartShown) {
                                        setIsCartShown(true)
                                    }
                                }
                            }}
                        >
                            {getCartQty() !== 0 && (
                                <div className="cart-qty">{getCartQty()}</div>
                            )}

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="1em"
                                viewBox="0 0 576 512"
                            >
                                <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                            </svg>
                        </a>
                    </li>
                </ul>
            </div>
            {isCartShown && (
                <div
                    ref={wrapperRef}
                    class="cart-wrapper"
                    style={isMounted ? mountedStyle : unmountedStyle}
                    onAnimationEnd={() => {
                        if (!isMounted) setIsCartShown(false)
                    }}
                >
                    <Cart />
                </div>
            )}
            {isCartShown && (
                <div
                    class="overlay"
                    style={
                        isMounted ? mountedOverlayStyle : unmountedOverlayStyle
                    }
                />
            )}
        </div>
    )
}

export default Header
