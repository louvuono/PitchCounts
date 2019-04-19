import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const PitchCountListItem = ({ id, date, name, team, age, coach, pitches, catching, notes, nextAvailable}) => (
  <Link className="list-item" to={`/edit/${id}`}>
    <p className="list-item__date">{moment(date).format('M/D/YYYY')}</p>
    <p className="list-item__name">{name}</p>
    <p className="list-item__team">{team} </p>
    <p className="list-item__coach">{coach} </p>
    <p className="list-item__pitches">{numeral(pitches).format('0')}</p>
    <p className="list-item__caught">{numeral(catching).format('0')}</p>
    <p className="list-item__avail">{moment(nextAvailable).format('M/D/YYYY')}</p>
    <p className="list-item__note">{notes}</p>
  </Link>
);

export default PitchCountListItem;