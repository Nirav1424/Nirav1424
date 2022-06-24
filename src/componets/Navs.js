import React,{memo} from 'react';
import { useLocation } from 'react-router-dom';
import { NavList,LinkStyled } from './Navs.styled';

function Navs() {
    const location = useLocation();

    const LINKS = [
        { to: '/', text: 'Home' },
        { to: '/starred', text: 'starred' },

    ]

    return (
        <div>
            <NavList>
                {
                    LINKS.map(item => <li key={item.to}>
                        <LinkStyled to={item.to}
                        className={item.to === location.pathname ? 'active' : ''}>
                            {item.text}
                        </LinkStyled>
                    </li>)
                }

            </NavList>
        </div>
    )
}

export default memo(Navs);