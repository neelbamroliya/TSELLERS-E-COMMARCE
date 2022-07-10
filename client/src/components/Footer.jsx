import styled from "styled-components"
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import RoomIcon from '@mui/icons-material/Room';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
    display: flex;
    ${mobile({ flexDirection: "column" })}
`
const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`

const Logo = styled.h1`
    
`

const Desc = styled.p`
    margin: 20px 0px;
`

const SocialContainer = styled.div`
    display: flex;
`

const SocialIcon = styled.div`
    width: 42px;
    height: 42px;
    border-radius: 50%;
    color: white;
    background-color: #${props => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    cursor: pointer;
`

const Center = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({ display: "none" })}
`

const Title = styled.h3`
    margin-bottom: 30px;
`

const List = styled.ul`
    margin: 0;
    padding:0;
    list-style: none;
    display: flex;
    /* flex-wrap: wrap; */
    flex-direction: column;
    
`

const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
    color: black;
    margin-left: 20px;
`

const Right = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({ backgroundColor: "#eee" })}

`

const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`


const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo>TSELLERS</Logo>
                <Desc>India's Best T-Shirt Sellers</Desc>
                <SocialContainer>
                    <SocialIcon color="e4405f">
                        <InstagramIcon />
                    </SocialIcon>
                    <SocialIcon color="00acee">
                        <TwitterIcon />
                    </SocialIcon>
                    <SocialIcon color="0e76a8">
                        <LinkedInIcon />
                    </SocialIcon>
                    <SocialIcon color="171515">
                        <GitHubIcon />
                    </SocialIcon>

                </SocialContainer>
            </Left>
            <Center>
                <Title>USEFUL LINKS</Title>
                <List>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <ListItem>Home</ListItem>
                    </Link>
                    <Link to="/cart" style={{ textDecoration: "none" }}>
                        <ListItem>Cart</ListItem>
                    </Link>
                    <Link to="/products/man" style={{ textDecoration: "none" }}>
                        <ListItem>Man Fashion</ListItem>
                    </Link>
                    <Link to="/products/woman" style={{ textDecoration: "none" }}>
                        <ListItem>Woman Fashion</ListItem>
                    </Link>
                    <Link to="/products" style={{ textDecoration: "none" }}>
                        <ListItem>Products</ListItem>
                    </Link>
                    <Link to="#" style={{ textDecoration: "none" }}>
                        <ListItem>Wishlist</ListItem>
                    </Link>
                    <Link to="#" style={{ textDecoration: "none" }}>
                        <ListItem>Terms</ListItem>
                    </Link>
                </List>
            </Center>
            <Right>
                <Title>Contact</Title>
                <ContactItem>
                    <RoomIcon style={{ marginRight: "10px" }} />
                    Surat, Gujarat, India
                </ContactItem>
                <ContactItem>
                    <PhoneIcon style={{ marginRight: "10px" }} />
                    +91 78753 23810
                </ContactItem>
                <ContactItem>
                    <EmailIcon style={{ marginRight: "10px" }} />
                    contact@tsellers.com
                </ContactItem>
            </Right>
        </Container>
    )
}

export default Footer