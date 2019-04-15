import filtersReducer from '../../reducers/filters';
import moment from 'moment';

test('should set up default filter values', () => {
    const state = filtersReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('should set sortBy to amount', () => {
    const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });
    expect(state.sortBy).toBe('amount');
});

test('should set sortBy to date', () => {
    const currentState = {
        text: '',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'amount'
    };
    const action = { type: 'SORT_BY_DATE'};
    const state = filtersReducer(currentState, action);
    expect(state.sortBy).toBe('date');
});

test('should set up a text filter value', () => {
    const state = filtersReducer(undefined, { type: 'SET_TEXT_FILTER', text: 'filter text' });
    expect(state).toEqual({
        text: 'filter text',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('should set up a start date', () => {
    const startDate = moment(0).add(5, 'years');
    const action = {
        type: 'SET_START_DATE',
        startDate
    };
    const state = filtersReducer(undefined, action);
    expect(state.startDate).toEqual(startDate);
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment(0).add(5, 'years'),
        endDate: moment().endOf('month')
    });
});

test('should set up a end date', () => {
    const endDate = moment(0).add(7, 'years');
    const action = {
        type: 'SET_END_DATE',
        endDate
    };
    const state = filtersReducer(undefined, action);
    expect(state.endDate).toEqual(endDate);
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment(0).add(7, 'years')
    });
});