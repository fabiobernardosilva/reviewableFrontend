import React from 'react';
import * as H from 'history';
import { withRouter } from 'react-router-dom';

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
