import React from "react";

interface QuestionProps {
    school: string,
    questionTitle: string,
    questionDescription?: string,
    radioName: string,
    selectedValue: number,
    onChange: (selectedValue: number) => void,
    numberOfOptions: number

}
interface QuestionState {
}

export class Question extends React.Component<QuestionProps, QuestionState>{
    constructor(props: QuestionProps) {
        super(props);
    }

    public getValue(value: number) {
        this.props.onChange(value);
    }

    render() {
        if(this.props.numberOfOptions === 5){
        return <div>
            <h3>{this.props.questionTitle} {this.props.school}<span style={{ color: "#ff4a4a" }}>*</span></h3>
            <p>{this.props.questionDescription}</p>

            <div className='grid'>
                <label onClick={() => { this.getValue(5) }} className='gridContainer'>Excellent: <strong>5</strong>
                        <input type="radio" name={this.props.radioName} />
                    <span className="dot" id='excellent'></span>
                </label>
                <label onClick={() => { this.getValue(4) }} className="gridContainer">Good: <strong>4</strong>
                        <input type="radio" name={this.props.radioName} />
                    <span className="dot" id='good'></span>
                </label>
                <label onClick={() => { this.getValue(3) }} className="gridContainer">Average: <strong>3</strong>
                        <input type="radio" name={this.props.radioName} />
                    <span className="dot" id='average'></span>
                </label>
                <label onClick={() => { this.getValue(2) }} className="gridContainer">Poor: <strong>2</strong>
                        <input type="radio" name={this.props.radioName} />
                    <span className="dot" id='poor'></span>
                </label>
                <label onClick={() => { this.getValue(1) }} className="gridContainer">Bad: <strong>1</strong>
                        <input type="radio" name={this.props.radioName} />
                    <span className="dot" id='bad'></span>
                </label>
            </div>
        </div>
        }
        if(this.props.numberOfOptions === 2){
            return <div>
                <h3>{this.props.questionTitle} {this.props.school}?<span style={{ color: 'red' }}>*</span></h3>
                    
                    <div className='grid'>
                        <label/>
                        <label onClick={() => { this.getValue(1) }} className="gridContainer">Yes
                        <input type="radio" name={this.props.radioName} />
                            <span className="dot" id='recommendationYes'></span>
                        </label>
                        <label/>
                        <label onClick={() => { this.getValue(0) }} className="gridContainer">No
                        <input type="radio" name={this.props.radioName} />
                            <span className="dot" id='recommendationNo'></span>
                        </label>
                        <label/>
                    </div>
            </div>
        }
    }
}