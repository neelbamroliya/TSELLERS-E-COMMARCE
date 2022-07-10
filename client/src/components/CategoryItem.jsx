import { Link } from "react-router-dom"
import styled from "styled-components"
import { loadCartReq } from "../redux/apiCalls"
import { mobile, teblet } from "../responsive"
import { useSelector, useDispatch } from "react-redux";

const Container = styled.div`
    /* flex: 2; */
    margin: 5px;
    height: 60vh;
    position: relative;
`
const Image = styled.img`
    width: 100%;
    height: 100%;
    /* object-fit: cover; */
    ${mobile({ height: "100%" })}
    ${teblet({ height: "60vh" })}
`
const Info = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const Title = styled.h1`
    color: azure;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    margin-bottom: 20px;
`
const Button = styled.button`
    border: none;
    padding: 10px;
    /* border-color: grey; */
    color: gray;
    cursor: pointer;
    font-weight: 600;
    background-color: white;
`
const CategoryItem = ({ item }) => {
    const user = useSelector(state => state.user.currentUser)
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const handleClick = () => {
        if (user) {
            // console.log(user);
            cart.products.length === 0 && loadCartReq(dispatch, user._id)
        }
    }
    return (
        <Container>
            <Link to={`/products/${item.cat}`}>
                <Image src={item.img} />
                <Info>
                    <Title>{item.title}</Title>
                    <Button onClick={handleClick}>SHOP NOW</Button>
                </Info>
            </Link>
        </Container>
    )
}

export default CategoryItem