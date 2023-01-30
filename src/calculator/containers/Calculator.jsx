import React from 'react'
import ButtonCustom from "./ButtonCustom";
import Expression from "./Expression";
import History from "./History";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {withStyles} from '@material-ui/core/styles';
import {Typography} from "@material-ui/core";
import {connect} from 'react-redux';
import {compose} from "redux";


const styles = (theme) => ({
    root: {
        display: 'flex',
        flex: '0.15',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    row: {
        display: 'flex',
    },

});

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [],
            firstNum: null,
            secondNum: null,
            operator: null,
        }
    }

    renderButtonNumber(currentNumber) {
        return (
            <ButtonCustom
                value={currentNumber}
                onClick={() => this.handleClickNumber(currentNumber)}
            />

        );
    }

    renderButtonOperation(currentOperator) {
        return (
            <ButtonCustom
                value={currentOperator}
                onClick={() => this.handleClickOperation(currentOperator)}
            />
        );
    }

    getResult(state) {
        const {
            firstNum,
            secondNum,
            operator
        } = state;
        const current = firstNum + operator + secondNum;
        let result;
        switch (operator) {
            case '+':
                result = +firstNum + +secondNum;
                break;
            case '-':
                result = +firstNum - +secondNum;
                break;
            case '/':
                result = +firstNum / +secondNum;
                break;
            case '*':
                result = +firstNum * +secondNum;
                break;
        }
        if (result === Infinity || isNaN(result)) {
            result = 'Error';
        }
        this.setState(state => ({
            history: [...state.history, current + '=' + result],
        }))
        return result;
    }

    handleClickOperation(currentOperator) {
        const {
            firstNum,
            secondNum,
            operator
        } = this.state;

        if (firstNum === null && currentOperator === '-') {
            this.setState({
                firstNum: currentOperator
            })
            return;
        } else if (firstNum === 'Error') {
            return;
        }

        if (!operator) {
            if (currentOperator === '=') {
                return;
            }
            this.setState({
                operator: currentOperator
            })
        } else {
            if (secondNum !== null) {
                let result = this.getResult(this.state);

                this.setState({
                    firstNum: result,
                    operator: null,
                    secondNum: null,
                })
                if (result === 'Error') {
                    this.setState({
                        firstNum: null,
                    })
                }
                if (currentOperator !== '=') {
                    if (result !== 'Error') {
                        this.setState({
                            operator: currentOperator
                        })
                    }
                }
            } else {
                if (currentOperator !== '=') {
                    this.setState({
                        operator: currentOperator
                    })
                }
            }
        }
    }

    handleClickNumber(currentNumber) {
        const {
            firstNum,
            secondNum,
            operator
        } = this.state;
        if (firstNum === 'Error') {
            return;
        }
        let newNum;
        if (operator) {
            newNum = this.concatValue(secondNum, currentNumber);
            if (newNum === null) {
                return;
            }
            this.setState({
                secondNum: newNum
            });
        } else {
            newNum = this.concatValue(firstNum, currentNumber);
            if (newNum === null) {
                return;
            }
            this.setState({
                firstNum: newNum
            });
        }
    }

    concatValue(previousNum, currentNum) {
        return previousNum !== null ? ('' + previousNum + currentNum) : currentNum;
    }

    calculateExpression() {
        if (this.props.isError) {
            return;
        }
        const {
            list,
        } = this.props;
        for (const expression of list) {
            const [
                firstNum,
                secondNum
            ] = expression.split(/[/*\-+]/)
            let operator = expression.match(/[/*\-+]/)[0];

            let state = {
                firstNum: firstNum,
                secondNum: secondNum,
                operator: operator,
            }
            this.getResult(state);
        }
    }

    render() {
        const styles = this.props.classes;
        const {
            history,
            firstNum,
            secondNum,
            operator
        } = this.state;
        const current = this.concatValue(firstNum, "") +
            this.concatValue(operator, "") +
            this.concatValue(secondNum, "");

        return (
            <div className={styles.row}>
                <div className={styles.root}>
                    <Typography variant="h4">History</Typography>
                    <History history={history}/>
                </div>
                <div className={styles.root}>
                    <ButtonGroup>
                        {this.renderButtonNumber(1)}
                        {this.renderButtonNumber(2)}
                        {this.renderButtonNumber(3)}
                    </ButtonGroup>
                    <ButtonGroup>
                        {this.renderButtonNumber(4)}
                        {this.renderButtonNumber(5)}
                        {this.renderButtonNumber(6)}
                    </ButtonGroup>
                    <ButtonGroup>
                        {this.renderButtonNumber(7)}
                        {this.renderButtonNumber(8)}
                        {this.renderButtonNumber(9)}
                    </ButtonGroup>
                    <ButtonGroup>
                        {this.renderButtonOperation('+')}
                        {this.renderButtonNumber(0)}
                        {this.renderButtonOperation('-')}
                    </ButtonGroup>
                    <ButtonGroup>
                        {this.renderButtonOperation('/')}
                        {this.renderButtonOperation('*')}
                        {this.renderButtonOperation('=')}
                    </ButtonGroup>
                    <Typography variant="h4">{current}</Typography>
                </div>
                <div className={styles.root}>
                    <Expression
                        onClick={() => this.calculateExpression()}
                    />
                </div>
            </div>
        );
    }
}

const mapReduxStateToProps = reduxState => ({
    ...reduxState
});


export default compose(
    connect(
        mapReduxStateToProps,
    ),
    withStyles(styles),
)(Calculator);
