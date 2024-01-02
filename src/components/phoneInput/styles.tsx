import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/bootstrap.css'
import { css, styled } from 'styled-components';
import { baseFontFamily, fontSize, fontWeight } from '../../theme/style.typography';
import { brand, colors } from '../../theme/style.palette';

export const StyledPhoneInput = styled(PhoneInput)<{error?: boolean; fullWidth?:boolean; readOnly?:boolean;}>`

    .form-control {
        width:100%;
        max-width : ${({fullWidth})=>fullWidth ? '100%' : '384px'};
        outline:none;
        border: 1px solid ${brand.inputBg};
        background-color: ${brand.inputBg};
        border-radius:6px;
        padding: 10px 16px 10px 56px;
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
            box-shadow: none;
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
        ${({ readOnly }) => readOnly && css`
            background-color: transparent;
            cursor: pointer;
            &:hover {
                border-color: ${brand.inputBg};
            }
            &:focus {
                border-color: ${brand.inputBg};
            }
        `}
    }
    .selected-flag.open{
        &:before {
            box-shadow: none;
            border : none;
            outline : none;
        }
    }
    .selected-flag {
        &:focus:before{
            box-shadow: none;
            border : none;
            outline : none;
        }
        outline : none !important;
    }
 
   
`