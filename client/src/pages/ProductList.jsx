import styled from "styled-components"
import Navbar from "../components/Navbar"
import Announcement from "../components/Announcement"
import Products from "../components/Products"
import NewsLetter from "../components/NewsLetter"
import Footer from "../components/Footer"
import { mobile } from "../responsive"
import { useLocation } from "react-router-dom"
import { useState } from "react"

const Container = styled.div``
const Title = styled.h1`
    margin: 20px;
`
const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
`
const Filter = styled.div`
    margin: 20px;
    ${mobile({ width: "0 20px", display: "flex", flexDirection: "column" })}
`

const FilerText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
    ${mobile({ marginRight: "0" })}
`

const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
    ${mobile({ margin: "10px 0" })}
`

const Option = styled.option`
`

const ProductList = () => {
    const location = useLocation()
    const cat = location.pathname.split("/")[2];
    const [filters, setFilters] = useState({})
    const [sort, setSort] = useState("newest")

    const handleFilters = (e) => {
        const value = e.target.value
        setFilters({
            ...filters,
            [e.target.name]: value
        })
    }

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Title>{cat ? cat.toUpperCase() : "PRODUCTS"}</Title>
            <FilterContainer>
                <Filter>
                    <FilerText>Filter Products:</FilerText>
                    <Select name="color" defaultValue="Color" onChange={handleFilters}>
                        <Option disabled >Color</Option>
                        <Option value="black">black</Option>
                        <Option value="teal">teal</Option>
                        <Option value="green">green</Option>
                        <Option value="gray">grey</Option>
                        <Option value="pink">pink</Option>
                    </Select>
                    <Select name="size" defaultValue="Size" onChange={handleFilters}>
                        <Option disabled>Size</Option>
                        <Option value="XS">XS</Option>
                        <Option value="S">S</Option>
                        <Option value="M">M</Option>
                        <Option value="L">L</Option>
                        <Option value="XL">XL</Option>
                        <Option value="XXL">XXL</Option>
                    </Select>
                </Filter>
                <Filter>
                    <FilerText>Sort Products:</FilerText>
                    <Select onChange={e => setSort(e.target.value)}>
                        <Option value="newest">Newest</Option>
                        <Option value="asc">Price (ASC)</Option>
                        <Option value="desc">Price (DESC)</Option>
                    </Select>
                </Filter>
            </FilterContainer>
            <Products cat={cat} filters={filters} sort={sort} key={cat} />
            <NewsLetter />
            <Footer />
        </Container>
    )
}

export default ProductList