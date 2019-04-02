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
            //const jsonData = JSON.stringify(data);
            this.setState({ school: data });
            //alert(JSON.stringify(await getSchoolById(this.props.schoolId)))

        })();

        //(async()=>{await alert(this.state.reviews.schoolId)})();
    }

    render() {
        if (this.state.school === null) {
            return <div>loading...</div>
        } else {

            return <div>
                <div className="questionnaire">
                    <h1>{this.state.school.schoolName}</h1>
                    <a href={this.state.school.website}>{this.state.school.website}</a>

                    <h3>Reviews</h3>


                    <Review
                        items={
                            this.state.school.reviews.map((reviews) => {
                                return <div>
                                    {reviews.reviewerName}<br />
                                    {reviews.comment}<br />
                                    {reviews.teacher}<br />
                                    {reviews.facilities}<br />
                                    {reviews.staff}<br />
                                </div>;
                                <div>

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

async function getAllReviews() {
    const response = await fetch("/reviews");
    const json = await response.json();
    return json as ReviewItem[];
};