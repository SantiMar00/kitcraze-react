import React, { useState, useEffect } from 'react'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import KitCard from '../../components/kitCard/KitCard'
import './Landing.css'
import Boca from '../../assets/boca.png'
import Licha from '../../assets/licha.png'

function Landing() {
    const [kits, setKits] = useState([])

    useEffect(() => {
        fetch(process.env.REACT_APP_BASE_URL)
            .then((res) => res.json())
            .then((data) => {
                setKits(data)
            })
    }, [])

    const popular = kits.map((kit) => <KitCard key={kit.id} kit={kit} />)

    const newlyAdded = kits
        .slice(-10)
        .reverse()
        .map((kit) => <KitCard key={kit.id} kit={kit} />)

    return (
        <div>
            <Header />
            <img src={Boca} class="banner boca" />
            <img src={Licha} class="banner licha" />
            <div class="content-main">
                <h1 class="title">
                    WHERE PASSION MEETS FASHION.
                    <br />
                    OLD AND NEW IN ONE PLACE.
                </h1>
                <div class="box">
                    <h2 class="subtitle">Find your favourite kits.</h2>
                    <div class="shop-now-wrapper">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            viewBox="0 0 448 512"
                        >
                            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                        </svg>
                        <a href="/popular" class="shop-now">
                            Shop Now
                        </a>
                    </div>
                </div>
            </div>
            <div class="section">
                <h1 class="section section-title">POPULAR</h1>
                <div class="kit-cards">{popular}</div>
            </div>

            <div class="section">
                <h1 class="section section-title">NEWLY ADDED</h1>
                <div class="kit-cards">{newlyAdded}</div>
            </div>

            <Footer />
        </div>
    )
}

export default Landing
