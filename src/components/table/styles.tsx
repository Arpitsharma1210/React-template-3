import { styled } from 'styled-components';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Typography } from "@mui/material";
import { fontSize, fontWeight } from "../../theme/style.typography";
import { brand, colors } from "../../theme/style.palette";


export const StyledTableContainer = styled(TableContainer)`
    // width: 100%;
`

export const StyledTable = styled(Table)`

`

export const StyledTableHead = styled(TableHead)`

`
export const StyledTableBody = styled(TableBody)`

`
export const StyledTableRow = styled(TableRow) <{ isHeading?: boolean; }>`
    cursor: ${({ isHeading }) => isHeading ? 'default' : 'pointer'};
    &:hover {
        background-color: ${({ isHeading }) => !isHeading && colors.greyLight};
    }
`
export const StyledTableCell = styled(TableCell) <{ isHeading?: boolean; clickable?: boolean; centerAlign?: boolean }>`
    padding: ${({ isHeading }) => isHeading ? `16px 16px` : `8px 16px`} !important;
    border-bottom: ${({ isHeading }) => isHeading ? `1px solid ${colors.greyMedium}` : 0} !important;
    color: ${({ isHeading }) => isHeading ? brand.textColourDark : brand.textColour} !important;
    font-weight: ${({ isHeading }) => isHeading ? fontWeight.semiBold : fontWeight.regular} !important;
    font-size: ${fontSize.b2} !important;
    cursor: ${({ clickable }) => clickable ? 'pointer' : 'inherit'};
    text-align: ${({ centerAlign }) => centerAlign ? 'center' : 'left'} !important;
`

export const StyledCellContainer = styled.div`
    display: flex;
    column-gap: 4px;
`

export const StyledLoadmoreContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 64px;
`
export const StyledLoadmoreCta = styled(Typography)`
    font-size : ${fontSize.b3};
    color : ${brand.primaryMain};
    cursor:pointer;
`

export const StyledActionMenuContainer = styled.div`
`

export const StyledNoDataInfoContainer = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    margin-top: 120px;
`

export const StyledNoDataInfo = styled(Typography)`

`