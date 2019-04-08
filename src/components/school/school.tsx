import React from 'react';
import { Review } from '../review/review';

interface ReviewItem {
    reviewId: number;
    reviewerName: string;
    email: string;
    dOB: string;
    recommendation: boolean;
    teacher: string;
    facilities: string;
    staff: string;
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

export class School extends React.Component<SchoolProps, SchoolState>{
    public constructor(props: SchoolProps) {
        super(props);
        this.state = {
            school: null
        };
    }

    public componentDidMount() {
        (async () => {
            const data = await getSchoolById(this.props.schoolId);
            this.setState({ school: data });
        })();
    }

    render() {
        if (this.state.school === null) {
            return <div>loading...</div>
        } else {

            return <div>
                <div className="questionnaire">
                    <h1 className="center">{this.state.school.schoolName}</h1>
                    <a  href={this.state.school.website}><p className="center">{this.state.school.website}</p></a><br/>
                    <h4>Total reviews: X</h4>
                    <h4>School verified reviews: X</h4>
                    <h4>reviewable verified reviews: X</h4>
                    <h3>X students recommend this school</h3>
                    <button onClick={() => {alert("TO DO")}}>Leave a review</button>

                    
                </div>
                <h1 className="center">Reviews</h1>
                    <div className="reviewCardList">
                    <Review
                        items={
                            this.state.school.reviews.map((reviews) => {
                                return <div>
                                    Posted by <strong>{reviews.reviewerName}</strong> on {reviews.time}
                                    <p style={{ fontSize: 32 }}>{reviews.comment}</p>
                                    teacher: {reviews.teacher}<br />
                                    facilities: {reviews.facilities}<br />
                                    staff: {reviews.staff}<br />
                                    <br/>
                                    <p>Review verified by {this.props.schoolId}</p>
                                </div>;
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