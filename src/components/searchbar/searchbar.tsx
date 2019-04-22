import React from 'react';

// interface SearchBarProps {
//     items: string[];
// }

// interface SearchBarState {
//     currentIndex: number;
//     displayList: boolean;
//     isCollapsed: boolean;
// }


// export class SearchBar extends React.Component<SearchBarProps, SearchBarState>{
//     public constructor(props: SearchBarProps) {
//         super(props);
//         this.state = { currentIndex: -1, displayList: true, isCollapsed: true}
//     }

//     public render() {
//         const searchBarStyle: React.CSSProperties = {
//         };
        
//         return <div>
//             <input onMouseEnter={()=> this._toggle()} placeholder={this.state.currentIndex === -1 ? "Search your school here" : this.props.items[this.state.currentIndex] } ></input>
//             <button className='startButton' onClick={() => this._toggle()}>
//                 {this.state.isCollapsed ? "Search" : "Close"}
//             </button>
//             <h1>{this.props.items[this.state.currentIndex]}</h1>
            
          
//              {this._renderChildren()}
            
//             </div>
        
//     }

//     private _renderChildren() {
//         if (this.state.isCollapsed ===true) {
//             return null;
//         } else {
//             return <ul className='test'>{this._renderItems(this.props.items)}</ul> 
//         }
//     }

//     /*
//     private _goLeft(){
//         var maxIndex = this.props.items.length -1;
//         if(this.state.currentIndex== 0){
//             this.setState({currentIndex: maxIndex})
//         } else {
//             this.setState({currentIndex: this.state.currentIndex-1})
//         }
//     }

//     private _goRight(){
//         var maxIndex = this.props.items.length -1;
//         if(this.state.currentIndex== maxIndex){
//             this.setState({currentIndex: 0})
//         } else {
//             this.setState({currentIndex: this.state.currentIndex+1})
//         }
//     }
//     */

//     private _toggle() {
//         // this.state.isCollapsed = false; NOT LIKE THIS!
//         this.setState({ isCollapsed: !this.state.isCollapsed });
//     }
    
    
//     private handleClick(index: number){
//         //this.handleClick.bind(this, index)
//         //alert(index);
//         this.setState({currentIndex: index});
//         this.setState({isCollapsed: true})
//     }


//     private _renderItems(items: string[]) {
//         if(this.state.displayList === true){
//             return items.map((item, index) => {
//                 return <li onClick={()=> this.handleClick(index)} style={{ cursor: "pointer" }}>{index+" "+item}</li>
    
//             })
//         } else {
            
//         }
       
//     }
// }