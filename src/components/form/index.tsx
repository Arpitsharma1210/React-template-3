import React from "react";
import { StyledForm, StyledFormError, StyledFormRow, StyledFormRowItem } from "./styles";
import { AlertProps, GridProps } from "@mui/material";
import messages from "../../messages";

interface FormProps {
    children ?: JSX.Element | JSX.Element[];
    onSubmit?:any;
    style?: any;
}

export const Form:React.FC<FormProps> = ({
    children, ...props
})=>(
    <StyledForm 
        {...props}
        noValidate 
    >
        {children}
    </StyledForm>
)

interface FormRowProps extends GridProps{
    children ?: JSX.Element | JSX.Element[];
}

export const FormRow:React.FC<FormRowProps> = ({
    children, ...props
})=>(
    <StyledFormRow 
        {...props}
        container 
    >
        {children}
    </StyledFormRow>
)


interface FormRowItemProps extends GridProps{
    children ?: JSX.Element | JSX.Element[];
}

export const FormRowItem:React.FC<FormRowItemProps> = ({
    children, ...props
})=>(
    <StyledFormRowItem 
        {...props}
        item 
    >
        {children}
    </StyledFormRowItem>
);

interface FormErrorProps extends AlertProps{
    message?:string;
}

export const FormError:React.FC<FormErrorProps>  = ({
    message, severity
})=>(
    <StyledFormError severity={severity || 'error'}>
        {message || messages?.general?.errors?.serverError}
    </StyledFormError>
)