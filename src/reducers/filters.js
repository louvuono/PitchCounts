// Filter reducer
import moment from 'moment';


const filterDefaultState = {
    text: '',
    sortBy: 'date',
    filterBy: 'team',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
};

export default (state = filterDefaultState, action) => {
    console.log('ACTION TYPE: ' + action.type);
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return { 
                ...state,
                text: action.text
            };
        case 'FILTER_BY_TEAM':
            return { 
                ...state,
                filterBy: 'team'
            };        
        case 'FILTER_BY_COACH':
            return { 
                ...state,
                filterBy: 'coach'
            };
        case 'FILTER_BY_NAME':
            return { 
                ...state,
                filterBy: 'name'
            };
        case 'SORT_BY_TEAM':
            return {
                ...state,
                sortBy: 'team'
            };
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            };
        case 'SORT_BY_NAME':
            return {
                ...state,
                sortBy: 'name'
            };
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            };
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            };
        default:
            return state;
    }
};