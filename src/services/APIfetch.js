export const fetchIngredient = async (ingredient, type) => {
  const urlType = type === 'meals' ? 'themealdb' : 'thecocktaildb';
  try {
    const response = await fetch(`https://www.${urlType}.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const result = await response.json();
    return result[type];
  } catch (err) {
    console.log(`${err.name}:${err.message}`);
  }
};

export const fetchByName = async (name, type) => {
  const urlType = type === 'meals' ? 'themealdb' : 'thecocktaildb';
  try {
    const response = await fetch(`https://www.${urlType}.com/api/json/v1/1/search.php?s=${name}`);
    const result = await response.json();
    return result[type];
  } catch (err) {
    console.log(`${err.name}:${err.message}`);
  }
};

export const fetchByFirstLetter = async (firstLetter, type) => {
  const urlType = type === 'meals' ? 'themealdb' : 'thecocktaildb';
  try {
    const response = await fetch(`https://www.${urlType}.com/api/json/v1/1/search.php?f=${firstLetter}`);
    const result = await response.json();
    return result[type];
  } catch (err) {
    console.log(`${err.name}:${err.message}`);
  }
};

export const fetchRecipesByType = async (type) => {
  const urlType = type === 'meals' ? 'themealdb' : 'thecocktaildb';
  try {
    const response = await fetch(`https://www.${urlType}.com/api/json/v1/1/search.php?s=`);
    const result = await response.json();
    return result[type];
  } catch (err) {
    console.log(`${err.name}:${err.message}`);
  }
};

export const fetchByCategory = async (type) => {
  const urlType = type === 'meals' ? 'themealdb' : 'thecocktaildb';
  const response = await fetch(`https://www.${urlType}.com/api/json/v1/1/list.php?c=list`);
  const data = await response.json();
  return data[type];
};

export const fetchDetais = async (id, type) => {
  const urlType = type === 'meals' ? 'themealdb' : 'thecocktaildb';
  const response = await fetch(`https://www.${urlType}.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  return data[type];
};

export const fetchRecipesByCategory = async (type, category) => {
  const urlType = type === 'meals' ? 'themealdb' : 'thecocktaildb';
  const response = await fetch(`https://www.${urlType}.com/api/json/v1/1/filter.php?c=${category}`);
  const data = await response.json();
  return data[type];
};

export const fetchGetTypeInvert = async (type) => {
  const urlType = type === 'meals' ? 'thecocktaildb' : 'themealdb';
  const typeInvert = type === 'meals' ? 'drinks' : 'meals';
  const response = await fetch(`https://www.${urlType}.com/api/json/v1/1/search.php?s=`);
  const data = await response.json();
  return data[typeInvert];
};

export const getLocalStorage = (key, defaultValue) => {
  const favoriteRecipes = localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key)) : defaultValue;
  return favoriteRecipes;
};

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
