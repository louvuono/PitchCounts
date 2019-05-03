import moment from 'moment';

// Get visible pitchcounts

export default (pitchcounts, { text, filterBy, sortBy, startDate, endDate }) => {
    return pitchcounts.filter((pitchcount) => {
        const pitchDate = moment(pitchcount.nextAvailable);
        const startDateMatch = startDate ? startDate.isSameOrBefore(pitchDate, 'day') : true
        const endDateMatch = endDate ? endDate.isSameOrAfter(pitchDate, 'day') : true
        let textMatch = false;
        switch (filterBy) {
            case 'team':
                textMatch = pitchcount.team.toLowerCase().includes(text.toLowerCase());
                break;
            case 'coach':
                textMatch = pitchcount.coach.toLowerCase().includes(text.toLowerCase());
                break;
            case 'name':
                textMatch = pitchcount.name.toLowerCase().includes(text.toLowerCase());
                break;
            default:
                textMatch = false;
        }

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.nextAvailable < b.nextAvailable ? 1 : -1;
        } else if (sortBy === 'team') {
            return a.team > b.team ? 1 : -1;
        } else if (sortBy === 'name') {
            return a.name > b.name ? 1 : -1;
        }
    })
};