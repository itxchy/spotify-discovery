import React from 'react';
import { Link } from 'react-router-dom';
const { string } = React.PropTypes;

const AlbumResult = (props) => {
  return (
    <article className='AlbumResult-result-cell'>
      <Link to={`/${props.id}`}>
        <h2>{props.name}</h2>
      </Link>
    </article>
  );
};

AlbumResult.propTypes = {
  id: string,
  name: string
};

export default AlbumResult;
