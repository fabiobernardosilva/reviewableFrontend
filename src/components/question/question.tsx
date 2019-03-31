import React from "react";

interface QuestionProps{
    school: string,
    questionTitle: string,
    questionDescription: string,
    radioName: string,
    selectedValue: number,
    onChange: (selectedValue: number) => void

}
interface QuestionState{
}

export class Question extends React.Component<QuestionProps, QuestionState>{

constructor(props: QuestionProps){
    super(props);
    //this.state = {selectedValue: 0}
    
}

public getValue(value: number){
    this.props.onChange(value);
          
}

render(){
    return<div>
        <h3>{this.props.questionTitle} {this.props.school}<span style={{ color: 'red' }}>*</span></h3><h4>You selected: {this.props.selectedValue}</h4>
                <p>{this.props.questionDescription}</p>
                
                <div className='grid'>
                    <label onClick={() => {this.getValue(5)}} className='gridContainer'>5: Excellent
                        <input type="radio" name={this.props.radioName} />
                        <span className="dot" id='excellent'></span>
                    </label>
                    <label onClick={() => {this.getValue(4)}}className="gridContainer">4: Good
                        <input type="radio" name={this.props.radioName} />
                        <span className="dot" id='good'></span>
                    </label>
                    <label onClick={() => {this.getValue(3)}} className="gridContainer">3: Average
                        <input type="radio" name={this.props.radioName} />
                        <span className="dot" id='average'></span>
                    </label>
                    <label onClick={() => {this.getValue(2)}} className="gridContainer">2: Poor
                        <input type="radio" name={this.props.radioName} />
                        <span className="dot" id='poor'></span>
                    </label>
                    <label onClick={() => {this.getValue(1)}} className="gridContainer">1: Bad
                        <input type="radio" name={this.props.radioName} />
                        <span className="dot" id='bad'></span>
                    </label>
                </div>
    </div>
}

}