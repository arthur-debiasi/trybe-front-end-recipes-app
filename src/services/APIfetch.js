export const fetchIngredient = async (ingredient) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(`${err.name}:${err.message}`);
  }
};

export const fetchByName = async (name) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(`${err.name}:${err.message}`);
  }
};

export const fetchByFirstLetter = async (firstLetter) => {
  try {
    if (firstLetter.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
      const data = await response.json();
      return data;
    }
  } catch (err) {
    console.log(`${err.name}:${err.message}`);
  }
};
