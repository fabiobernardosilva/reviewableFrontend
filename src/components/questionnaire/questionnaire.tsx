import React from 'react';
import { Question } from "../question/question";
import * as joi from "joi";
import * as H from 'history';
import { Header } from '../header/header';
import { withRouter } from 'react-router-dom';


const identificationJoiSchema = {
    /* this validate the email input, the line minDomainAtoms: 2 makes sure
    that after the @ symbol the user needs to include another email sufix like .com or .co.uk (min: 2 after the @)*/
    reviewerName: joi.string().required().label("Full name").error(errors => {
        errors.forEach(err=>{
            switch (err.type){
                case "any.empty": err.message = "Full name is required";
                break;
            }
        });
        return errors;
    }),
    email: joi.string().email({ minDomainAtoms: 2 }).required().label("Email address").error(errors => {
        errors.forEach(err=>{
            switch (err.type){
                case "any.empty": err.message = "Email is required";
                break;
                case "string.email": err.message = "Please enter a valid email address"
            }
        });
        return errors;
    }),
    dOB: joi.date().required().label("Date of birth").error(errors => {
        errors.forEach(err=>{
            switch (err.type){
                case "date.base": err.message = "Please enter a valid date";
                break;
            }
        });
        return errors;
    })
};

const reviewJoiSchema = {
    teacher: joi.number().min(1).max(5).required().label("Teacher").error(errors => {
        errors.forEach(err=>{
            switch (err.type){
                case "number.min": err.message = "Please select an option for 'Teacher'";
                break;
            }
        });
        return errors;
    }),
    facilities: joi.number().min(1).max(5).required().label("Facilities").error(errors => {
        errors.forEach(err=>{
            switch (err.type){
                case "number.min": err.message = "Please select an option for 'Facilities'";
                break;
            }
        });
        return errors;
    }),
    staff: joi.number().min(1).max(5).required().label("Staff").error(errors => {
        errors.forEach(err=>{
            switch (err.type){
                case "number.min": err.message = "Please select an option for 'Staff'";
                break;
            }
        });
        return errors;
    }),
    recommendation: joi.number().min(0).max(1).required().label("Recommendation").error(errors => {
        errors.forEach(err=>{
            switch (err.type){
                case "number.min": err.message = "Please select an option for 'Recommendation'";
                break;
            }
        });
        return errors;
    })

};

interface QuestionnaireProps {
    school: string;
   //history?: H.History;
}

interface QuestionnaireState {
    firstPartComplete: boolean;
    questionOne: number;
    questionTwo: number;
    questionThree: number;
    recommendation: number;
    comment: string;
    reviewerName: string;
    email: string;
    dOB: string;
}   

export class QuestionnaireInternal extends React.Component<any, QuestionnaireState>{
    
    public constructor(props: any) {
        super(props);
        this.state = {
            firstPartComplete: false,
            questionOne: 0,
            questionTwo: 0,
            questionThree: 0,
            recommendation: -1,
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

            /*"Take into account things like: How well does the instructor
            teach? How knowledgeable is your instructor? How clearly
            does he/she explain the course material? How concerned
            he/she was that students were learning the material? How
            organised and prepared he/she is for the classes? How well
            does your instructor answer students’ questions?"
            */

            return <div>
                <Header/>
            <div className='content'>
            {/* <div className="backgroundImage"> */}
            <div className='questionnaire'>
                            

                <form>
                    <h1>Review {this.props.match.params.id}</h1>
                    <p style={{ fontSize: '24px' }}>Use the questionnaire below to evaluate your experience at <strong>{this.props.school}</strong>. You can optionally choose to leave a comment to complement your review! 
                    </p>
                    <br/>

                    <Question numberOfOptions={5} selectedValue={this.state.questionOne} onChange={(val) => this.setState({ questionOne: val })} school={this.props.school} questionTitle="Evaluate the teacher at" questionDescription="How well does the instructor
            teach? How knowledgeable is your instructor?" radioName="teacher"> </Question>

                    <Question numberOfOptions={5} selectedValue={this.state.questionTwo} onChange={(val) => this.setState({ questionTwo: val })} school={this.props.school} questionTitle="Evaluate the facilities at" questionDescription="How well-maintained are the school facilities?" radioName="facilities"> </Question>

                    <Question numberOfOptions={5} selectedValue={this.state.questionThree} onChange={(val) => this.setState({ questionThree: val })} school={this.props.school} questionTitle="Evaluate the staff at" questionDescription="How helpful and friendly was the staff? How easy is to obtain
                    resources you need?" radioName="staff"> </Question>

                    <Question numberOfOptions={2} selectedValue={this.state.recommendation} onChange={(val) => this.setState({ recommendation: val })} school={this.props.school} questionTitle="Do you recommend"  radioName="recommendation"> </Question>
                    
                    <br />
                    <h3>Would you like to leave a comment?</h3>
                    <p>Comments are optional.
                    Please read <a onClick={() => {}} href=''>reviewable code of conduct</a>. You have 512 characters left.</p>
                    
                    <textarea onKeyUp={(e) => this.updateComment((e as any).target.value)}>
                        
                    </textarea>

                    <br/>
                    <h2 style={{textAlign: "center"}}>
                    {this.renderReviewValidationErrors()}
                    </h2>

                    
             
                   
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
                    <br/>
                    <h2 style={{textAlign: "center"}}>
                    {this.renderIdentificationValidationErrors()}
                    </h2>
                      
                </form>
            </div>
            </div>
            </div>
            {/* </div> */}
        }
    }   

