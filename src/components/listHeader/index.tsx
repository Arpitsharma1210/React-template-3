import React, { useState } from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { brand } from '../../theme/style.palette';
import {
    SearchCtaContainer,
    SearchInputContainer,
    StyledActionItem,
    StyledActionItemContainer,
    StyledContainer,
    StyledCtaText,
    StyledHeading,
    StyledHeadingContainer,
    StyledSearchClear,
    StyledSearchInput,
} from "./styles"
import messages from '../../messages';

const SearchInput:React.FC<any> = ({onChange,value, ...props})=>(
    <StyledSearchInput
        {...props}
        value={value || ''}
        onChange={(e)=>{
            if(onChange){
                onChange(e?.target?.value)
            }
        }}
    />
)


interface Props {
    heading: string;
    ctaLabel?: string;
    handleCtaClick?:()=>void;
    disableSearch?:boolean;
    connectFilter?:any;
    updateFilters?:any;
}

const ListHeader: React.FC<Props> = ({
    heading, ctaLabel, disableSearch, 
    connectFilter, updateFilters, handleCtaClick
}) => {
    const [searchVisible, setSearchVisible] = useState(false);
    return (
        <StyledContainer>
            <StyledHeadingContainer>
                <StyledHeading variant='h4'>{heading}</StyledHeading>
            </StyledHeadingContainer>
            <StyledActionItemContainer>
                {(!disableSearch && connectFilter) &&<StyledActionItem>
                    {searchVisible ? (<SearchInputContainer>
                        <SearchIcon
                            fontSize='medium'
                            style={{
                                padding: '8px 8px',
                                color: brand.textColourDark

                            }}
                        />
                         {connectFilter('search', {
                            autoApplyFilters: true,
                            autoFocus : true,
                            placeholder: messages.general.search,
                        })(SearchInput)}
                        <StyledSearchClear>
                            <CloseIcon
                                fontSize='small'
                                onClick={()=>{
                                    setSearchVisible(false);
                                    if(updateFilters){
                                        updateFilters({
                                            filters : {search : ''}
                                        });
                                    }
                                }}
                                style={{
                                    color: brand.textColourDark,
                                    cursor: 'pointer'

                                }}
                            />
                        </StyledSearchClear>
                    </SearchInputContainer>) : (
                        <SearchCtaContainer
                            onClick={()=>setSearchVisible(true)}
                        >
                            <SearchIcon
                                fontSize={'medium'}
                                style={{
                                    marginRight: 8,
                                    color: brand.textColourDark

                                }}
                            />
                            <StyledCtaText variant='body2'>{messages.general.search}</StyledCtaText>
                        </SearchCtaContainer>
                    )}
                </StyledActionItem>}
                {ctaLabel && <StyledActionItem lastItem>
                    <Button 
                        variant="outlined" 
                        startIcon={<AddIcon />}
                        sx={{margin:0}}
                        onClick={handleCtaClick}
                    >
                        {ctaLabel}
                    </Button>
                </StyledActionItem>}
            </StyledActionItemContainer>
        </StyledContainer>
    )
}

export default ListHeader;