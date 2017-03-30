import React from 'react';
import TrackList from './TrackList';
const { object } = React.PropTypes;

const AlbumDisplay = ({albumData}) => {
  const formattedDate = albumData.release_date.replace(/(\d{4})-(\d{2})-(\d{2})/, '$2/$3/$1');
  return (
    <div className='AlbumDisplay-container'>
      <img src={albumData.images[1].url} alt='Album Cover' />
      <h1><a href={albumData.external_urls.spotify}>{albumData.name}</a></h1>
      <h2>by {albumData.artists[0].name}</h2>
      <TrackList tracks={albumData.tracks.items} />
      <h4>released {formattedDate}</h4>
    </div>
  );
};

AlbumDisplay.propTypes = {
  albumData: object
};

export default AlbumDisplay;
