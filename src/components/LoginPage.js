import React from 'react';
import { connect } from 'react-redux';
import { startLogin, setAdmin, setTeamCoach } from '../actions/auth';

export class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      team: 'Select Team/Coach',
      teamName: '',
      coachName:  '',
      admin: false,
      userName: '',
      error: ''
    };
  };

  onSubmit = (pitchcount) => {
    console.log('Login');
    if (this.state.userName === null) {
      alert('Please enter your name');
    }
    else if (this.state.teamName === null) {
      alert('Please select team/coach');
    }
    else if (this.state.coachName === null) {
      alert('Please select team/coach');
    }
    else {
      this.props.startLogin();
      this.props.history.push('/');
    }
  };

  onUserChange = (e) => {
    const userName = e.target.value;
    console.log('User is ' + userName);
    this.setState(() => ({ userName }));
    if (userName === '*ADMIN*') {
      this.props.setAdmin(true);
    } else {
      this.props.setAdmin(false);
    }
  };

  onTeamChange = (e) => {
    const teamCoachName = e.target.value;
    this.setState(() => ({ team: teamCoachName }));
    let res = teamCoachName.split("-");
    let teamName = res[0];
    let coachName = res[1];
    this.props.setTeamCoach(teamName, coachName);
  };

  render() {
    let coachList = [
      "Minor Prep-Clark", "Minor Prep-Comes", "Minor Prep-Febo",
      "Minors-Braun", "Minors-Gladulich", "Minors-Thomas",
      "Majors-Fitzpatrick", "Majors-Kirsch", "Majors-Staudenmeyer", "Majors-Young/Skillman",
      "Travel 9-McArdle", "Travel 10-Adair", "Travel 11-Herrera", "Travel 12-Staudenmeyer"
    ];

    return (
      <div className="box-layout">
        <div className="box-layout__box">
          <h1 className="box-layout__title">PBA Pitch Counts</h1>
          <p>Tracking Pitch Counts and Catcher Innings</p>
          <input
              type="text"
              placeholder="Your name"
              autoFocus
              className="text-input"
              onChange={this.onUserChange}
          />
          <select
              name="Team/Coaches"
              className="text-input"
              value={this.state.team}
              defaultValue="Select Team/Coach"
              onChange={this.onTeamChange}
          >
              <option value="Select Team/Coach">Select Team/Coach</option>
              <option value={coachList[0]}>{coachList[0]}</option>
              <option value={coachList[1]}>{coachList[1]}</option>
              <option value={coachList[2]}>{coachList[2]}</option>
              <option value={coachList[3]}>{coachList[3]}</option>
              <option value={coachList[4]}>{coachList[4]}</option>
              <option value={coachList[5]}>{coachList[5]}</option>
              <option value={coachList[6]}>{coachList[6]}</option>
              <option value={coachList[7]}>{coachList[7]}</option>
              <option value={coachList[8]}>{coachList[8]}</option>
              <option value={coachList[9]}>{coachList[9]}</option>
              <option value={coachList[10]}>{coachList[10]}</option>
              <option value={coachList[11]}>{coachList[11]}</option>
              <option value={coachList[12]}>{coachList[12]}</option>
              <option value={coachList[13]}>{coachList[13]}</option>
          </select>
          <p>
            <button className="button" onClick={this.onSubmit}>Login</button>
          </p>
          
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      team: state.team,
      auth: state.auth,
      teamName: state.teamName,
      coachName: state.coachName
  };
};

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin()),
  setAdmin: (isAdmin) => dispatch(setAdmin(isAdmin)),
  setTeamCoach: (team, coach) => dispatch(setTeamCoach(team, coach))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);