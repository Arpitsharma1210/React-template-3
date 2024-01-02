import { Typography } from "@mui/material";
import { css, styled } from "styled-components";
import { colors } from "../../theme/style.palette";
import { fontWeight } from "../../theme/style.typography";


export const StyledContainer = styled.div<{fitContent?:boolean}>`
    width: ${({fitContent})=>fitContent? 'fit-content' : '70%'};
    min-width: 560px;
    margin: 0 auto;
    margin-top: 128px;
    ${({fitContent})=>fitContent&&css`
        max-width: 560px;
    `}
`

export const StyledHeaderContainer = styled.div`
    padding: 8px 16px;
`

export const StyledHeading= styled(Typography)`
    color : ${colors.grey10};
`

export const StyledSubHeading= styled(Typography)`
    color : ${colors.grey10};
    font-weight : ${fontWeight.medium} !important;
`

export const StyledCloseContainer = styled.div`
    position:absolute;
    top : 12px;
    right : 12px;
    width : 32px;
    height : 32px;
    border-radius : 50%;
    background-color : ${colors.grey10};
    display:flex;
    align-items:center;
    justify-content:center;
    cursor : pointer;
`

export const StyledHeadingImgContainer = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
`

export const StyledHeadingImg = styled.img`
    width: 72px;
`