import React from 'react';
import { Header } from '../components/header/header';

interface Page404Props {
    
}

interface Page404State {
}

export class Page404 extends React.Component<Page404Props, Page404State> {

    render() {
        return <div>
            <Header/>
            <div className='content'>
        <div className='success'>
            <h1 className='center'>Oops!</h1>
            <p className='center'>The page you are looking for doesn't exist!</p>
        </div>
        </div>
        </div>
    }
}