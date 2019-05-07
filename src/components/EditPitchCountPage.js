import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import PitchCountForm from './PitchCountForm';
import { startEditPitchCount, startRemovePitchCount } from '../actions/pitchcounts';

export class EditPitchCountPage extends React.Component {
    onSubmit = (pitchcount) => {
        this.props.startEditPitchCount(this.props.pitchcount.id, pitchcount);
        this.props.history.push('/');
    };
    onRemove = () => {
        this.props.startRemovePitchCount({ id: this.props.pitchcount.id });
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
                <h1 className="page-header__title">Edit Pitch Count</h1>
              </div>
            </div>
            <div className="content-container">
              <PitchCountForm
                pitchcount={this.props.pitchcount}
                onSubmit={this.onSubmit}
              />
              <button className="button button--secondary" onClick={this.onRemove}>Remove Pitch Count</button>
              <button className="button button--secondary" onClick={this.onCancel}>Cancel</button>
            </div>
          </div>
        );
    }
};


const mapStateToProps  = (state, props) => {
    return {
        pitchcount: state.pitchcounts.find((pitchcount) => pitchcount.id === props.match.params.id)
    };
};

const mapDispatchToProps = (dispatch, props) =>({
    startEditPitchCount: (id, pitchcount) => dispatch(startEditPitchCount(id, pitchcount)),
    startRemovePitchCount: (data) => dispatch(startRemovePitchCount(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPitchCountPage);