import React from 'react';
import { StyledContainer, StyledError } from '../textInput/styles';
import { StyledCheckbox, StyledFormControlLabel } from './styles';

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

const CheckBoxInput: React.FC<Props> = ({
    label,
    error,
    value,
    onChange,
    disableErrorMode,
    fullWidth,
    ...props
}) => {
    return (
        <StyledContainer>
            <StyledFormControlLabel 
                { ...props}
                control={<StyledCheckbox value={!!value} />} 
                label={label} 
                onChange={() => {
                    if (onChange) {
                        onChange(!value);
                    }
                }}
            />
            {!disableErrorMode && <StyledError variant='body2'>{error || ''}</StyledError>}
        </StyledContainer>
    )

}

export default CheckBoxInput;