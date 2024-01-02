import { DatePicker } from "@mui/x-date-pickers";
import { styled } from "styled-components";
import { fontSize, fontWeight } from "../../theme/style.typography";
import { brand } from "../../theme/style.palette";


export const StyledDatePicker = styled(DatePicker)<{fullWidth?:boolean; }>`

    .MuiInputBase-input{
        padding: 10px 16px;
        font-size: ${fontSize.b2};
        font-weight: ${fontWeight.regular};
        color: ${brand.inputBorder};
        &::placeholder {
            color: ${brand.placeHolder};
        }
    }
   
`