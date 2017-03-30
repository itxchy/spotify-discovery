/* global fetch */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import AlbumDetails from '../SearchResults/AlbumDetails/AlbumDetails';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      albumListData: [],
      artistId: '',
      newQuery: false,
      noResults: false
    };
  }

  handleSearchSubmit = (artistId) => {
    if (!artistId) {
      this.setState({ noResults: true, newQuery: false, albumListData: [] });
    }
    this.setState({ artistId: artistId, newQuery: true, noResults: false });
  };

  fetchAlbumData = (artistId) => {
    if (!artistId) {
      console.error('App.js: no artist id given to fetchAlbumData', artistId);
      return this.setState({ noResults: true, newQuery: false, albumListData: [] });
    }
    fetch(`https://api.spotify.com/v1/artists/${artistId}/albums`)
      .then(res => res.json())
      .then(json => {
        return this.setState({ albumListData: json.items, newQuery: false, noResults: false });
      })
      .catch(err => console.error('App.js: fetchAlbumData failed', err));
  };

  componentDidUpdate () {
    if (this.state.newQuery) {
      this.fetchAlbumData(this.state.artistId);
    }
  }

  render () {
    return (
      <Router>
        <div className='App'>
          <h1 className='App-h1'>Spotify Discovery</h1>
          <SearchBar onSearchSubmit={this.handleSearchSubmit} />
          {this.state.noResults ? <h1>Nothing Found</h1> : null}

          <Switch>
            <Route exact path='/' render={() =>
              <SearchResults albumListData={this.state.albumListData} />
            } />
            <Route path='/:id' render={(props) => (
              this.state.newQuery ? <Redirect to='/' /> : <AlbumDetails id={props.match.params.id} />
            )} />
            <Route component={() => <h1>Album not found.</h1>} />
          </Switch>

        </div>
      </Router>
    );
  }
}

export default App;