    private renderReviewValidationErrors() {
        const validationResult = joi.validate({
            teacher: this.state.questionOne,
            facilities: this.state.questionTwo,
            staff: this.state.questionThree,
            recommendation: this.state.recommendation
        }, reviewJoiSchema);

        if (validationResult.error) {
            return <div style={{color: "#ff4a4a"}}>
                <br/>
                {validationResult.error.details.map(d => <div>{d.message}</div>)
                 }<br/>
            </div>;
        } else {
            return <button onClick={() => {alert(this.state.comment)}}>Continue</button>;
        }
    }

    private handleSubmit() {
        try {
            createReview(
                this.state.reviewerName,
                this.state.email,
                this.state.dOB,
                
                this.state.recommendation,
                this.state.questionOne,
                this.state.questionTwo,
                this.state.questionThree,
                this.state.comment,

                // ?
                // this is the school id that must be passed as props
                this.props.match.params.id,
                

                // verification of the review, always set to -1 when a review is created
                -1,

                // post status of review: set to null until verified and posted
                -1
                );
                //alert(JSON.stringify(data));
        
        }catch(err){
            console.log(err);
            //alert(JSON.stringify(err)
        }
    }

    private renderIdentificationValidationErrors() {
        const validationResult = joi.validate({
            reviewerName: this.state.reviewerName,
            email: this.state.email,
            dOB: this.state.dOB
        }, identificationJoiSchema);

        if (validationResult.error) {
            return <div style={{color: "#ff4a4a"}}>
            <br/>
            {validationResult.error.details.map(d => <div>{d.message}</div>)}
            </div>;
        } else {
            return <button onClick={()=>{
                this.handleSubmit()
            }}
                
                /*async () => { 
                        
            const data = await createReview(
                this.state.reviewerName,
                this.state.email,
                this.state.dOB,
                
                this.state.recommendation,
                this.state.questionOne,
                this.state.questionTwo,
                this.state.questionThree,
                this.state.comment,

                // this is the school id that must be passed as props
                1,

                // verification of the review, always set to -1 when a review is created
                -1,

                // post status of review: set to null until verified and posted
                -1
                );
                alert(JSON.stringify(data));

                // NOW I NEED TO REDIRECT IT TO THE SUCCESS PAGE
                // this.props.history.push("/success");
            
            }}*/
        
            >Leave review</button> ;
        }
    }

}

export const Questionnaire = withRouter(props => <QuestionnaireInternal {...props} />);


async function createReview(
    reviewerName: string, //this is the reviewer name
    email: string,
    dOB: string,

    recommendation: number,
    teacher: number,
    facilities: number,
    staff: number,
    comment: string,
    schoolSchoolId: number,

    verificationStatus: number,
    postStatus: number 
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
        schoolSchoolId: schoolSchoolId,
        verificationStatus: verificationStatus,
        postStatus: postStatus
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