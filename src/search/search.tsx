import React from 'react';

interface School{
    schoolId: number;
    schoolName: string;
    website: string;
}

interface SearchProps{}
interface SearchState{
    school: School[] | null
}

export class Search extends React.Component<SearchProps, SearchState>{
    public constructor(props: SearchProps){
    super(props);
    this.state = {
        school: null
    }
    }

    public componentDidMount() {
        (async () => {
            const data = await getAllSchools();
            const JSONToString = JSON.stringify(data)
            this.setState({ school: data });
            alert(JSONToString);
        })();

        
    }

    render(){
        return <div></div>
    }
}   

async function getAllSchools(){
    const response = await fetch("/schools");
    const json = await response.json();
    return json as School[];
};