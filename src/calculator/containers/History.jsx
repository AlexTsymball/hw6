import React from 'react'
import {Typography} from "@material-ui/core";


class History extends React.Component {
    render() {
        const history = this.props.history;
        return (
            <div>
                    {history.map((expression, index) => (
                        <Typography key={index + 'Ex'} variant="h6">{expression}</Typography>
                    ))}
            </div>

        );
    }
}

export default History;