import React from 'react';
import PitchCountForm from './PitchCountForm';
import { connect } from 'react-redux';
import { startAddPitchCount } from '../actions/pitchcounts';

export class AddPitchCountPage extends React.Component {
  constructor(props) {
    super(props);
  };

  onSubmit = (pitchcount) => {
    console.log('Add pitch count');
    this.props.startAddPitchCount(pitchcount);
    this.props.history.push('/');
  };

  onCancel = () => {
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Add Pitch Count</h1>
          </div>
        </div>
        <div className="content-container">
          <PitchCountForm 
            teamName={this.props.teamName}
            coachName={this.props.coachName}
            onSubmit={this.onSubmit}
            onCancel={this.onCancel}
            on
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      admin: state.auth.admin,
      teamName: state.auth.teamName,
      coachName: state.auth.coachName
  };
};

const mapDispatchToProps = (dispatch) =>({
    startAddPitchCount: (pitchcount) => dispatch(startAddPitchCount(pitchcount))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPitchCountPage);