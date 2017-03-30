import React from 'react';
import { Table } from 'react-bootstrap';
import moment from 'moment';
const { array } = React.PropTypes;

const TrackList = ({tracks}) => {
  const formattedTrackTime = (ms) => {
    const trackTime = moment.duration(ms);
    if (trackTime.asHours() > 1) {
      return Math.floor(trackTime.asHours()) + moment.utc(trackTime.asMilliseconds()).format(':mm:ss');
    }
    return moment.utc(trackTime.asMilliseconds()).format('mm:ss');
  };

  const populatedTracklist = tracks.map((track) => {
    return (
      <tr key={track.id} className='TrackList-track-row'>
        <td>{track.track_number}.</td>
        <td><a href={track.external_urls.spotify}>{track.name}</a></td>
        <td>{formattedTrackTime(track.duration_ms)}</td>
      </tr>
    );
  });

  return (
    <Table responsive className='TrackList-container'>
      <thead>
        <tr>
          <th />
          <th />
          <th />
        </tr>
      </thead>
      <tbody>
        {populatedTracklist}
      </tbody>
    </Table>
  );
};

TrackList.propTypes = {
  tracks: array
};

export default TrackList;
