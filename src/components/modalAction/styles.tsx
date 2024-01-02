import { Typography } from "@mui/material";
import { styled } from "styled-components";
import { fontWeight } from "../../theme/style.typography";



export const StyledContainer = styled.div`

`

export const StyledInfoContainer = styled.div`
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
`

export const StyledTitle = styled(Typography)`

`


export const StyledInfo = styled(Typography)`
    font-weight : ${fontWeight?.medium} !important;
`

export const StyledCtaContainer = styled.div`
    display: flex;
    gap: 24px;
    align-items: center;
    justify-content: flex-end;
`