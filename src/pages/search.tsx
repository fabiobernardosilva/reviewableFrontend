import React from 'react';
import * as H from 'history';
import { withRouter } from 'react-router-dom';
//import image from '../../students2.jpg'
import logo from '../images/reviewable_brand_positive.png';
// import { Header } from '../components/header/header';

interface School {
    schoolId: number;
    schoolName: string;
    website: string;
}

interface SearchProps {
    history: H.History;
}

interface SearchState {
    school: School[],
    selectValue: number,
    searchResult: School[]
}

export class SearchInternal extends React.Component<SearchProps, SearchState>{

    public constructor(props: SearchProps) {
        super(props);
        this.state = {
            school: [],
            selectValue: 0,
            searchResult: []
        }
    }

    public componentWillMount() {
        (async () => {
            const data = await getAllSchools();
            const JSONToString = JSON.stringify(data)
            this.setState({ school: data });
            //alert(JSONToString);
        })();
    }

    render() {
        if (this.state.school === null) {
            return <div>loading ...</div>
        } else {

            return <div>
                {/* className="content">*/}
                <div style={{ textAlign: "center" }} className='contentSearch'>

                    <div className="backgroundImage">

                        <div className="logoHome">

                            {/* style={{ marginBottom: "-63px" }}> */}
                            <img style={{ border: "0px solid green", margin: "0 auto 10px auto" }} src={logo} height='35px;' /><br />
                            <label><h3 style={{
                                //visibility: "hidden",
                                border: "0px solid green", fontWeight: "lighter", margin: "0 auto 15px auto"
                            }}>Verified reviews from real students</h3>
                            </label>
                        </div>
                        <div className="searchBarHome">

                            <input placeholder="Find your school here" style={{ paddingLeft: "25px", textAlign: "left" }} className="searchBar" onKeyUp={(e) => this.handleChange((e as any).target.value)} type="text"></input>
                            <div className="searchResults">
                                {this.state.searchResult.map((school) => {

                                    return <div style={{ opacity: 1, width: "90%", marginLeft: "auto", marginRight: "auto" }} onClick={() => { this.handleSubmit(school.schoolId) }}>
                                        <p style={{ fontSize: "28px", lineHeight: "40px" }}>{school.schoolName}  <span style={{ fontSize: "14px" }}> | {school.website}</span></p>
                                    </div>
                                })
                                }
                            </div>
                            {/* 
                        {this.renderResults()}
                        */}
                        </div>
                    </div>

                    <div >
                    {/*style={{ marginTop: "25%" }}>*/}
                        <h2 style={{ margin: "50px 0px", textAlign: "center" }}>How does reviewable work?</h2>
                        <div
                        // className="grid3"
                        >

                            <div className="floating" ><i style={{ marginBottom: "25px" }} className="fas fa-comment fa-lg" /><br />
                                <p style={{ textAlign: "left" }}>You review your school on reviewable, assessing your teacher, facilities and the staff and can also leave an in-depth comment of your experience.</p></div>

                            <div className="floating" ><i style={{ marginBottom: "25px" }} className="fas fa-clock fa-lg" /><br />
                                <p style={{ textAlign: "left" }}>The school then, has 72 hours to accept or deny a review based on the student's identity ONLY. The content of the review is not revealed to the school until accepted.</p></div>

                            <div className="floating" ><i style={{ marginBottom: "25px" }} className="fas fa-hand-peace fa-lg" /><br />
                                <p style={{ textAlign: "left" }}><strong>Once accepted, the review is published on reviewable, where other students will be able to see and use in their research.</strong></p></div>
                        </div>

                        <h2 style={{ clear: "left", margin: "50px 0px", textAlign: "center" }}>What if my review is not accepted?</h2>
                        <div className="">
                            <div className="floating"><p></p></div>


                            <div className="floating"><i style={{ marginBottom: "25px" }} className="far fa-file-alt fa-lg" /><br />
                                <p style={{ textAlign: "left" }}>If a review is denied or not accepted in time, the student is notified and offered the option to provide documents and be verified by reviewable.</p></div>

                            <div className="floating"><p></p></div>
                        </div>


                        <h2 style={{ clear: "left", margin: "50px 0px", textAlign: "center" }}>Why reviewable?</h2>
                        <div className="">
                            <div className="floating"><p></p></div>
                            <div className="floating">
                                <i style={{ marginBottom: "25px" }} className="fas fa-check-circle fa-lg"></i><i style={{ marginBottom: "25px" }} className="far fa-check-circle fa-lg"></i>
                                <p style={{ textAlign: "left" }}>reviewable it is the only review system that shows <strong>how many reviews were received to each school</strong>,
                        <strong> how many reviews were accepted by the school</strong> and <strong>how many were only verified by reviewable</strong>.
                        It gives future students information that helps in the decision making process.</p></div>
                            <div className="floating"><p></p></div>
                        </div>

                        <div style={{ clear: "left" }}>


                            {/* <p style={{ textAlign: "center", marginBottom: "-35px" }}>Did you study here?</p>
                        <button onClick={() => { alert("TO DO") }}>Leave a review</button> */}

                        </div>



                    </div>
                    {/* <label><h3 style={{ border: "0px solid green", fontWeight: "lighter" , margin: "0 auto 15px auto"}}>Verified reviews from real students</h3></label> */}
                </div>
            </div>
            // </div >
            // </div>
        }
    }

    // NOT WORKING :/
    private renderResults() {
        if (this.state.searchResult) {
            return
            this.state.searchResult.map((school) => {
                return

                <div style={{ backgroundColor: "red" }} onClick={() => { this.handleSubmit(school.schoolId) }}>
                    {school.schoolName}
                </div>

            })
        } else {
            return <div>ugh</div>
        }
    }

    private handleChange(value: string) {

        if (value.length >= 1) {
            let dataSimple = this.state.school.filter(v => {
                return v.schoolName.toLowerCase().includes(value.toLowerCase());
            })
            this.setState({ searchResult: dataSimple })
            this.renderResults()
        } else {
            this.setState({ searchResult: [] });
        }
    }

    private handleSubmit(id: number) {
        this.props.history.push(`/schools/${id}`)
    }
}

export const Search = withRouter(props => <SearchInternal {...props} />);


async function getAllSchools() {
    const response = await fetch("/api/v1/schools");
    const json = await response.json();
    return json as School[];
};
