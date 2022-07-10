import { css } from "styled-components"

export const mobile = (props) => {
    return css`
        @media only screen and (max-width:480px) {
            ${props}            
        }
    `
}
export const teblet = (props) => {
    return css`
        @media only screen and (min-width:481px) and (max-width:1025px) {
            ${props}            
        }
    `
}