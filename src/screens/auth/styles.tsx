import { Typography } from '@mui/material';
import styled from 'styled-components';
import { brand, colors } from '../../theme/style.palette';
import { fontSize, fontWeight } from '../../theme/style.typography';

export const Logo = styled.img`
    width:224px;
    margin-bottom:32px;
`
export const StyledLogo = styled.img`
    width:190px;
    margin-bottom:56px;
`

export const StyledHeading = styled(Typography)`
    margin-bottom : 48px !important;
`

export const StyledError = styled(Typography)`
    color : ${brand.error};
    margin-top:8px !important;
 `

export const StyledInvaildPassword = styled(Typography)`
    font-size : ${fontSize.b3} !important;
    font-weight : ${fontWeight.light} !important;
    color: ${colors.grey};
    margin-bottom : 8px !important;
`