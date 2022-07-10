import styled from "styled-components"

const Container = styled.div`
    height: 30px;
    background-color: teal;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-display: 14px;
    font-weight: 500;
`

const Announcement = () => {
    return (
        <Container>
            SuperDeal! Free shipping on order over 5000 Rs.
        </Container>
    )
}

export default Announcement