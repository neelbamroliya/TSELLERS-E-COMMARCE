import React from 'react'
import styled from "styled-components"
import Search from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { mobile } from '../responsive';
import { Badge } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { addtoCartReq, loadCartReq, logout } from '../redux/apiCalls';
import { emptyCart } from '../redux/cartRedux';

const Container = styled.div`
    height: 60px;
    ${mobile({ height: "50px" })}
`

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ padding: "10px 0" })}
`

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`

const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
    ${mobile({ display: "none" })}

`

const SearchContainer = styled.div`
    border: 1px solid lightgrey;
    border-radius: 10px;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
    ${mobile({ marginLeft: "5px" })}
`

const Input = styled.input`
    border: none;
    outline: none;
    ${mobile({ width: "50px" })}
`

const Center = styled.div`
    flex: 1;
    text-align: center;
`

const Logo = styled.h1`
    font-weight: bold;
    text-align: center;
    ${mobile({ fontSize: "24px" })}
    color: black;
`

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({ flex: "2", justifyContent: "center" })}
`

const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    color: black;
    ${mobile({ fontSize: "12px", marginLeft: "7px" })}
`

const Logout = styled.button`
    border: none;
    color: red;
    padding: 5px 10px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
`

const Navbar = () => {

    const user = useSelector(state => state.user.currentUser)
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleCart = () => {
        if (user && cart.products.length === 0) {
            // console.log(user);
            loadCartReq(dispatch, user._id)
        }
        // console.log(cart.products.length);
        cart.products.length !== 0 && addtoCartReq(cart.products, cart.userId)
    }


    const handleClick = (e) => {
        e.preventDefault()
        cart.products.length !== 0 && addtoCartReq(cart.products, cart.userId)
        logout(dispatch, JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser)
        dispatch(emptyCart())
        history.push("/login")
    }

    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchContainer>
                        <Input placeholder='search' />
                        <Search style={{ color: "grey" }} />
                    </SearchContainer>
                </Left>
                <Center>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <Logo>TSELLERS</Logo>
                    </Link>
                </Center>
                <Right>
                    {user ?
                        <Logout onClick={handleClick}>Logout</Logout>
                        :
                        <>
                            <Link to="/register" style={{ textDecoration: "none" }}>
                                <MenuItem>REGISTER</MenuItem>
                            </Link>
                            <Link to="/login" style={{ textDecoration: "none" }}>
                                <MenuItem>SIGN IN</MenuItem>
                            </Link>
                        </>
                    }
                    <Link to="/cart">
                        <MenuItem>
                            <Badge badgeContent={cart.quantity} color="primary">
                                <ShoppingCartOutlinedIcon style={{ color: "black" }} onClick={handleCart} />
                            </Badge>
                        </MenuItem>
                    </Link>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar