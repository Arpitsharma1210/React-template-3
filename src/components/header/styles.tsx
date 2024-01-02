import { styled } from 'styled-components';
import { Typography } from '@mui/material';
import { colors } from '../../theme/style.palette';
import { respondTo } from '../../theme/style.layout';

export const StyledContainer = styled.div`
    display: flex;
    align-items:center;
    flex: 1;
    margin: 16px 0px;
    width: 100%;
`

export const StyledLogoContainer = styled.div`
    margin-right: 32px;
    display: flex;
    ${respondTo.smOnly}{
        margin-left: 32px;
    }
`
export const StyledLogo = styled.img`
    width : 34px;

`

export const StyledNavContainer = styled.div`
    display: flex;
    align-items:center;
    flex: 1;
`

export const StyledNavItem = styled.div<{active?:boolean}>`
    margin-right: 24px;
    padding : 8px;
    border-radius: 8px;
    cursor : pointer;
    background-color: ${({active})=> active ? colors.greyLight : 'transparent'}
`

export const StyledNavItemText = styled(Typography)`

`
export const StyledLogoutContainer= styled.div`
    margin-right: 16px;
    cursor : pointer;
`

export const StyledLogoutText = styled(Typography)`

`