import React from 'react';
import { connect } from 'react-redux';
import PitchCountListItem from './PitchCountListItem';
import selectPitchCounts from '../selectors/pitchcounts';

export const PitchCountList = (props) => (
    <div className="content-container">
      <div className="list-header">
        <div className="show-for-mobile">PitchCounts</div>
        <div className="list-heading-date">Date</div>
        <div className="list-heading-name">Player</div>
        <div className="list-heading-team">Team</div>
        <div className="list-heading-coach">Coach</div>
        <div className="list-heading-pitches">Pitches</div>
        <div className="list-heading-caught">Catching</div>
        <div className="list-heading-avail">Next Available</div>
        <div className="list-heading-notes">Notes</div>
      </div>
      <div className="list-body">
        {
          props.pitchcounts.length === 0 ? (
            <div className="list-item list-item--message">
              <span>No PitchCounts</span>
            </div>
          ) : (
              props.pitchcounts.map((pitchcount) => {
                let warn = 'Red';
                return <PitchCountListItem key={pitchcount.id} {...pitchcount} />;
              })
            )
        }
      </div>
    </div>
);

const mapStateToProps = (state) => {
    return {
        pitchcounts: selectPitchCounts(state.pitchcounts, state.filters)
    };
};

export default connect(mapStateToProps)(PitchCountList);

