import React from 'react';
import logo from '../../images/reviewable_brand.png';

interface HeaderProps {   
}

interface HeaderState { }

export class Header extends React.Component<HeaderProps, HeaderState> {

    render() {
        return <div className='header'>
            <a href="/"><img src={logo} height='18px;'/></a>
        </div>
    }
}
