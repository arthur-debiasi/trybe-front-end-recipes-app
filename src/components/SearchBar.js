import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import { RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { Stack } from 'react-bootstrap';
import MyContext from '../context/MyContext';
import RecipeContext from '../context/RecipeContext';
import { fetchIngredient, fetchByFirstLetter, fetchByName } from '../services/APIfetch';

function SearchBar({ history }) {
  const { setRadioSearch, radioSearch, inputSearch } = useContext(MyContext);
  const { setApiData } = useContext(RecipeContext);
  const radioChangeSearch = ({ target }) => {
    setRadioSearch(target.value);
  };

  const type = history.location.pathname.substring(1);
  const idType = type === 'drinks' ? 'idDrink' : 'idMeal';
  const searchButtonAPI = async () => {
    const messageAlert = 'Sorry, we haven\'t found any recipes for these filters.';
    switch (radioSearch) {
    case 'ingredient': {
      const response = await fetchIngredient(inputSearch, type);
      if (response === null) {
        global.alert(messageAlert);
      } else if (response.length === 1) {
        history.push(
          `/${type}/${response[0][idType]}`,
        );
      } else {
        setApiData(response);
      }
    }
      break;
    case 'name': {
      const response = await fetchByName(inputSearch, type);
      if (response === null) {
        global.alert(messageAlert);
      } else if (response.length === 1) {
        history.push(
          `/${type}/${response[0][idType]}`,
        );
      } else {
        setApiData(response);
      }
    }
      break;
    default: {
      const response = await fetchByFirstLetter(inputSearch, type);
      if (inputSearch.length !== 1) {
        global.alert('Your search must have only 1 (one) character');
        break;
      }
      if (response === null) {
        global.alert(messageAlert);
      } else if (response.length === 1) {
        history.push(
          `/${type}/${response[0][idType]}`,
        );
      } else {
        setApiData(response);
      }
    }
    }
  };
  return (
    <Stack>
      <div className="card-radio">
        <RadioGroup column name="search">
          <FormControlLabel
            label="Ingredient"
            control={ <Radio /> }
            onChange={ radioChangeSearch }
            value="ingredient"
            name="search"
            data-testid="ingredient-search-radio"
            type="radio"
          />
          <FormControlLabel
            label="Name"
            control={ <Radio /> }
            onChange={ radioChangeSearch }
            value="name"
            name="search"
            data-testid="name-search-radio"
            type="radio"
          />

          <FormControlLabel
            label="First letter"
            control={ <Radio /> }
            onChange={ radioChangeSearch }
            value="first letter"
            name="search"
            data-testid="first-letter-search-radio"
            type="radio"
          />
        </RadioGroup>
        <Button
          variant="outlined"
          onClick={ searchButtonAPI }
          data-testid="exec-search-btn"
          size="large"
        >
          Busca

        </Button>
      </div>
    </Stack>
  );
}

SearchBar.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.shape({
        substring: PropTypes.func,
      }),
    }),
    push: PropTypes.func,
  }),
}.isRequired;

export default SearchBar;
