import React from'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setTextFilter, sortByTeam, sortByName, sortByDate, setStartDate, setEndDate } from '../actions/filters';

export class PitchCountListFilters extends React.Component {
    state = {
        calendarFocused: null
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
        switch (e.target.value) {
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

    render() {
        return (
          <div className="content-container">
            <div className="input-group">
              <div className="input-group__item">
                <input
                  type="text"
                  className="text-input"
                  placeholder="Search PitchCounts"
                  value={this.props.filters.text}
                  onChange={this.onTextChange}
                />
              </div>
              <div className="input-group__item">
                <select
                  className="select"
                  value={this.props.filters.sortBy}
                  onChange={this.onSortChange}
                >
                  <option value="date">Date</option>
                  <option value="team">Team</option>
                  <option value="name">Name</option>
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
    return {
        filters: state.filters
    };
};

const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    sortByDate: () => dispatch(sortByDate),
    sortByTeam: () => dispatch(sortByTeam ),
    sortByName: () => dispatch(sortByName ),
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate))
})

export default connect(mapStateToProps, mapDispatchToProps)(PitchCountListFilters);
