import styled from "styled-components"
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadCartReq } from "../redux/apiCalls";

const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;
`

const Container = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 280px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5fbfd;
    position: relative;

    &:hover ${Info}{
        opacity: 1;
    }
`

const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
`
const Image = styled.img`
    height: 75%;
    z-index: 2;
`

const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;
    &:hover{
        background-color: #e9f5f5;
        transform: scale(1.1);
    }
`

const Product = ({ item }) => {
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
            <Circle />
            <Image src={item.img} />
            <Info>
                <Link to="/cart">
                    <Icon>
                        <ShoppingCartOutlinedIcon style={{ color: "black" }} onClick={handleClick} />
                    </Icon>
                </Link>
                <Icon>
                    <Link to={`/product/${item._id}`} style={{ color: "black" }}>
                        <SearchOutlinedIcon onClick={handleClick} />
                    </Link>
                </Icon>
                <Icon>
                    <FavoriteBorderOutlinedIcon onClick={handleClick} />
                </Icon>
            </Info>
        </Container>
    )
}

export default Product