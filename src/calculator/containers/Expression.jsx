import React, {Component} from 'react'
import Button from "@material-ui/core/Button";
import {TextField} from "@material-ui/core";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import expressionsAction from "../action/expressions";


class Expression extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expressions: null,
            isClick: false,
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.isClick ) {
            this.setState({
                isClick: false,
            })

            if(this.state.expressions > 0) {
                await this.props.actionFetchExpressions(this.state.expressions);
                this.props.onClick();
            }
        }
    }

    render() {
        return (
            <div>
                <div>
                    <Button
                        disabled={!this.state.expressions}
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            this.setState({
                                isClick: true,
                            });
                        }}>
                        Get and solve the examples
                    </Button>
                </div>
                <br/>
                <div>
                    <TextField
                        id="outlined-number"
                        label="Number of expressions"
                        type="number"
                        InputProps={{
                            inputProps: {min: 1},
                        }}
                        onChange={(e) => {
                            this.setState({
                                expressions: e.target.value,
                            })

                        }}
                        variant="outlined"/>
                </div>
            </div>

        );
    }
}

const mapStateToProps = reduxState => ({
    ...reduxState
});

const mapDispatchToProps = (dispatch) => {
    const {
        fetchExpressions,
    } = bindActionCreators(expressionsAction, dispatch);
    return ({
        actionFetchExpressions: fetchExpressions,
    });
//
};


export default connect(mapStateToProps, mapDispatchToProps)(Expression);
