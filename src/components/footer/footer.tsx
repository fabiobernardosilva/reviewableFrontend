import React from 'react';
import logo from '../../images/reviewable_logo.png';

interface FooterProps { }

interface FooterState { }

export class Footer extends React.Component<FooterProps, FooterState>{
    render() {
        return <div className='footer'>
            <img src={logo} height='18px;'></img>
            <h4 style={{ color: 'white' }}>A project for MEI • Marketing English in Ireland</h4>
            
            <h4 style={{ color: 'white', textAlign: 'right' }}>reviewable</h4>
            <p style={{ color: 'white', textAlign: 'right' }}>About</p>
            <p style={{ color: 'white', textAlign: 'right' }}>Terms &amp; Conditions</p>
            <p style={{ color: 'white', textAlign: 'right' }}>Privacy Policy</p>
            <p style={{ color: 'white' }}>&copy; 2019 reviewable</p>
        </div>
    }
}