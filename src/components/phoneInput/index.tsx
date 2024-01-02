import React from 'react';
import {
    StyledContainer, StyledError,
    StyledInputContainer, StyledInputText,
    StyledLabel
} from '../textInput/styles';
import { StyledPhoneInput } from './styles';


interface Props {
    label?: string;
    value?: { phone?: string; dialCode?: string };
    onChange?: any;
    error?: string;
    disableErrorMode?: boolean;
    required?: boolean;
    readOnly?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
    onReadOnlyCtaClick?: () => void;
}


const PhoneInput: React.FC<Props> = ({
    label,
    error,
    value,
    onChange,
    disableErrorMode,
    readOnly,
    required,
    disabled,
    fullWidth,
    onReadOnlyCtaClick,
    ...props
}) => {
    return (
        <StyledContainer>
            {label && (
                <StyledLabel
                    readOnly={readOnly}
                    required={required}
                >
                    {label}
                </StyledLabel>
            )}
            <StyledInputContainer
                onClick={() => {
                    if (onReadOnlyCtaClick && readOnly) {
                        onReadOnlyCtaClick();
                    }
                }}
            >
                <StyledPhoneInput
                    {...props}
                    readOnly={readOnly}
                    country='us'
                    preferredCountries={['us', 'au', 'in']}
                    fullWidth={fullWidth}
                    disabled={disabled || readOnly}
                    error={disableErrorMode ? false : !!error}
                    value={value?.phone || null}
                    onChange={(newValue, country: any) => {
                        if (onChange && !readOnly) {
                            onChange({ phone: newValue, dialCode: country?.dialCode });
                        }

                    }}
                />
            </StyledInputContainer>
            {!disableErrorMode && <StyledError variant='body2'>{error || ''}</StyledError>}
        </StyledContainer>
    )

}

export default PhoneInput;