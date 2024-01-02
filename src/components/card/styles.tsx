import { Card, CardContent } from '@mui/material';
import styled, { css } from 'styled-components';
import { respondTo } from '../../theme/style.layout';
import { brand } from '../../theme/style.palette';

export const StyledCard = styled(Card) <{ bordered?: boolean }>`
    margin-top: 100px;
    ${respondTo.smOnly}{
        margin-top: 0px;
        width:100%;
        height: 100vh;
   }
   ${({ bordered }) => bordered && css`
        border-top : 6px solid ${brand.primaryMain}
   `}
`

export const StyledCardContent = styled(CardContent)`
    ${respondTo.smOnly}{
        padding: 80px 20px !important;
   }
`