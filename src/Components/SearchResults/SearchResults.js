import React from 'react';
import AlbumResult from './AlbumResult/AlbumResult';

const { array } = React.PropTypes;

const SearchResults = (props) => {
  const populateAlbumResults = () => {
    const filteredResults = props.albumListData.filter((album) => {
      return album.available_markets.includes('US');
    });
    return filteredResults.map((album) => (
      <AlbumResult key={album.id} name={album.name} id={album.id} />
    ));
  };

  if (props.albumListData.length === 0) {
    return null;
  }

  const populatedResults = populateAlbumResults();

  return (
    <section>
      {populatedResults}
    </section>
  );
};

SearchResults.propTypes = {
  albumListData: array
};

export default SearchResults;
