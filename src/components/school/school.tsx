import React from 'react';
import { Review } from '../review/review';
import * as H from 'history';
import { Header } from '../header/header';
import { withRouter } from 'react-router-dom';

interface ReviewItem {
    reviewId: number;
    reviewerName: string;
    email: string;
    dOB: string;
    recommendation: number;
    teacher: number;
    facilities: number;
    staff: number;
    comment: string;
    time: Date;
}

interface SchoolItem {
    schoolId: number;
    schoolName: string;
    website: string;
    reviews: ReviewItem[];
}

interface SchoolProps {
    schoolId: number;
}

interface SchoolState {
    //reviews: ReviewItem[] | null;
    school: SchoolItem | null;
    
    
}

export class SchoolInternal extends React.Component<any, SchoolState>{
    public constructor(props: any) {
        super(props);   
        this.state = {
            school: null
        };
    }

    public componentDidMount() {
        (async () => {
            const data = await getSchoolById(this.props.match.params.id);
            this.setState({ school: data });

           

        })();
    }

    private handleSubmit(id: number) {
        this.props.history.push(`/review/${id}`)
    }

    render() {
        
        if (this.state.school === null) {
            return <div>
                <Header/>
            <div className='content'>
                <h1 style={{textAlign: "center"}}>Loading...</h1>
                </div>
                </div>
        } else {

            // COUNT FUNCTION
            const count = this.state.school.reviews.filter(review => review.recommendation === 1);
            const recommendationCount = count.length;

            const totalCount = this.state.school.reviews.filter(review => review !== null);
            const totalReviewCount = totalCount.length;

            return <div>
                <Header/>
                <div className='content'>
                {/* <div className="backgroundImage"> */}
                <div className="questionnaire">
                    <div className="grid2">
                        <div>
                            <h1 className="schoolName">{this.state.school.schoolName}</h1>
                            <a href={this.state.school.website}>{this.state.school.website}</a><br />
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <p style={{ textAlign: "right"}}>Total reviews: <strong>{totalReviewCount}</strong></p><br/>
                            <p style={{ textAlign: "right"}}>School verified: <strong>{totalReviewCount}</strong></p>
                            <p style={{ textAlign: "right"}}><strong></strong>reviewable verified: <strong>0</strong></p>
                        </div>
                    </div>

                    {/*
                        CONDITIONAL RENDERING: 1 = Student / 0 or 2+ = students
                    */}
                    
                    <p style={{fontSize: "32px", margin: "30px 0px", textAlign: "center" }}><strong>{recommendationCount}</strong> {recommendationCount === 1 ? "student recommends" : "students recommend"} this school</p>

                    <p style={{textAlign: "center", marginBottom: "-35px"}}>Did you study here?</p>
                    <button onClick={() => { this.handleSubmit(this.props.match.params.id) }}>Leave a review</button>

                </div>
                <h2 style={{}} className="center">Reviews for {this.state.school.schoolName}</h2>
                <div className="reviewCardList">


                    <Review
                        items={
                            this.state.school.reviews.reverse().map((reviews) => {

                                let teacherStyle = "style".concat(reviews.teacher.toString());
                                let facilitiesStyle = "style".concat(reviews.facilities.toString());
                                let staffStyle = "style".concat(reviews.staff.toString());

                                (async()=>{
                                   let school =  await getSchoolById(this.props.match.params.id);
                                })();
                               
                                

                                // CONDITIONAL RENDERING
                                return <div>
                                    <div className="grid2">
                                    <div>
                                    <p className={reviews.recommendation === 1 ? "style5 " : "style1"}><strong>{reviews.reviewerName}</strong> {reviews.recommendation === 1 ? "recommends " : "does not recommend "}
                                    {this.props.match.params.id}</p>
                                    <p style={{}}>Review verified by {this.props.match.params.id}</p>
                                    </div>
                                    <div>
                                    <p style={{textAlign: "right"}}>{reviews.time.toString().slice(0,-14)}</p>
                                    </div>
                                    </div>

                                    <p style={{ fontSize: 32, margin: "30px 0px"}}>{reviews.comment}</p>
                                    <div className="grid3">
                                        
                                    <p style={{textAlign: "left"}}>teacher: <span style={{fontSize: "28px"}}className={teacherStyle}><strong>{reviews.teacher}</strong></span><br /></p>
                                    <p style={{textAlign: "center"}}>facilities: <span style={{fontSize: "28px"}}className={facilitiesStyle}><strong>{reviews.facilities}</strong></span><br /></p>
                                    <p  style={{textAlign: "right"}}>staff: <span style={{fontSize: "28px"}} className={staffStyle}><strong>{reviews.staff}</strong></span><br /></p>
                                    </div>
                                </div>
                            })
                        }
                    />
                </div>
            </div>
            </div>
            // </div>

        }
    }
}

export const School = withRouter(props => <SchoolInternal {...props} />);

async function getSchoolById(id: number) {
    const response = await fetch(`/schools/${id}`);
    const json = await response.json();
    return json as SchoolItem;
};