import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Questionnaire } from './components/questionnaire/questionnaire';
//import { Identification } from './components/identification/identification';
import { Success } from './components/success/success'
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

const school = "ABCD English";
const questionnaireIdentificationPage =
    <div>
        <Header />
        <div className='content'>
            <Questionnaire school={school}/>
            </div>
        <Footer />
    </div>;


const successPage =
    <div>
        <Header />
        <div className='content'>
            <Success school={school}></Success>
        </div>
        <Footer />
    </div>
    
ReactDOM.render(
    <div>{questionnaireIdentificationPage}
    
   {successPage}</div>
   
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
