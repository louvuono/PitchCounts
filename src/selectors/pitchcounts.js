import moment from 'moment';

// Get visible pitchcounts

export default (pitchcounts, { text, sortBy, startDate, endDate }) => {
    return pitchcounts.filter((pitchcount) => {
        console.log('Selecting pitch counts');
        console.log(pitchcounts);
        const pitchDate = moment(pitchcount.nextAvailable);
        const startDateMatch = startDate ? startDate.isSameOrBefore(pitchDate, 'day') : true
        const endDateMatch = endDate ? endDate.isSameOrAfter(pitchDate, 'day') : true
        const textMatch = pitchcount.name.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
        //return startDateMatch && endDateMatch;
    }).sort((a, b) => {
        console.log('SORTING BY: ' + sortBy);
        if (sortBy === 'date') {
            return a.nextAvailable < b.nextAvailable ? 1 : -1;
        } else if (sortBy === 'team') {
            return a.team < b.team ? 1 : -1;
        } else if (sortBy === 'name') {
            return a.name < b.name ? 1 : -1;
        }
    })
};