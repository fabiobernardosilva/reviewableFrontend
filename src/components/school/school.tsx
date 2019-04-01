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
    reviews: SchoolItem | null;
}

export class School extends React.Component<SchoolProps, SchoolState>{
    public constructor(props: SchoolProps) {
        super(props);
        this.state = {
            reviews: null
        };
    }

    public componentDidMount() {
        (async () => {
            const data = await getSchoolById(this.props.schoolId);
            //const jsonData = JSON.stringify(data);
            //this.setState({ reviews: data });
            alert(JSON.stringify(await getSchoolById(this.props.schoolId)))
            
        })();
    }

    render() {

        
        return <div>
            <div className="questionnaire">
            <h1>School ID:{this.props.schoolId}</h1>
            <h1>School Name: {JSON.stringify(this.state.reviews)}</h1>
            <h4>Website</h4>

            <h3>Total reviews</h3>
            <h3>Accepted reviews</h3>
            <h3>reviewable verified reviews</h3>
            <h2>X people recommend this school</h2>
            <button onClick={()=>{alert(JSON.stringify(this.state.reviews))}}>Leave a review</button>


            

            </div>
        </div>

        

        

        

    }



}

async function getSchoolById(id: number) {
    const response = await fetch(`/schools/${id}`);
    const json = await response.json();
    return json as SchoolItem;
};