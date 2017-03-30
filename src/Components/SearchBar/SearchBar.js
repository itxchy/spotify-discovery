/* global fetch */
import React, { Component } from 'react';
import './SearchBar.css';
import SearchForm from './SearchForm/SearchForm';
const { func } = React.PropTypes;

class SearchBar extends Component {
  constructor (props) {
    super(props);

    this.state = {
      searchFormText: '',
      searchQuery: '',
      artistData: []
    };
  }

  handleSearch = (query) => {
    if (!query) { return; }
    fetch(`https://api.spotify.com/v1/search?type=artist&limit=5&q=${query}`)
      .then(res => res.json())
      .then(json => {
        return this.setState({ artistData: json.artists.items, searchQuery: query });
      })
      .catch(err => console.error('SearchBar.js: handleSearch failed', err));
  };

  handleSearchFormChange = (input) => {
    this.setState({ searchFormText: input });
  };

  handleSearchFormSubmit = (evt) => {
    evt.preventDefault();
    if (!this.state.searchFormText || this.state.artistData.length < 1) {
      return this.props.onSearchSubmit(false);
    }
    this.props.onSearchSubmit(this.state.artistData[0].id);
  };

  handleTypeaheadResultClick = (artistId) => {
    this.props.onSearchSubmit(artistId);
  };

  render () {
    return (
      <div className='SearchBar-container'>
        <SearchForm
          artistData={this.state.artistData}
          handleSearchFormSubmit={this.handleSearchFormSubmit}
          handleSearch={this.handleSearch}
          handleSearchFormChange={this.handleSearchFormChange}
          handleTypeaheadResultClick={this.handleTypeaheadResultClick} />
      </div>
    );
  }
}

SearchBar.propTypes = {
  onSearchSubmit: func
};

export default SearchBar;
