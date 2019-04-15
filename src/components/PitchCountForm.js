import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';


//const date = new Date();

const now = moment();
console.log(now.format('MMM Do YYYY'));

export default class PitchCountForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date: props.pitchcount ? moment(props.pitchcount.date) : moment(),
            name: props.pitchcount ? props.pitchcount.name : '',
            team: props.pitchcount ? props.pitchcount.team : '',
            age: props.pitchcount ? props.pitchcount.age : '',
            coach: props.pitchcount ? props.pitchcount.coach : '',
            pitches: props.pitchcount ? props.pitchcount.pitches : '',
            catching: props.pitchcount ? props.pitchcount.catching : '',
            nextAvailable: props.pitchcount ? moment(props.pitchcount.nextAvailable) : moment(),
            calendarFocused: false,
            error: ''
        };
    };
    
    onDateChange = (date) => {
        if (date) {
            this.setState(() => ({date}))
        }        
    };

    onNameChange = (e) => {
        const name = e.target.value;
        this.setState(() => ({ name }));
    };

    onTeamChange = (e) => {
        const team = e.target.value;
        this.setState(() => ({ team }));
    };    

    onAgeChange = (e) => {
        const age = e.target.value;
        this.setState(() => ({ age }));
    };

    onCoachChange = (e) => {
        const coach = e.target.value;
        this.setState(() => ({ coach }));
    };

    onPitchesChange = (e) => {
        const pitches = e.target.value;
        this.setState(() => ({ pitches }));
    };  
    
    onCatchingChange = (e) => {
        const catching = e.target.value;
        this.setState(() => ({ catching }));
    };  

    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused}))
    };

    onSubmit = (e) => {
        e.preventDefault();

        let errorMsg = '';
        let warningMsg = '';
        let next = 0;
        if (this.state.pitches < 21) {
            next = 1;
        } else if (this.state.pitches < 36) {
            next = 2;
        } else if (this.state.pitches < 51) {
            next = 3;
        } else if (this.state.pitches < 66) {
            next = 4;
        } else {
            next = 5;
        }

        if (this.state.date < 0) {
            errorMsg = 'Please provide date pitched/caught';
        } else if (!this.state.name) {
            errorMsg = 'Please provide player\'s name';
        } else if (!this.state.team) {
            errorMsg = 'Please provide player\'s team';
        } else if (this.state.age < 7 || this.state.age > 13)  {
            errorMsg = 'Please provide player\'s age';
        } else if (!this.state.coach) {
            errorMsg = 'Please provide player\'s coach';
        } else if (this.state.pitches < 0) {
            errorMsg = 'Please provide player\'s pitch count';
        } else if (this.state.catching < 0) {
            errorMsg = 'Please provide player\'s innings caught';
        } 
        
        if (this.state.age < 9 && this.state.pitches > 50) {
            warningMsg = 'Over 50 pitch max';
        } else if (this.state.age > 8 && this.state.age < 11 && this.state.pitches > 75) {
            warningMsg = 'Over 75 pitch max';
        } else if (this.state.age > 10 && this.state.age < 13 && this.state.pitches > 85) {
            warningMsg = 'Over 85 pitch max';
        } else if (this.state.age > 12 && this.state.age < 15 && this.state.pitches > 95) {
            warningMsg = 'Over 95 pitch max';
        } else if (this.state.pitches > 40 && this.state.catching > 0) {
            warningMsg = 'Threw over 40 pitches and caught';
        } else if (this.state.catching > 3 && this.state.pitches > 0) {
            warningMsg = 'Caught more than 3 innings and pitched';
        }  
        
        if (errorMsg == '') {
            console.log('Submitted');
            this.props.onSubmit({
                date: this.state.date.valueOf(),
                name: this.state.name,
                team: this.state.team,
                age: this.state.age,
                coach: this.state.coach,
                pitches: this.state.pitches,
                catching: this.state.catching,
                notes: warningMsg,
                nextAvailable: moment(this.state.date).add(next, 'days').valueOf(),
            });
        }
        else {
            this.setState(() => ({ error: errorMsg }));
        }
    };

    render() {
        return (
          <form className="form" onSubmit={this.onSubmit}>
            {this.state.error && <p className="form__error">{this.state.error}</p>}
            <SingleDatePicker
              date={this.state.date}
              onDateChange={this.onDateChange}
              focused={this.state.calendarFocused}
              onFocusChange={this.onFocusChange}
              numberOfMonths={1}
              isOutsideRange={() => false}
            />
            <input
              type="text"
              placeholder="Player Name"
              autoFocus
              className="text-input"
              value={this.state.name}
              onChange={this.onNameChange}
            />
            <input
              type="text"
              placeholder="Team"
              className="text-input"
              value={this.state.team}
              onChange={this.onTeamChange}
            />
            <input
              type="number"
              placeholder="Player Age"
              min="7"
              max="13"
              className="number-input"
              value={this.state.age}
              onChange={this.onAgeChange}
            />
            <input
              type="text"
              placeholder="Coach"
              className="text-input"
              value={this.state.coach}
              onChange={this.onCoachChange}
            />
            <input
              type="number"
              placeholder="Pitches"
              min="0"
              max="120"
              className="number-input"
              value={this.state.pitches}
              onChange={this.onPitchesChange}
            />
            <input
              type="number"
              placeholder="Innings Caught"
              min="0"
              max="120"
              className="number-input"
              value={this.state.catching}
              onChange={this.onCatchingChange}
            />
            <div>
              <button className="button">Save PitchCount Data</button>
            </div>
          </form>
        )
    }
}