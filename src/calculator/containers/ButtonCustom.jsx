import React from 'react'
import Button from '@material-ui/core/Button';


class ButtonCustom extends React.Component {
    render() {
        const number = this.props.value;
        return (
            <Button
                variant="contained"
                color={+number||number===0 ? 'default': 'primary'}
                onClick={this.props.onClick}>
                {number}
            </Button>

        );
    }
}

export default ButtonCustom;