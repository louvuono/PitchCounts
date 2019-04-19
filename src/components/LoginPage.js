import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export class LoginPage extends React.Component {
  constructor(props) {
    super(props);
  };  

  onSubmit = (pitchcount) => {
    console.log('Login');
    if (localStorage.getItem('userName') === null) {
      alert('Please enter your name');
    }
    else if (localStorage.getItem('teamName') === null) {
      alert('Please select team/coach');
    }
    else if (localStorage.getItem('coachName') === null) {
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
    localStorage.setItem('userName', userName);
    console.log('User Name in Local:' + localStorage.getItem('userName'));
  };

  onTeamChange = (e) => {
    const teamCoachName = e.target.value;
    let res = teamCoachName.split("-");
    let teamName = res[0];
    let coachName = res[1];
    console.log('Team is ' +teamName);
    localStorage.setItem('teamName', teamName);
    console.log('Team Name in Local:' + localStorage.getItem('teamName'));
    localStorage.setItem('coachName', coachName);
    console.log('Coach Name in Local:' + localStorage.getItem('coachName'));
  };

  render() {
    let coachList = [
      "Minor Prep-Clark", "Minor Prep-Comes", "Minor Prep-Febo",
      "Minors-Braun", "Minors-Gladulich", "Minors-Thomas",
      "Majors-Fitzpatrick", "Majors-Kirsch", "Majors-Staudenmeyer", "Majors-Young/Skillman",
      "Travel 9-McArdle", "Travel 10-Adair", "Travel 11-Herrera", "Travel 12-Staudenmeyer"
    ];

    let userName = localStorage.getItem('coachName');
    if (userName === null) {
      userName = 'Select team/coach';
    }

    return (
      <div className="box-layout">
        <div className="box-layout__box">
          <h1 className="box-layout__title">PBA Pitch Counts</h1>
          <p>Tracking Pitch Counts and Catcher Innings</p>
          <input
              type="text"
              placeholder="Your name"
              autoFocus
              required
              className="text-input"
              onChange={this.onUserChange}
            />
            <div className="input-group__item">
              <select
                name="Team/Coaches"
                className="select"
                required
                onChange={this.onTeamChange}
              >
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
            </div>
          <button className="button" onClick={this.onSubmit}>Login</button>
        </div>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);