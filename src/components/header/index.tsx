import React from 'react';
import {
    StyledContainer,
    StyledLogo,
    StyledLogoContainer,
    StyledLogoutContainer,
    StyledLogoutText,
    StyledNavContainer,
    StyledNavItem,
    StyledNavItemText
} from "./styles"
import { useDispatch } from 'react-redux';
import messages from '../../messages';
import { routes } from '../../utils';
import { useLocation } from 'react-router-dom';
import { push } from 'connected-react-router';
import { logout } from '../../redux/actions';


interface Props {

}

const navItems = [
    {
        key : 'Dashboard',
        label : 'Dashboard',
        route : routes.dasboard.root,
    },

    // Add sidebar menu items here
]

const Header: React.FC<Props> = ({

}) => {

    const reduxDispatch = useDispatch();
    const location = useLocation();

    return (
        <StyledContainer>
            <StyledLogoContainer>
                <StyledLogo src='/assets/images/logoSmall.png' />
            </StyledLogoContainer>
            <StyledNavContainer>
                {navItems.map((navItem)=>(
                    <StyledNavItem 
                        active={location.pathname.startsWith(navItem.route)} 
                        key={navItem?.key}
                        onClick={()=>reduxDispatch(push(navItem.route))}
                    >
                        <StyledNavItemText variant="body2">
                            {navItem?.label}
                        </StyledNavItemText>
                    </StyledNavItem>
                ))}
            </StyledNavContainer>
            <StyledLogoutContainer onClick={()=>reduxDispatch(push(routes.login))}>
                    <StyledLogoutText variant='body2'>Logout</StyledLogoutText>
            </StyledLogoutContainer>
        </StyledContainer>
    )
}

export default Header;