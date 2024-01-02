import React from 'react';
import { StyledContainer, StyledError, 
    StyledInputContainer, StyledInputText, 
    StyledLabel } from '../textInput/styles';
import { StyledDatePicker } from './styles';
import moment from 'moment';


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


const DateInput: React.FC<Props> = ({
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
            <StyledInputContainer>
                {readOnly ? (
                    <StyledInputText 
                        onClick={onReadOnlyCtaClick}
                        disabled={disabled} 
                        variant='body2'
                    >
                        {value ? moment(value).format('DD MMMM, YYYY') : ''}
                    </StyledInputText>
                ) : (
                    <StyledDatePicker
                        {...props}
                        format='DD MMMM, YYYY'
                        fullWidth={fullWidth}
                        disabled={disabled}
                        //error={disableErrorMode ? false : !!error}
                        value={value || null}
                        onChange={(newValue) => {
                            if (onChange) {
                                onChange(newValue);
                            }
                        }}
                    />
                )}
            </StyledInputContainer>
            {!disableErrorMode && <StyledError variant='body2'>{error || ''}</StyledError>}
        </StyledContainer>
    )

}

export default DateInput;