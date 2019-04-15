import React from 'react';
import * as H from 'history';
import { withRouter } from 'react-router-dom';
import { throws } from 'assert';

//import { SearchBar } from '../searchbar/searchbar';
//import { Header } from '../header/header';
//import { School } from '../school/school';
//import image from "../../students.jpg"
//import { url } from 'inspector';

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
            return <div>...</div>
        } else {
            return <div className="center">
                {/*
                <img style={{ width: "100%", opacity: 0.5}}src={image}/>
                */}
                <input style={{ textAlign: "center" }} className="searchBar" onKeyUp={(e) => this.handleChange((e as any).target.value)} type="text"></input>

                
                {this.state.searchResult.map((school) => {

                return <div style={{backgroundColor: "white", width: "75%", marginLeft: "auto", marginRight: "auto"}} onClick={() => { this.handleSubmit(school.schoolId) }}>
                    <p style={{fontSize: "28px", lineHeight: "40px"}}>{school.schoolName}</p>
                    </div>
                    })
                }

                {/* 
                {this.renderResults()}
                */}
                
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

        //let schoolLowerCaseArray: School[] = [];
        //let resultArray: School[] = [];
        /*


        // MAPPING SCHOOLS FROM DB INTO LOWER CASE
        this.state.school.map(item => {
            schoolLowerCaseArray.push({
                schoolId: item.schoolId,
                schoolName: item.schoolName.toLocaleLowerCase(),
                website: item.website,
            })
        })

        // FILTERING INPUT TO MATCH WITH LOWERCASE SCHOOLS
        let data = schoolLowerCaseArray.filter(v => {
            return v.schoolName.includes(value.toLocaleLowerCase());
        });*/

        if (value.length >= 1) {
            let dataSimple = this.state.school.filter(v => {
                return v.schoolName.toLowerCase().includes(value.toLowerCase());
            })
            this.setState({ searchResult: dataSimple })
            this.renderResults()
        } else {
            this.setState({ searchResult: [] });
        }











        //alert(JSON.stringify(this.state.searchResult))

        /*
        this.state.school.map((school) => {
            dataSimple.map(v => {
                //if (school.schoolId === v.schoolId) {
                    let result = {
                        schoolId: school.schoolId,
                        schoolName: school.schoolName,
                        website: school.website,
                    }
                    
                    resultArray.push(result);
                    this.setState({ searchResult: resultArray });
                } 
            //}
            )
        })
        /*

        //alert(value)

        /*
        if (value) {
            if (value !== " ") {
                {
                    this.state.school.map((school) => {
                        data.map(v => {
                            if (school.schoolId === v.schoolId) {
                                let result = {
                                    schoolId: school.schoolId,
                                    schoolName: school.schoolName,
                                    website: school.website,
                                }
                                resultArray.push(result);
                                this.setState({ searchResult: resultArray });
                            }
                        })
                    })
                }
            }
        }
        */



    }

    private handleSubmit(id: number) {
        this.props.history.push(`/schools/${id}`)

        /*
            < Redirect
        to = {{
            pathname: "/schools/:id",
                    state: { schoolId: id }
        }
    }
/>
*/
    }
}

export const Search = withRouter(props => <SearchInternal {...props} />);


async function getAllSchools() {
    const response = await fetch("/schools");
    const json = await response.json();
    return json as School[];
};
