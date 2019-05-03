import React from'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setTextFilter, filterByTeam, filterByCoach, filterByName, sortByTeam, sortByName, sortByDate, setStartDate, setEndDate } from '../actions/filters';

export class PitchCountListFilters extends React.Component {
    state = {
        calendarFocused: null,
        sortBy: 'date',
        filterBy: 'team'
    };

    onDatesChange = ({startDate, endDate}) => {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    };

    onFocusChange = (calendarFocused) => {
        this.setState(() => ({ calendarFocused }));
    };

    onTextChange = (e) => {
        this.props.setTextFilter(e.target.value);
    };

    onSortChange = (e) => {
        console.log('SORT CHANGE: ' + e.target.value);
        const x = e.target.value;
        this.setState(() => ({ sortBy: x }));
        switch (x) {
            case 'date':
                this.props.sortByDate();
                break;
            case 'team':
                this.props.sortByTeam();
                break;
            case 'name':
            default:
                this.props.sortByName();
        }
    };

    onFilterChange = (e) => {
      console.log('FILTER CHANGE: ' + e.target.value);
      const x = e.target.value;
      console.log('FILTER BY: ' + x);
      this.setState(() => ({ filterBy: x }));
      switch (x) {
          case 'name':
              this.props.filterByName();
              break;
          case 'coach':
              this.props.filterByCoach(x);
              break;
          case 'team':
          default:
              this.props.filterByTeam();
      }
  };

    render() {
        return (
          <div className="content-container">
            <div className="input-group">
              <div className="input-group__item">
                <select
                  className="select"
                  value={this.state.filterBy}
                  onChange={this.onFilterChange}
                >
                  <option value="team">Filter by Team</option>
                  <option value="coach">Filter by Coach</option>
                  <option value="name">Filter by Name</option>
                </select>
              </div>
              <div className="input-group__item">
                <input
                  type="text"
                  className="text-input"
                  placeholder="Filter PitchCounts"
                  value={this.props.filters.text}
                  onChange={this.onTextChange}
                />
              </div>
              <div className="input-group__item">
                <select
                  className="select"
                  value={this.state.sortBy}
                  onChange={this.onSortChange}
                >
                  <option value="date">Sort by Date</option>
                  <option value="team">Sort by Team</option>
                  <option value="name">Sort by Name</option>
                </select>
              </div>
              <div className="input-group__item">
                <DateRangePicker
                  startDate={this.props.filters.startDate}
                  endDate={this.props.filters.endDate}
                  onDatesChange={this.onDatesChange}
                  focusedInput={this.state.calendarFocused}
                  onFocusChange={this.onFocusChange}
                  showClearDates={true}
                  numberOfMonths={1}
                  isOutsideRange={() => false}
                />
              </div>
            </div>
          </div>
        );
    }
};

const mapStateToProps = (state) => {
  console.log('FILTERS = ' + state.filters);
    return {
        filters: state.filters
    };
};

const mapDispatchToProps = (dispatch) => ({
    filterByTeam: (x) => dispatch(filterByTeam(x)),
    filterByCoach: (x) => dispatch(filterByCoach(x)),
    filterByName: (x) => dispatch(filterByName(x)),
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    sortByDate: (x) => dispatch(sortByDate(x)),
    sortByTeam: (x) => dispatch(sortByTeam(x)),
    sortByName: (x) => dispatch(sortByName(x)),
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate))
})

export default connect(mapStateToProps, mapDispatchToProps)(PitchCountListFilters);
