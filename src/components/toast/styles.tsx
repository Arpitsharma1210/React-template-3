import { Typography } from "@mui/material";
import { styled } from "styled-components";
import { fontSize, fontWeight } from "../../theme/style.typography";
import { colors } from "../../theme/style.palette";
import { brand } from "../../theme/style.palette";


export const StyledToastContainer = styled.div`
    display: flex;
    gap: 16px;
    align-items: center;
    justify-content: center;
`

export const StyledToastIconContainer = styled.div`
background: linear-gradient(46deg, ${brand.primaryMain} 0%, ${brand.secondaryMain} 100%);
    border-radius: 50%;
    padding : 24px;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const StyledToastIcon = styled.img`
    width: 35px;
    height: 35px;
`

export const StyledToastInfoContainer = styled.div`
background: linear-gradient(46deg, ${brand.primaryMain} 0%, ${brand.secondaryMain} 100%);
    border-radius: 14px;
    padding : 24px;
    min-width : 280px;
    display: flex;
    flex-direction: column;

`

export const StyledToastInfoText = styled(Typography)`
    font-weight : ${fontWeight.semiBold} !important;
    font-size : ${fontSize.h4} !important;
    color : ${colors.grey10};
`

export const StyledToastInfoSubText = styled(Typography)`
    font-size : ${fontSize.b1} !important;
    color : ${colors.grey10};
`