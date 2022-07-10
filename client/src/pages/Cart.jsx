import styled from "styled-components"
import Announcement from "../components/Announcement"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
// import StripeCheckout from "react-stripe-checkout";
import { Link } from "react-router-dom";
import { addtoCartReq, cartCheckoutReq } from "../redux/apiCalls";
import { removeProduct } from "../redux/cartRedux";
import PaypalButton from "../PaypalButton";

// const KEY = "pk_test_51LD1xGSES4oyVE3zjzxBPvqt99ViCZnLUYNVWVu2T9yYoHFWELQkhCaLoMXEqbH0H8KNuKbnuHxOIC2gbop0VToR001OqAid3r"

const Container = styled.div`

`

const Wrapper = styled.div`
    padding: 20px;
    ${mobile({ padding: "10px" })}
`

const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`

const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${props => props.type === "filled" && "none"};
    background-color: ${props => props.type === "filled" ? "" : "transparent"};
    color: ${props => props.type === "filled" && "white"};
`

const TopTexts = styled.div`
    ${mobile({ display: "none" })}
`

const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0 10px;
`


const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: "column" })}
`

const Info = styled.div`
    flex: 3;
`

const Product = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: "column" })}
`

const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`

const Image = styled.img`
    width: 200px;
`

const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`

const ProductName = styled.span``

const ProductId = styled.span``

const ProductColor = styled.span`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
`

const ProductSize = styled.span``

const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`

const ProductAmount = styled.div`
    font-size: 20px;
    margin: 5px;
    ${mobile({ margin: "5px 15px" })}
`

const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
    ${mobile({ marginBottom: "20px" })}
`
const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 2px;
`

const Summary = styled.div`
    flex: 1;
    border: 0.5px solid lightgrey;
    border-radius: 10px;
    padding: 20px;
    height: 50vh;
`
const SummaryTitle = styled.h1`
    font-weight: 200;
`
const SummaryItem = styled.div`
    margin: 30px 0;
    display: flex;
    justify-content: space-between;
    font-weight: ${props => props.type === "total" && "500"};
    font-size: ${props => props.type === "total" && "24px"};
`
const SummaryItemText = styled.span``
const SummaryItemPrice = styled.span``
const Button = styled.button`
    width: 100%;
    padding: 10px;
    /* background-color: black; */
    color: white;
    font-weight: 600;
    border: none;
`

const DeleteIconButton = styled.button`
    color: red;
    border:none;
    background-color: transparent;
    cursor: pointer;
`

const Cart = () => {
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()

    const handleClick = () => {
        cart.products.length !== 0 && addtoCartReq(cart.products, cart.userId)
    }

    const handleDelete = (product) => {
        dispatch(removeProduct({ userId: cart.userId, ...product }))
        // removefromCartReq(dispatch, cart.userId, product)
    }

    const tranSuccess = async (payment) => {
        // console.log(payment);
        const { paymentID, address } = payment
        cartCheckoutReq(dispatch, { cart, paymentID, address })
        alert("payment is successful and your order has been placed...thank you..")
    }


    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <Title>YOUR CART</Title>
                <Top>
                    <Link to="/">
                        <TopButton onClick={handleClick}>CONTINUE SHOPPING</TopButton>
                    </Link>
                    <TopTexts>
                        <TopText>Shoping Bag ({cart.products.length})</TopText>
                        <TopText>Your Wishlist (0)</TopText>
                    </TopTexts>
                    <TopButton type="filled">
                        <PaypalButton total={cart.total} tranSuccess={tranSuccess} />
                    </TopButton>
                </Top>
                <Bottom>
                    <Info>
                        {cart.products.map(product => (
                            <>
                                <Product>
                                    <ProductDetail>
                                        <Image src={product.img} />
                                        <Details>
                                            <ProductName><b>PRODUCT: </b>{product.title}</ProductName>
                                            <ProductId><b>ID: </b> {product.productId}</ProductId>
                                            <ProductColor color={product.color} />
                                            <ProductSize><b>SIZE:</b>{product.size}</ProductSize>
                                        </Details>
                                    </ProductDetail>
                                    <PriceDetail>
                                        <ProductAmountContainer>
                                            <ProductAmount><b>QUANTITY: </b>{product.quantity}</ProductAmount>
                                        </ProductAmountContainer>
                                        <ProductPrice>$ {product.price * product.quantity}</ProductPrice>
                                    </PriceDetail>
                                    <DeleteIconButton>
                                        <DeleteForeverIcon style={{ fontSize: "28px" }} onClick={() => handleDelete(product)} />
                                    </DeleteIconButton>
                                </Product>
                                <Hr />
                            </>
                        ))}
                    </Info>
                    <Summary>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Estimated Shipping</SummaryItemText>
                            <SummaryItemPrice>$ 5</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Discount</SummaryItemText>
                            <SummaryItemPrice>$ -5</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type="total">
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <Button>
                            <PaypalButton total={cart.total} tranSuccess={tranSuccess} />
                        </Button>
                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default Cart