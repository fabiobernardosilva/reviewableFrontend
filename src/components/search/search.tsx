import React from 'react';
import * as H from 'history';
import { withRouter } from 'react-router-dom';
//import image from '../../students2.jpg'
import logo from '../../reviewable_brand_positive.png';

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
            
            return <div >
            {/* //className="content"> */}
            <div style={{border: "2px solid red"}}className='contentSearch'>
            <div style={{  border: "2px solid red"
                // boxShadow: "2px 2px 3px grey"
}}className="backgroundImage">
            <img style={{margin: "0 auto 10px auto"}}src={logo} height='35px;'/><br/>  
            <label><h3 style={{fontWeight: "lighter" , margin: "0 auto 15px auto"}}>Verified reviews from real students</h3></label>        
            <input placeholder="Find your school here" style={{ paddingLeft: "25px", textAlign: "left" }} className="searchBar" onKeyUp={(e) => this.handleChange((e as any).target.value)} type="text"></input>

            
                

                
                
                <div className="searchResults">
                {this.state.searchResult.map((school) => {


                return <div style={{opacity: 1, width: "90%", marginLeft: "auto", marginRight: "auto"}} onClick={() => { this.handleSubmit(school.schoolId) }}>
                    <p style={{fontSize: "28px", lineHeight: "40px"}}>{school.schoolName}  <span style={{fontSize: "14px"}}> | {school.website}</span></p>
                    </div>
                    })
                }

                {/* 
                {this.renderResults()}
                */}
                </div>
                
                </div>
                {/* <div>
                    <h2 style={{margin: "50px 0px", textAlign: "center"}}>How does reviewable work?</h2>
                    <div style={{textAlign: "center"}}className="grid3">
                    <div style={{padding: "0 50px"}}><i style ={{marginBottom: "25px", color: "#11003f"}} className="fas fa-comment fa-3x"/><br/>

<p style={{textAlign: "left"}}>You review your school on reviewable, assessing items such as your teacher, facilities and the staff and can also leave an in-depth comment of your experience.</p></div>
                    <div style={{padding: "0 50px"}}><i style ={{marginBottom: "25px", color: "#11003f"}} className="fas fa-clock fa-3x"/><br/>
                    <p style={{textAlign: "left"}}>The school has 72 hours to accept or deny a review based on the student's identity ONLY. The content of the review is not revealed to the school until accepted.</p></div>
                    
                    
                    <div style={{padding: "0 50px"}}><i style ={{marginBottom: "25px", color: "#11003f"}} className="fas fa-hand-peace fa-3x"/><br/>
                    <p style={{textAlign: "left"}}>Once accepted, the review is published on reviewable, where other students will be able to see and use in their research.</p></div>
                    </div>
                    <h2 style={{margin: "50px 0px", textAlign: "center"}}>What happens if my review is not accepted?</h2>
                    <div className="grid3">
                    <div style={{padding: "0 50px"}}><p>You review your school on reviewable, assessing items such as your teacher, facilities and the staff and can also leave an in-depth comment of your experience.</p></div>
                    <div style={{padding: "0 50px"}}><p>The school has 72 hours to accept or deny a review based on the student's identity ONLY. The content of the review is not revealed to the school until accepted.</p></div>
                    <div style={{padding: "0 50px"}}><p>Once accepted, the review is published on reviewable, where other students will be able to see and use in their research.</p></div>
                    </div>
                    <h2 style={{margin: "50px 0px", textAlign: "center"}}>Why reviewable?</h2>
                    <div className="grid3">
                    <div style={{padding: "0 50px"}}><p>You review your school on reviewable, assessing items such as your teacher, facilities and the staff and can also leave an in-depth comment of your experience.</p></div>
                    <div style={{padding: "0 50px"}}><p>The school has 72 hours to accept or deny a review based on the student's identity ONLY. The content of the review is not revealed to the school until accepted.</p></div>
                    <div style={{padding: "0 50px"}}><p>Once accepted, the review is published on reviewable, where other students will be able to see and use in their research.</p></div>
                    </div>
                    
                    
                </div> */}
            </div>
            </div>
            
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
    const response = await fetch("/schools");
    const json = await response.json();
    return json as School[];
};
