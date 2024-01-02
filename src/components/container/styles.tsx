import { Container } from '@mui/material';
import styled from 'styled-components';
import { respondTo } from '../../theme/style.layout';

export interface StyledContainerProps {
    centerAlign?: boolean;
}

export const StyledContainer = styled(Container) <StyledContainerProps>`
    align-items : ${({ centerAlign }) => centerAlign ? 'center' : 'baseline'} !important;
    ${respondTo.smOnly}{
        padding: 0 !important;
    }
`