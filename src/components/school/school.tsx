import React from 'react';
import { Review } from '../review/review';
import * as H from 'history';

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

export class School extends React.Component<any, SchoolState>{
    public constructor(props: any) {
        super(props);   
        this.state = {
            school: null
        };
    }

    public componentWillMount() {
        (async () => {
            const data = await getSchoolById(this.props.match.params.id);
            this.setState({ school: data });

        })();
    }



    render() {
        if (this.state.school === null) {
            return <div>loading...</div>
        } else {

            // COUNT FUNCTION
            const count = this.state.school.reviews.filter(review => review.recommendation === 1);
            const recommendationCount = count.length;

            return <div>

                <div className="questionnaire">
                    <div className="grid2">
                        <div>
                            <h1 className="schoolName">{this.state.school.schoolName}</h1>
                            <a href={this.state.school.website}><p>{this.state.school.website}</p></a><br />
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <p style={{ textAlign: "right"}}>Total reviews: X</p>
                            <p style={{textAlign: "right"}}>School verified reviews: X</p>
                            <p style={{textAlign: "right"}}>reviewable verified reviews: X</p><br />
                        </div>
                    </div>

                    {/*
                        CONDITIONAL RENDERING: 1 = Student / 0 or 2+ = students
                    */}
                    <br/>
                    <p style={{fontSize: "32px", textAlign: "center" }}>{recommendationCount} {recommendationCount === 1 ? "student recommends" : "students recommend"} this school</p>

                    <button onClick={() => { alert("TO DO") }}>Leave a review</button>

                </div>
                <h1 className="center">Reviews</h1>
                <div className="reviewCardList">


                    <Review
                        items={
                            this.state.school.reviews.reverse().map((reviews) => {

                                // CONDITIONAL RENDERING
                                return <div>
                                    <p ><strong>{reviews.reviewerName}</strong> {reviews.recommendation === 1 ? "recommends " : "does not recommend "}
                                    {this.props.schoolId}</p>
                                    <p style={{}}>Review verified by {this.props.schoolId}</p>
                                    <p style={{}}>{reviews.time}</p><br />

                                    <p style={{ fontSize: 32 }}>{reviews.comment}</p><br/>
                                    <div>
                                       
                                    <p style={{}}>teacher: {reviews.teacher}<br /></p>
                                    <p style={{}}>facilities: {reviews.facilities}<br /></p>
                                    <p style={{}}>staff: {reviews.staff}<br /></p>
                                    </div>
                                </div>
                            })
                        }
                    />
                </div>
            </div>

        }
    }
}

async function getSchoolById(id: number) {
    const response = await fetch(`/schools/${id}`);
    const json = await response.json();
    return json as SchoolItem;
};