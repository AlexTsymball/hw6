const initialState = {
    isLoading: false,
    isError: false,
    list: [],
    name: "Expression",
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'ERROR_RECEIVE_EXPRESSIONS': {
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        }
        case 'REQUEST_EXPRESSIONS': {
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        }
        case 'RECEIVE_EXPRESSIONS': {
            const {
                expression
            } = action;
            return {
                ...state,
                isLoading: false,
                isError: false,
                list: expression,
            };
        }
        default: return state;
    }
};
