import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import styled from "styled-components"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { addEndUser } from "../redux/apiCalls"
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
    width: 70%;
    height: 50%;
    padding: 20px;
    background-color: white;
    border-radius: 20px;
    /* box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; */
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    ${mobile({ width: "75%", height: "64%" })}
    ${teblet({ width: "80%", height: "45%" })}
`

const Title = styled.h1`
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 50px;
    text-align: center;
`

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    /* ${teblet({ marginTop: "110px" })} */
`

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0 0 ;
    padding: 10px;
`

const Button = styled.button`
    width: 30%;
    border: none;
    padding: 15px 20px ;
    margin-top: 30px;
    background-color: teal;
    color: white;
    cursor: pointer;
    ${mobile({ width: "75%" })}
`
const Error = styled.span`
    color: red;
`


const Register = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const dispatch = useDispatch()
    const { isFetching, error } = useSelector(state => state.user)
    const history = useHistory()

    const handleClick = (e) => {
        e.preventDefault()
        addEndUser(dispatch, { username, email, password })
        if (!error && !isFetching) {
            // createCart(dispatch, email)
            history.push("/login")
        }
    }

    return (
        <>
            <Navbar />
            <Container>
                <Wrapper>
                    <Title>CREATE AN ACCOUNT</Title>
                    <Form>
                        <Input placeholder="name" type="text" onChange={e => e.target.value} />
                        <Input placeholder="last name" type="text" onChange={e => e.target.value} />
                        <Input placeholder="username" type="text" onChange={e => setUsername(e.target.value)} />
                        <Input placeholder="email" type="email" onChange={e => setEmail(e.target.value)} />
                        <Input placeholder="password" type="password" onChange={e => setPassword(e.target.value)} />
                        <Input placeholder="confirm password" type="password" />
                        <Button onClick={handleClick} disabled={isFetching}>CREATE</Button>
                        {error && <Error>Something went wrong!!</Error>}
                    </Form>
                </Wrapper>
            </Container>
            <Footer />
        </>
    )
}

export default Register