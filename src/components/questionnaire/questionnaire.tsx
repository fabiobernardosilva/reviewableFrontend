import React from 'react';
import { Question } from "../question/question";
import * as joi from "joi";

const identificationJoiSchema = {
    /* this validate the email input, the line minDomainAtoms: 2 makes sure
    that after the @ symbol the user needs to include another email sufix like .com or .co.uk (min: 2 after the @)*/
    reviewerName: joi.string().required().label("Full name"),
    email: joi.string().email({ minDomainAtoms: 2 }).required().label("Email address"),
    dOB: joi.date().required().label("Date of birth")

};

interface QuestionnaireProps {
    school: string;
}

interface QuestionnaireState {
    firstPartComplete: boolean;
    questionOne: number;
    questionTwo: number;
    questionThree: number;
    recommendation: boolean;
    comment: string;
    reviewerName: string;
    email: string;
    dOB: string;
}

export class Questionnaire extends React.Component<QuestionnaireProps, QuestionnaireState>{
    public constructor(props: QuestionnaireProps) {
        super(props);
        this.state = {
            firstPartComplete: false,
            questionOne: 0,
            questionTwo: 0,
            questionThree: 0,
            recommendation: false,
            comment: "",
            reviewerName: "",
            email: "",
            dOB: ""
        };
    }

    private updateComment(comment: string) {
        this.setState({ comment: comment });
    }

    private updateReviewerName(reviewerName: string) {
        this.setState({ reviewerName: reviewerName});
    }

    private updateEmail(email: string) {
        this.setState({ email: email});
    }

    private updateDOB(dOB: string) {
        this.setState({ dOB: dOB});
    }

    render() {
        if(this.state.firstPartComplete === false){
            return <div className='questionnaire'>
                            

                <form>
                    <h1>Review {this.props.school}</h1>
                    <p style={{ fontSize: '24px' }}>This is the questionnarie for reviewing {this.props.school}.
                    <strong><span style={{ color: 'red' }}>*</span></strong>required</p>
                    <br/>

                    <Question selectedValue={this.state.questionOne} onChange={(val) => this.setState({ questionOne: val })} school={this.props.school} questionTitle="Evaluate the teacher at" questionDescription="Take into account things like: How well does the instructor
                    teach? How knowledgeable is your instructor? How clearly
                    does he/she explain the course material? How concerned
                    he/she was that students were learning the material? How
                    organised and prepared he/she is for the classes? How well
                    does your instructor answer students’ questions?" radioName="teacher"> </Question>

                    <Question selectedValue={this.state.questionTwo} onChange={(val) => this.setState({ questionTwo: val })} school={this.props.school} questionTitle="Evaluate the facilities at" questionDescription="How well-maintained are the school facilities?" radioName="facilities"> </Question>

                    <Question selectedValue={this.state.questionThree} onChange={(val) => this.setState({ questionThree: val })} school={this.props.school} questionTitle="Evaluate the staff at" questionDescription="How helpful and friendly was the staff? How easy is to obtain
                    resources you need?" radioName="staff"> </Question>

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
                    <textarea onKeyUp={(e) => this.updateComment((e as any).target.value)}>
                        
                    </textarea>
                    <button onClick={() => {alert(this.state.comment)}}>Continue</button>
             
                   
                    <h1>Finally...</h1>
                    <p style={{ fontSize: '24px' }}>reviewable needs your information to verify your identity with
                    <strong> {this.props.school}</strong> against the data they know of you as a
                    student when your enrolled, just to prove you are you.</p><br />
                    <p>This is the normal reviewing process here and no information of yours
                    will ever be sold to any third parties. reviewable will email you after your the reviewing process is
                    complete and should your review is not accepted in time by the school, you will be given a chance to verify your identity
                    with reviewable later and have your review published.<br />
                    <strong><span style={{ color: 'red' }}>*</span></strong>required</p>
                    <br />

                    <h3>Full name<span style={{ color: 'red' }}>*</span></h3>
                    <input type='text' onKeyUp={(e) => this.updateReviewerName((e as any).target.value)} placeholder=''></input>

                    <h3>Email address<span style={{ color: 'red' }}>*</span></h3>
                    <input type='email' onKeyUp={(e) => this.updateEmail((e as any).target.value)} placeholder=''></input>

                    <h3>Date of birth<span style={{ color: 'red' }}>*</span></h3>
                    <input type='date' onKeyUp={(e) => this.updateDOB((e as any).target.value)}placeholder=''></input>

                    <p><span className="checkbox"></span> I have read and accept reviewable's <a onClick={() => { alert('TO DO'); }} href=''>Terms and Conditions</a> and <a onClick={() => { alert('TO DO'); }} href=''>Privacy Policy</a>.</p>

                    <h2 style={{color: "red"}}>
                    {this.renderValidationErrors()}
                    </h2>
                    <button onClick={async () => { 
                        
                        const data = await createReview(
                            this.state.reviewerName,
                            this.state.email,
                            this.state.dOB,
                            true,
                            this.state.questionOne.toString(),
                            this.state.questionTwo.toString(),
                            this.state.questionThree.toString(),
                            this.state.comment,
                            1
                        );
                        alert(JSON.stringify(data));
                        
                    }}>Leave review</button>   
   </form>
   </div>
}
}

private renderValidationErrors() {
    const validationResult = joi.validate({
        reviewerName: this.state.reviewerName,
        email: this.state.email,
        dOB: this.state.dOB
    }, identificationJoiSchema);

    if (validationResult.error) {
        return <div>
            {validationResult.error.details.map(d => <div>{d.message}</div>)}
        </div>;
    } else {
        return <div>OK!</div>;
    }
}

}


async function createReview(
    reviewerName: string, //this is the reviewer name
    email: string,
    dOB: string,
    recommendation: boolean,
    teacher: string,
    facilities: string,
    staff: string,
    comment: string,
    schoolSchoolId: number
    )
    {
        const data = {
        reviewerName: reviewerName,
        email: email,
        dOB: dOB,
        recommendation: recommendation,
        teacher: teacher,
        facilities: facilities,
        staff: staff,
        comment: comment,
        schoolSchoolId: schoolSchoolId
    };
    
    const response = await fetch("/reviews",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );
    const json = await response.json();
    return json;
};