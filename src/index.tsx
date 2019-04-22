import React from 'react';
import ReactDOM from 'react-dom';

// CSS Stylesheet
import './index.css';

import * as serviceWorker from './serviceWorker';
// import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Questionnaire } from './components/questionnaire/questionnaire';
import { Success } from './components/success/success'
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { School } from './pages/school';
import { Search } from './pages/search';
import {Page404} from './components/Page404/Page404';

/*
const school = "ABCD English";
const questionnaireIdentificationPage =
    <div>
        <Header />
        <div className='content'>
            <Questionnaire school={school} />
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

ReactDOM.render(
    <div>{questionnaireIdentificationPage}
        {successPage}</div>
    , document.getElementById('root'));

    ReactDOM.render(
        <div>
            <Header />
            <div className='content'>
                <School schoolId={1}></School>
            </div>
            <Footer />
        </div>
        , document.getElementById('root'));
        */
       

ReactDOM.render(<BrowserRouter>
<div>
    {/* <Header/> */}
    {/* <div className="content"> */}
        {/*
         <Link to="/">Search</Link>
    <Link to="/school/1">School</Link>
    <Link to="/review">Review</Link>
    <Link to="/success">Success</Link>
        */}
<Switch>
    <Route exact path="/" component={Search}/>

    {/*
    <Route path="/review/:id" render={()=><Questionnaire school="CCT School"/>}/>
    <Route path="/success" render={()=><Success school="ABCD Dublin English"/>}/>
    <Route exact path="/schools/:id" render={() => <School schoolId={1}></School>}/>
    */}
    <Route path="/review/:id" component={Questionnaire}/>
    <Route path="/success" component={Success}/>
    <Route exact path="/schools/:id" component={School}/>
    <Route component={Page404} />
</Switch>
{/* </div> */}
<Footer/>
</div>
</BrowserRouter>
, document.getElementById('root'));




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
