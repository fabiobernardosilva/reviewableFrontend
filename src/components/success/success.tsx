import React from 'react';
import facebookLogo  from '../../facebook_logo.svg';
import twitterLogo from '../../twitter_logo.svg';


interface SuccessProps {
    school: string;
}

interface SuccessState {
}

export class Success extends React.Component<SuccessProps, SuccessState> {

render(){
    return <div className = 'success'>
    <h1 className='center'>Success!</h1>
    <p className='center'>Thank you for taking part into making the International
Language Market more transparent! Your review is under
revision by {this.props.school} and you will be contacted by
email once your review is accepted.</p>
<h3 className='center'>Spread the word!</h3>
<div className='centerDiv'>
<a href='https://facebook.com'><img src={facebookLogo} height='50px'/></a>
<a href='https://twitter.com'><img src={twitterLogo} height='50px;'/></a>
</div>


    </div>
}

}