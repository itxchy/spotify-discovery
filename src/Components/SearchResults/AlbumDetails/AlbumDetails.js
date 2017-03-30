/* global fetch */
import React, { Component } from 'react';
import AlbumDisplay from './AlbumDisplay/AlbumDisplay';
const { string } = React.PropTypes;

class AlbumDetails extends Component {
  constructor (props) {
    super(props);
    this.state = {
      albumData: {},
      error: false,
      loaded: false
    };
  }

  fetchAlbumData = () => {
    fetch(`https://api.spotify.com/v1/albums/${this.props.id}`)
      .then(res => res.json())
      .then(json => {
        return this.setState({ albumData: json, loaded: true });
      })
      .catch(err => {
        console.log('AlbumDetails.js: fetchAlbumData failed', err);
        return this.setState({ error: true });
      });
  };

  componentDidMount = () => {
    this.fetchAlbumData();
  };

  render () {
    if (this.state.error) {
      return <h1>An error occurred.</h1>;
    }
    if (!this.state.loaded) {
      return null;
    }
    return (
      <AlbumDisplay albumData={this.state.albumData} />
    );
  }
}

AlbumDetails.propTypes = {
  id: string
};

export default AlbumDetails;
