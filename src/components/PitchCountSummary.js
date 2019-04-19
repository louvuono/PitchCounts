import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import selectPitchCounts from '../selectors/pitchcounts';
import selectPitchCountsTotal from '../selectors/pitchcountsTotal';

export const PitchCountSummary = ({ PitchCountCount, PitchCountsTotal }) => {
    return (
        <div className="page-header">
          <div className="content-container">
            <div className="page-header__actions">
              <Link className="button" to="/create">Add Pitch Count</Link>
            </div>
          </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    const visiblePitchCounts = selectPitchCounts(state.pitchcounts, state.filters);

    return {
        PitchCountCount: visiblePitchCounts.length,
        PitchCountsTotal: selectPitchCountsTotal(visiblePitchCounts)
    };
};

export default connect(mapStateToProps)(PitchCountSummary);