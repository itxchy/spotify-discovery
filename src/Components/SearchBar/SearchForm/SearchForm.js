import React from 'react';
import { Form, FormGroup, Button } from 'react-bootstrap';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
const { func, array } = React.PropTypes;

const SearchForm = ({...props, handleTypeaheadResultClick}) => (
  <Form className='SearchForm-container' inline onSubmit={props.handleSearchFormSubmit}>
    <FormGroup controlId='searchInput' bsSize='large'>
      <AsyncTypeahead
        labelKey='name'
        submitFormOnEnter
        onSearch={props.handleSearch}
        onInputChange={props.handleSearchFormChange}
        options={props.artistData}
        placeholder='Which artist would you like?'
        renderMenuItemChildren={(option, props, index) => (
          <div onClick={(evt) => handleTypeaheadResultClick(option.id)}>
            <span>{option.name}</span>
          </div>
        )} />
    </FormGroup>
    <Button className='SearchForm-button' type='submit' bsSize='large'>
      Search
    </Button>
  </Form>
);

SearchForm.propTypes = {
  artistData: array,
  handleSearch: func,
  handleSearchFormChange: func,
  handleSearchFormSubmit: func,
  handleTypeaheadResultClick: func
};

export default SearchForm;
