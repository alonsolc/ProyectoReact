import React from 'react';

class NotFound extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    render() {
        return (
            <React.Fragment>
                <h1>Page not found</h1>
            </React.Fragment>
        );
    }
}

export default NotFound;