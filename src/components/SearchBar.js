import React, { useContext } from 'react';
import MyContext from '../context/MyContext';
import { fetchIngredient, fetchByFirstLetter, fetchByName } from '../services/APIfetch';

function SearchBar() {
  const { setRadioSearch, radioSearch, inputSearch } = useContext(MyContext);
  const radioChangeSearch = ({ target }) => {
    setRadioSearch(target.value);
  };

  const searchButtonAPI = () => {
    switch (radioSearch) {
    case 'ingredient': return fetchIngredient(inputSearch);
    case 'name': return fetchByName(inputSearch);
    default: return fetchByFirstLetter(inputSearch);
    }
  };
  console.log(searchButtonAPI);
  return (

    <div>
      <input
        onChange={ radioChangeSearch }
        value="ingredient"
        name="search"
        data-testid="ingredient-search-radio"
        type="radio"
      />
      Ingredient
      <input
        onChange={ radioChangeSearch }
        value="name"
        name="search"
        data-testid="name-search-radio"
        type="radio"
      />
      Name
      <input
        onChange={ radioChangeSearch }
        value="first letter"
        name="search"
        data-testid="first-letter-search-radio"
        type="radio"
      />
      First letter
      <button
        onClick={ searchButtonAPI }
        data-testid="exec-search-btn"
        type="button"
      >
        Busca

      </button>
    </div>
  );
}

export default SearchBar;
