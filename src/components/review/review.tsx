import React from 'react';

interface ReviewProps {
    items: JSX.Element[];
}

interface ReviewState {
}

export class Review extends React.Component<ReviewProps, ReviewState> {
    public render() {
        if (this.props.items.length < 1) {
            return <div>No reviews yet!</div>;
        } else {
            return <ul>
                {this.props.items.map(function (item) {
                    return <li>{item}</li>;
                })}
            </ul>;
        }
    }
}
