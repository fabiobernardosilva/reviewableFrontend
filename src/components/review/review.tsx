import React from 'react';

interface ReviewProps {
    items: JSX.Element[];
}

interface ReviewState {
}

export class Review extends React.Component<ReviewProps, ReviewState> {
    public render() {
        if (this.props.items.length < 1) {
            return <div className="reviewCard">This school hasn't received any reviews yet!</div>;
            
        } else {
            return <div >
                {this.props.items.map(function (item) {
                    return <div className="reviewCard">{item}</div>;
                })}
            </div>;
        }
    }
}
