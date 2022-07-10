import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { login } from "../redux/apiCalls"
import { mobile, teblet } from "../responsive"

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: rgb(255, 208, 161);
    display: flex;
    align-items: center;
    justify-content: center;
`

const Wrapper = styled.div`
    width: 50%;
    height: 50%;
    padding: 20px;
    background-color: white;
    border-radius: 20px;
    /* box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; */
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    ${mobile({ width: "75%" })}
    ${teblet({ width: "70%", height: "60%" })}
`

const Title = styled.h1`
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 50px;
    text-align: center;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* ${teblet({ marginTop: "20px" })} */
`

const Input = styled.input`
    /* flex: 1; */
    width: 60%;
    margin: 20px 10px 0 0 ;
    padding: 10px;
    ${teblet({ margin: "10px 5px 0 0" })}
`

const Button = styled.button`
    width: 30%;
    border: none;
    padding: 15px 20px ;
    margin-top: 30px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin-bottom: 10px;
    &:disabled{
        color: green;
        cursor: not-allowed;
    }
`

const Link = styled.a`
    margin: 10px 0px;
    font-size: 14px;
    text-decoration: underline;
    cursor: pointer;
`

const Error = styled.span`
    color: red;
`

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const { isFetching, error } = useSelector(state => state.user)

    const handleClick = (e) => {
        e.preventDefault()
        login(dispatch, { username, password })
    }

    return (
        <>
            <Navbar />
            <Container>
                <Wrapper>
                    <Title>SIGN IN</Title>
                    <Form>
                        <Input placeholder="username" onChange={e => setUsername(e.target.value)} />
                        <Input placeholder="password" type="password" onChange={e => setPassword(e.target.value)} />
                        <Button onClick={handleClick} disabled={isFetching}>LOGIN</Button>
                        {error && <Error>Something went wrong!!</Error>}
                        <Link>forget password ?</Link>
                        <Link>CREATE A NEW ACCOUNT</Link>
                    </Form>
                </Wrapper>
            </Container>
            <Footer />
        </>
    )
}

export default Login