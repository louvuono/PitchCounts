export const setTextFilter = ( text = '' ) => ({
    type: 'SET_TEXT_FILTER',
    text
});

export const filterByTeam = ( x = '' ) => ({
    type: 'FILTER_BY_TEAM'
});

export const filterByCoach = ( x = '' ) => ({
    type: 'FILTER_BY_COACH'
});

export const filterByName = ( x = '' ) => ({
    type: 'FILTER_BY_NAME'
});

export const sortByTeam = ( x = '' ) => ({
    type: 'SORT_BY_TEAM'
});

export const sortByName = ( x = '' ) => ({
    type: 'SORT_BY_NAME'
});

export const sortByDate = ( x = '' ) => ({
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
