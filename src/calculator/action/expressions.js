const receiveExpressions = expressions => ({
        expression: expressions,
        type: 'RECEIVE_EXPRESSIONS'
    });


const requestExpressions = () => ({
        type: 'REQUEST_EXPRESSIONS'
    });


const errorReceiveExpressions = () => ({
    type: 'ERROR_RECEIVE_EXPRESSIONS'
});

const getExpressions = (expressionsCount)  => {
    let url1 = 'http://localhost:8080/math/examples';
    return ( fetch(url1 + "?" + new URLSearchParams({
        count: expressionsCount,
    })));
}

const fetchExpressions = (expressionsCount) => (dispatch) => {
    dispatch(requestExpressions());
    return getExpressions(expressionsCount)
        .then(expressions => {
            return expressions.json();
        }).then((data) => {
            dispatch(receiveExpressions(data))
        })
        .catch(() => {
            dispatch(errorReceiveExpressions())
        });
};

export default {
    fetchExpressions,
};
