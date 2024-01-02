import React from 'react';
import { TextField } from '@mui/material';
import { StyledError } from '../textInput/styles';

interface Props {
    value?: string;
    onChange?: any;
    error?: string;
    disableErrorMode?: boolean;
}


const MaterialTextInput: React.FC<Props> = ({
    value, onChange, error,
    disableErrorMode,
    ...props
}) => (
    <>
        <TextField
            {...props}
            value={value || ''}
            error={disableErrorMode ? undefined : !!error}
            onChange={(event) => {
                if (onChange) {
                    onChange(event?.currentTarget?.value);
                }
            }}
        />
        {!disableErrorMode && error && <StyledError variant='body2'>{error}</StyledError>}
    </>
);

export default MaterialTextInput;
