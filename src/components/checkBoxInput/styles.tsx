import { Checkbox, FormControlLabel } from "@mui/material";
import { styled } from "styled-components";
import { baseFontFamily, fontSize, fontWeight } from "../../theme/style.typography";
import { brand, colors } from "../../theme/style.palette";



export const StyledFormControlLabel = styled(FormControlLabel)`
    margin-left : 0px !important;
    .MuiFormControlLabel-label {
        font-size: ${fontSize.b2};
        font-weight: ${fontWeight.regular};
        font-family: ${baseFontFamily};
        color: ${brand.textColourDark};
    }
`

export const StyledCheckbox = styled(Checkbox)`

`