import React from 'react';
import { StyledContainer, StyledError, 
    StyledInfo, 
    StyledInput, StyledInputContainer, 
    StyledInputText, StyledLabel } from './styles';


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
    info?:string;
    onReadOnlyCtaClick?:()=>void;
}


const TextInput: React.FC<Props> = ({
    label,
    error,
    value,
    onChange,
    disableErrorMode,
    readOnly,
    required,
    disabled,
    fullWidth,
    info,
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
                        {value || ''}
                    </StyledInputText>
                ) : (
                    <StyledInput
                        {...props}
                        fullWidth={fullWidth}
                        disabled={disabled}
                        error={disableErrorMode ? false : !!error}
                        value={value || ''}
                        onChange={(event) => {
                            if (onChange) {
                                onChange(event?.currentTarget?.value);
                            }
                        }}
                    />)}
            </StyledInputContainer>
            {info && <StyledInfo>{info}</StyledInfo>}
            {!disableErrorMode && <StyledError variant='body2'>{error || ''}</StyledError>}
        </StyledContainer>
    )

}

export default TextInput;