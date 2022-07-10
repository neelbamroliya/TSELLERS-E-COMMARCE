import styled from "styled-components"
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { useState } from "react";
import { sliderItems } from "../data";
import { mobile, teblet } from "../responsive";
import { Link } from "react-router-dom";
import { loadCartReq } from "../redux/apiCalls";
import { useDispatch, useSelector } from 'react-redux';

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    position: relative;
    overflow: hidden;
    ${mobile({ display: "none" })}
    ${teblet({ height: "80vh", width: "100vw" })}
`

const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: #fff7f7;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    left: ${props => props.direction === "left" && "10px"};
    right: ${props => props.direction === "right" && "10px"};
    cursor: pointer;
    opacity: 0.4;
    z-index: 2;
`

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    transition: all 1.5s ease;
    transform: translateX(${props => props.slideIndex * -100}vw);
`

const Slide = styled.div`
    display: flex;
    align-items: center;
    width: 100vw;
    height: 90vh;
    background-color: #${props => props.bg};
    ${teblet({ width: "100vw", height: "100%" })}
`

const ImgContainer = styled.div`
    flex: 1;
    height: 100%;
`

const Image = styled.img`
    height: 100%;
    object-fit: cover;
    width: 90%;
    ${teblet({ height: "100%", width: "100%" })}
`

const InfoContainer = styled.div`
    flex: 1;
    padding: 50px;
`

const Title = styled.h1`
    font-size: 70px;
    ${teblet({ fontSize: "40px" })}
`
const Desc = styled.p`
    margin: 50px;
    font-size: 50px;
    font-weight: 500;
    letter-spacing: 3px;
    ${teblet({ margin: "15px", fontSize: "24px" })}
`

const Button = styled.button`
    padding: 10px;
    font-size:20px;
    background-color: transparent;
    cursor: pointer;
`

const Slider = () => {
    const [slideIndex, setSlideIndex] = useState(0)
    const user = useSelector(state => state.user.currentUser)
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const handleClick = (direction) => {
        if (direction === "left") {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2)
        } else {
            setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0)
        }
    }
    const handleCart = () => {
        if (user) {
            cart.products.length === 0 && loadCartReq(dispatch, user._id)
        }
    }

    return (
        <Container>
            <Arrow direction="left" onClick={() => handleClick("left")}>
                <ArrowBackIosNewRoundedIcon />
            </Arrow>
            <Wrapper slideIndex={slideIndex}>
                {sliderItems.map(item => (
                    <Slide bg={item.bg} key={item.id}>
                        <ImgContainer>
                            <Image src={item.img} />
                        </ImgContainer>
                        <InfoContainer>
                            <Title>{item.title}</Title>
                            <Desc>{item.desc}</Desc>
                            <Link to="/products">
                                <Button onClick={handleCart}>SHOP NOW</Button>
                            </Link>
                        </InfoContainer>
                    </Slide>
                ))}
            </Wrapper>
            <Arrow direction="right" onClick={() => handleClick("right")}>
                <ArrowForwardIosRoundedIcon />
            </Arrow>
        </Container>
    )
}

export default Slider