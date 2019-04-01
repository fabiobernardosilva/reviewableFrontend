import React from 'react';
import { Question } from "../question/question";

interface QuestionnaireProps {
    school: string;
}

//test
interface QuestionnaireState {
    firstPartComplete: boolean;
    selectedValue: number;
    questionOne: number;
}

export class
    Questionnaire extends React.Component<QuestionnaireProps, QuestionnaireState>{
    public constructor(props: QuestionnaireProps) {
        super(props);
        this.state = {
            firstPartComplete: false,
            selectedValue: 0,
            questionOne: 0
        };
    }

    /*
    public getValue(){
        if(this.state.selectedValue === 0 ){
            this.setState({selectedValue: 5});
        }        
    }
*/

    /*
    NEW
    
    <Question selectedValue={this.state.questionOne} onChange={(val) => this.setState({ questionOne: val})} school={this.props.school} questionTitle="Evaluate the facilities at" questionDescription="How well-maintained are the school facilities?" radioName="teacher"> </Question>
                <Question selectedValue={this.state.questionOne} onChange={(val) => this.setState({ questionOne: val})} school={this.props.school} questionTitle="Evaluate the facilities at" questionDescription="How well-maintained are the school facilities?" radioName="facilities"> </Question>
                <Question selectedValue={this.state.questionOne} onChange={(val) => this.setState({ questionOne: val})} school={this.props.school} questionTitle="Evaluate the facilities at" questionDescription="How well-maintained are the school facilities?" radioName="staff"> </Question>
    
    */


    /*
    
    OLD
    
    <Question school={this.props.school} questionTitle="Evaluate your English teacher(s) at" questionDescription="Take into account things like: How well does the instructor
        teach? How knowledgeable is your instructor? How clearly
        does he/she explain the course material? How concerned
        he/she was that students were learning the material? How
        organised and prepared he/she is for the classes? How well
    does your instructor answer students questions?" radioName="teacher"> </Question>
                    <br/>
                    <Question selectedValue={this.state.questionOne} onChange={(val) => this.setState({ questionOne: val})} school={this.props.school} questionTitle="Evaluate the facilities at" questionDescription="How well-maintained are the school facilities?" radioName="facilities"> </Question>
                    <br/>
                    <Question school={this.props.school} questionTitle="Evaluate the staff at" questionDescription="How helpful and friendly was the staff? How easy is to obtain resources you need?" radioName="staff"> </Question>
                    <br/>
    
    */



    render() {
        return <div>
            <div className='questionnaire'>
                <form>
                    <h1>Review {this.props.school}</h1>
                    <p style={{ fontSize: '24px' }}>This is the questionnarie for reviewing {this.props.school}.
            <strong><span style={{ color: 'red' }}>*</span></strong>required</p>
                    <br />
                    <Question selectedValue={this.state.questionOne} onChange={(val) => this.setState({ questionOne: val })} school={this.props.school} questionTitle="Evaluate the facilities at" questionDescription="How well-maintained are the school facilities?" radioName="teacher"> </Question>
                    <Question selectedValue={this.state.questionOne} onChange={(val) => this.setState({ questionOne: val })} school={this.props.school} questionTitle="Evaluate the facilities at" questionDescription="How well-maintained are the school facilities?" radioName="facilities"> </Question>
                    <Question selectedValue={this.state.questionOne} onChange={(val) => this.setState({ questionOne: val })} school={this.props.school} questionTitle="Evaluate the facilities at" questionDescription="How well-maintained are the school facilities?" radioName="staff"> </Question>
                    <h3>Do you recommend {this.props.school}?<span style={{ color: 'red' }}>*</span></h3>
                    <div className='grid2'>
                        <label className="gridContainer">Yes
                        <input type="radio" name="recommendation" />
                            <span className="dot" id='recommendation'></span>
                        </label>
                        <label className="gridContainer">No
                        <input type="radio" name="recommendation" />
                            <span className="dot" id='recommendation'></span>
                        </label>
                    </div>
                    <br />
                    <h3>Would you like to leave a comment?</h3>
                    <p>Comments are optional.
                Please read <a onClick={() => { alert('DISPLAY CODE OF CONDUCT: TO DO'); }} href=''>reviewable code of conduct</a>. You have 512 characters left.</p>
                    <textarea></textarea>
                    <button onClick={() => { alert('TO DO'); }}>Continue</button>


                    <h1>Finally...</h1>
                    <p style={{ fontSize: '24px' }}>reviewable needs your informatio    n to verify your identity with
             <strong> {this.props.school}</strong> against the data they know of you as a
    student when your enrolled, just to prove you are you.</p><br />
                    <p>This is
                    the normal reviewing process here and no information of yours
                    will ever be sold to any third parties. reviewable will email you after your the reviewing process is
                    complete and should your review is not accepted in time by
                    the school, you will be given a chance to verify your identity
with reviewable later and have your review published.<br />
                        <strong><span style={{ color: 'red' }}>*</span></strong>required</p>
                    <br />
                    <h3>Full name<span style={{ color: 'red' }}>*</span></h3>
                    <input type='text' placeholder=''></input>
                    <h3>Email address<span style={{ color: 'red' }}>*</span></h3>
                    <input type='email' placeholder=''></input>
                    <h3>Date of birth<span style={{ color: 'red' }}>*</span></h3>
                    <input type='date' placeholder=''></input>

                    <p><span className="checkbox"></span> I have read and accept reviewable's <a onClick={() => { alert('TO DO'); }} href=''>Terms and Conditions</a> and <a onClick={() => { alert('TO DO'); }} href=''>Privacy Policy</a>.</p>

                    <button onClick={async () => { 
                        const data = await getAllReviews();
                        alert(JSON.stringify(data)); 
                    }}>Calling function</button>

                </form>
            </div>
        </div>

        async function getAllReviews() {
            const response = await fetch("/reviews");
            const json = await response.json();
            return json;
        };

      
    }

}