import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Announcement from '../components/Announcement'
import Categories from '../components/Categories'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import NewsLetter from '../components/NewsLetter'
import Products from '../components/Products'
import Slider from '../components/Slider'
// import { createCart, loadCart } from '../redux/apiCalls'

const Home = () => {
    return (
        <>
            <Navbar />
            <Announcement />
            <Slider />
            <Categories />
            <Products />
            <NewsLetter />
            <Footer />
        </>
    )
}

export default Home