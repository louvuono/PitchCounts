export const setTextFilter = ( text = '' ) => ({
    type: 'SET_TEXT_FILTER',
    text
});

export const sortByTeam = () => ({
    type: 'SORT_BY_TEAM'
});

export const sortByName = () => ({
    type: 'SORT_BY_NAME'
});

export const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

export const setStartDate = (date = undefined) => ({
    type: 'SET_START_DATE',
    startDate: date
});

export const setEndDate = (date = undefined) => ({
    type: 'SET_END_DATE',
    endDate: date
});
