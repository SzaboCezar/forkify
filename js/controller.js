import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from "./model.js";
import recipeView from "./view/recipeView.js";
import { async } from 'regenerator-runtime';
import searchView from './view/searchView.js';
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    // Render spinner
    recipeView.renderSpinner()

    //Load recipe
    await model.loadRecipe(id);

    // Render recipe
    recipeView.render(model.state.recipe);

  } catch (error) {
    recipeView.renderError()
  }
}

const controlSearchResults = async function () {

  try {

    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);
    console.log(model.state.search.results);

  } catch (error) {
    console.log(error);
  }
}

const init = function () {
  recipeView.addHandler(controlRecipes);
  searchView.addHandler(controlSearchResults);

}
init();

