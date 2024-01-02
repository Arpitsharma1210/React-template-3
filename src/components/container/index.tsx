import React from 'react';
import { StyledContainer, StyledContainerProps } from "./styles"
import Header from '../header';
import { SxProps, Theme } from '@mui/material';


interface Props extends StyledContainerProps {
    children?: (JSX.Element | JSX.Element[]);
    hideHeader?: boolean;
    containerCss?: SxProps<Theme>;
    cardCss?: any;
    contentCss?: any;
}

const Container: React.FC<Props> = ({
    children, hideHeader, centerAlign, containerCss
}) => {

    return (
        <StyledContainer sx={containerCss} centerAlign={centerAlign}>
            {!hideHeader && <Header />}
            {children}
        </StyledContainer>
    )
}

export default Container;