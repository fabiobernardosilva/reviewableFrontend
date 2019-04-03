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
            this.setState({ school: data });
        })();
    }

    render(){
        return <div>loading...</div>
    }
}   

async function getAllSchools(){
    const response = await fetch("/schools");
    const json = await response.json();
    return json as School[];
};