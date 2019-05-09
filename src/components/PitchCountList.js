import React from 'react';
import { connect } from 'react-redux';
import PitchCountListItem from './PitchCountListItem';
import PitchCountListEditItem from './PitchCountListEditItem';
import selectPitchCounts from '../selectors/pitchcounts';

export const PitchCountList = (props) => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">PitchCounts</div>
      <p className="list-item-date">Date</p>
      <p className="list-item-name">Player</p>
      <p className="list-item-age">Age</p>
      <p className="list-item-team">Division</p>
      <p className="list-item-coach">Coach</p>
      <p className="list-item-pitches">Pitches</p>
      <p className="list-item-caught">Catching</p>
      <p className="list-item-avail">Next Available</p>
      <p className="list-item-notes">Notes</p>
    </div>
    <div className="list-body">
      {
        props.pitchcounts.length === 0 ? (
          <div className="list-item list-item--message">
            <span>No PitchCounts</span>
          </div>
        ) : (
            props.admin === true ? (
            props.pitchcounts.map((pitchcount) => {
              return <PitchCountListEditItem key={pitchcount.id} {...pitchcount} />;
            })) : (
            props.pitchcounts.map((pitchcount) => {
              return <PitchCountListItem key={pitchcount.id} {...pitchcount} />;
            }))
          )
      }
    </div>
  </div>
);

const mapStateToProps = (state) => {
    return {
        pitchcounts: selectPitchCounts(state.pitchcounts, state.filters),
        admin: state.auth.admin
    };
};

export default connect(mapStateToProps)(PitchCountList);

