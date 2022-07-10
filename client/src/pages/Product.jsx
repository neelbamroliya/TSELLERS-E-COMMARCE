import styled from "styled-components"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Announcement from "../components/Announcement"
import NewsLetter from "../components/NewsLetter"
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { mobile, teblet } from "../responsive"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { publicRequest } from "../requestMethods"
import { useDispatch, useSelector } from "react-redux"
import { addProduct } from "../redux/cartRedux"

const Container = styled.div`

`
const Wrapper = styled.div`
    padding: 50px;
    display: flex;
    ${mobile({ padding: "10px", flexDirection: "column" })}
`
const ImgContainer = styled.div`
    flex: 1;
`
const Image = styled.img`
    width: 100%;
    height: 90vh;
    object-fit: cover;
    ${mobile({ height: "40vh" })}
    ${teblet({ height: "50vh" })}
`
const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 50px;
    ${mobile({ padding: "10px" })}
    ${teblet({ padding: "20px" })}
`
const Title = styled.h1`
    font-weight: 200;

`
const Desc = styled.p`
    margin: 20px 0;
`

const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
`

const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 50%;
    margin: 30px 0px;
    ${mobile({ width: "100%" })}
    ${teblet({ width: "90%" })}
`

const Filter = styled.div`
    display: flex;
    align-items: center;

`

const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
`

const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
    margin: 0px 5px;
    margin-left: 10px ;
    cursor: pointer;
    /* border: 1px solid black; */

`

const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
`

const FilterSizeOption = styled.option``

const AddContainer = styled.div`
    width: 50%; 
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ width: "100%" })}
    ${teblet({ width: "90%" })}
`

const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`

const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
`

const Button = styled.button`
    padding: 15px;
    border: 2px solid teal;
    background-color: white;
    cursor: pointer;
    font-weight: 500;

    &:hover{
        background-color: #f8f4f4;
    }
`

const Product = () => {
    const location = useLocation()
    const id = location.pathname.split("/")[2];
    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(1)
    const [color, setColor] = useState("")
    const [size, setSize] = useState("")
    const user = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()


    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await publicRequest.get(`/products/find/${id}`)
                setProduct(res.data)
            } catch (err) { }
        }
        getProduct()
    }, [id])

    const handleQuantity = (type) => {
        if (type === "inc") {
            setQuantity(quantity + 1)
        } else {
            quantity > 1 && setQuantity(quantity - 1)
        }
    }

    const handleClick = (product, quantity) => {
        //UPDATE CART
        if (!user) {
            alert("login first")
        } else {
            const prod = {
                userId: user._id,
                productId: product._id,
                title: product.title,
                img: product.img,
                color,
                size,
                quantity,
                price: product.price
            }
            // addtoCartReq(dispatch, prod, user)
            dispatch(addProduct(prod))
        }
    }

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <ImgContainer>
                    <Image src={product.img} />
                </ImgContainer>
                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Desc>{product.desc}</Desc>
                    <Price>$ {product.price}</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Colors</FilterTitle>
                            {product.color?.map(c => (
                                <FilterColor color={c} key={c} onClick={() => setColor(c)} />
                            ))}
                        </Filter>
                        <Filter>
                            <FilterTitle>Size</FilterTitle>
                            <FilterSize onChange={e => setSize(e.target.value)}>
                                {product.size?.map(s => (
                                    <FilterSizeOption key={s}>{s}</FilterSizeOption>

                                ))}
                            </FilterSize>
                        </Filter>
                    </FilterContainer>
                    <AddContainer>
                        <AmountContainer>
                            <RemoveIcon onClick={() => handleQuantity("dec")} />
                            <Amount>{quantity}</Amount>
                            <AddIcon onClick={() => handleQuantity("inc")} />
                        </AmountContainer>
                        <Button onClick={() => handleClick(product, quantity)}>ADD TO CART</Button>


                    </AddContainer>
                </InfoContainer>
            </Wrapper>
            <NewsLetter />
            <Footer />
        </Container>
    )
}

export default Product