import { Typography } from '@mui/material';
import { css, styled } from 'styled-components';
import { brand, colors } from '../../theme/style.palette';
import { baseFontFamily, fontSize, fontWeight } from '../../theme/style.typography';



export const StyledContainer = styled.div`

`
export const StyledLabel = styled.label<{readOnly?:boolean; required?:boolean}>`
    display: block;
    margin-bottom : ${({readOnly})=>readOnly? 16 : 8}px;
    font-size: ${fontSize.b3};
    font-weight: ${fontWeight.medium};
    color : ${brand.textColourDark};

    ${({ required }) => required && css`
        &::after {
            content: '*';
            color: ${colors.red}; 
            margin-left: 2px; 
        }
    `}

`
export const StyledInputContainer = styled.div`
    display: flex;
`

export const StyledInput = styled.input<{ error?: boolean; fullWidth?:boolean; }>`
    width:100%;
    max-width : ${({fullWidth})=>fullWidth ? '100%' : '384px'};
    outline:none;
    border: 1px solid ${brand.inputBg};
    background-color: ${brand.inputBg};
    border-radius:6px;
    padding:10px 18px;
    max-height: 18px;   
    font-size: ${fontSize.b2};
    font-weight: ${fontWeight.regular};
    font-family: ${baseFontFamily};
    color: ${brand.inputBorder};
    &:hover {
        border-color: ${brand.inputBorder};
    }
    &:focus {
        border-color: ${brand.inputBorder};
        background-color: ${colors.white};
        color: ${brand.textColourDark};
    }

    ${({ error }) => error && css`
        background-color: ${brand.errorBg};
        &:hover {
            border-color: ${brand.errorBorder};
        }
        &:focus {
            border-color: ${brand.errorBorder};
        }
    `}
    
`

export const StyledInputText = styled(Typography)<{disabled?:boolean}>`
    color : ${brand.inputBorder};
    cursor : pointer;
    ${({disabled})=>disabled&&css`
        color : ${brand.textColour};
        cursor : inherit;
    `}
`

export const StyledError = styled(Typography)`
    color : ${brand.error};
    margin-top:8px !important;
 `
 export const StyledInfo = styled(Typography)`
    color : ${colors.grey};
    margin-top:8px !important;
    font-size: ${fontSize.b3} !important;
`
