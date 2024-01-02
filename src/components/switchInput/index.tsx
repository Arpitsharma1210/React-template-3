import { Switch, SwitchProps, styled } from "@mui/material";
import React from "react";
import { StyledContainer, StyledError } from "../textInput/styles";
import { StyledFormControlLabel } from "../checkBoxInput/styles";
import { brand } from "../../theme/style.palette";

const IOSSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    marginLeft : '16px',
    width: 52,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(26px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : brand.primaryMain,
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));

  interface Props {
    label?: string;
    value?: string;
    onChange?: any;
    error?: string;
    disableErrorMode?: boolean;
    required?: boolean;
    readOnly?: boolean;
    disabled?:boolean;
    fullWidth?:boolean;
    onReadOnlyCtaClick?:()=>void;
}


const SwitchInput: React.FC<Props> = ({
    label,
    error,
    value,
    onChange,
    disableErrorMode,
    fullWidth,
    readOnly,
    disabled,
    onReadOnlyCtaClick,
    ...props
}) => {
    return (
        <StyledContainer>
            <StyledFormControlLabel 
                {...props}
                control={<IOSSwitch checked={!!value} />} 
                label={label} 
                onChange={() => {
                    if (onChange && !readOnly) {
                        onChange(!value);
                    }
                    if(onReadOnlyCtaClick && readOnly){
                      onReadOnlyCtaClick()
                    }
                }}
            />
            {!disableErrorMode && <StyledError variant='body2'>{error || ''}</StyledError>}
        </StyledContainer>
    )

}

export default SwitchInput;