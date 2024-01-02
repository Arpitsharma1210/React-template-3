import React from 'react';
import { StyledCard, StyledCardContent } from "./styles"
import { SxProps, Theme } from '@mui/material';


interface Props {
    children: (JSX.Element|JSX.Element[]);
    cardCss?:SxProps<Theme>;
    contentCss?:SxProps<Theme>;
    bordered?:boolean;
}

const Card:React.FC<Props> = ({
    children, cardCss, contentCss,
    bordered
})=>{

    return (
        <StyledCard sx={cardCss} bordered={bordered}>
            <StyledCardContent sx={contentCss}>
                {children}
            </StyledCardContent>
        </StyledCard>
    )
}

export default Card;