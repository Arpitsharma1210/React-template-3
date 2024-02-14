import React, { useState } from "react";
import { styled } from 'styled-components';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { MetaData } from "../../models";
import { fontSize, fontWeight } from "../../theme/style.typography";
import { brand, colors } from "../../theme/style.palette";
import messages from "../../messages";
import { Menu, MenuItem, Typography } from "@mui/material";
import {
    StyledActionMenuContainer,
    StyledCellContainer, StyledLoadmoreContainer, StyledLoadmoreCta,
    StyledNoDataInfo,
    StyledNoDataInfoContainer,
    StyledTable, StyledTableBody, StyledTableCell, StyledTableContainer,
    StyledTableHead, StyledTableRow
} from "./styles";
import moment from "moment";


export const formatStr = (str: string): string => str;
export const formatDate = (str: string): string => str ? moment(str).format('DD MMM YYYY') : '';


export interface TableSpec {
    id: string;
    label?: string;

    format?(val: any): JSX.Element | string;

    getValue?(row: any): any;
}

export interface ActionSpec {
    id: string;
    label: string;
    onClick(row: any): void;
    renderAction?: (row: any) => void;
}

export interface TableProps {
    specs: TableSpec[];
    data: Record<string, any>[];
    metadata?: MetaData<any>;
    emptyMessage?: string;
    disableSorting?: string[];
    actions?: ActionSpec[];

    loadMoreCta?: string;

    renderColumn?(column: string): boolean;

    updateFilters?(param: Partial<MetaData<any>>): void;


    getId?(param: Record<string, any>): any;


    loadMore?(): void;

}


const ActionMenu: React.FC<{
    actions: ActionSpec[];
    row: Record<string, any>

}> = ({
    actions, row
}) => {
        const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
        const handleClick = (event: React.MouseEvent<HTMLElement>) => {
            setAnchorEl(event.currentTarget);
        };
        const handleClose = (actionClick?: any) => {
            setAnchorEl(null);
            if (actionClick) {
                actionClick(row);
            }
        };
        return (
            <StyledActionMenuContainer>
                <div
                    onClick={handleClick}
                    style={{
                        cursor: 'pointer'
                    }}
                >
                    <MoreHorizIcon
                        style={{
                            color: brand.textColourLight
                        }}
                    />
                </div>

                <Menu
                    disableAutoFocusItem
                    anchorEl={anchorEl}
                    open={!!anchorEl}
                    onClose={() => handleClose()}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                >
                    {actions
                        .filter((action) => action?.renderAction ? action?.renderAction(row) : true)
                        .map((action) => (
                            <MenuItem
                                key={action.id}
                                onClick={() => handleClose(action.onClick)}
                            >
                                <Typography variant="body2">
                                    {action.label}
                                </Typography>
                            </MenuItem>
                        ))}
                </Menu>
            </StyledActionMenuContainer>
        )
    }



const AnyhowTable: React.FC<TableProps> = ({
    data, specs, metadata, disableSorting, loadMoreCta, actions, emptyMessage,
    updateFilters, renderColumn, getId, loadMore
}) => {

    const shouldRenderColumn = (column: string): boolean => !renderColumn || renderColumn(column);

    const hasActions = () => (actions && actions?.length > 0);

    const getRowId = (row: Record<string, any>) => (getId ? getId(row) : row.id);

    const titles = () => {
        const updatePagination = updateFilters || (() => undefined);

        const clickTitle = (spec: TableSpec) => {
            if (metadata && (!disableSorting || !disableSorting.includes(spec.id))) {
                const toggleOrder = metadata.order === spec.id;
                const newDirection = toggleOrder && metadata.direction === 'asc' ? 'desc' : 'asc';
                updatePagination({
                    order: spec.id,
                    direction: newDirection,
                });
            }
        };

        return specs.filter((spec) => shouldRenderColumn(spec.id)).map(
            (spec) => {
                const canSort = !disableSorting || !disableSorting.includes(spec.id);
                const showIcon = metadata && canSort
                return (
                    <StyledTableCell
                        key={spec.label || `_id_${spec.id}`}
                        isHeading
                        clickable={canSort}
                        onClick={() => clickTitle(spec)}
                    >
                        <StyledCellContainer>
                            {spec.label || ''}
                            {showIcon && (
                                <>
                                    {(metadata?.direction === 'desc' && metadata?.order === spec.id) ? (
                                        <ArrowUpwardIcon
                                            fontSize='medium'
                                            style={{ color: colors.grey }}
                                        />

                                    ) : (
                                        <ArrowDownwardIcon
                                            fontSize='medium'
                                            style={{ color: colors.grey }}
                                        />
                                    )}
                                </>
                            )}
                        </StyledCellContainer>
                    </StyledTableCell>
                );
            },
        ).concat(hasActions() ? [
            <StyledTableCell isHeading centerAlign>
                {messages.general.action}
            </StyledTableCell>
        ] : []);
    };

    const fields = () => {
        let immutableData = [...data];
        specs.forEach((spec) => {
            if (spec.getValue) {
                immutableData = immutableData.map(
                    (row: Record<string, any>) => ({
                        ...row,
                        [spec.id]: (spec.getValue && spec.getValue(row)),
                    }),
                );
            }
        });
        Object.freeze(immutableData);


        return immutableData.map((row: Record<string, any>) => (
            <StyledTableRow key={getRowId(row)}>
                {
                    specs.filter((spec) => shouldRenderColumn(spec.id)).map(
                        (field) => {
                            const formatter = (param: any) => (field.format
                                ? field.format(param) : formatStr(param));
                            return (
                                <StyledTableCell key={`${field.label}@${field.id}`}>
                                    {formatter(row[field.id])}
                                </StyledTableCell>
                            );
                        }
                    )
                }
                {hasActions() && (
                    <StyledTableCell key={"actionButtons"} centerAlign>
                        <ActionMenu
                            actions={actions}
                            row={row}
                        />
                    </StyledTableCell>
                )}
            </StyledTableRow>
        ));
    };

    return (
        <StyledTableContainer>
            <StyledTable>
                <StyledTableHead>
                    <StyledTableRow isHeading>
                        {titles()}
                    </StyledTableRow>
                </StyledTableHead>
                <StyledTableBody>
                    {[fields()]}
                </StyledTableBody>
            </StyledTable>
            {data.length === 0 && (
                <StyledNoDataInfoContainer>
                    <StyledNoDataInfo variant="body1">
                        {emptyMessage || messages?.general?.noData}
                    </StyledNoDataInfo>
                </StyledNoDataInfoContainer>
            )}
            {(metadata && metadata?.total > data.length) && (
                <StyledLoadmoreContainer>
                    <StyledLoadmoreCta
                        variant="body2"
                        onClick={loadMore}
                    >
                        {loadMoreCta || messages.general.showMore}
                    </StyledLoadmoreCta>
                </StyledLoadmoreContainer>
            )}
        </StyledTableContainer>
    );
};

export default React.memo(AnyhowTable);