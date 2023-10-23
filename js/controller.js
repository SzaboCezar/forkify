import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from "./model.js";
import recipeView from "./view/recipeView.js";
import { async } from 'regenerator-runtime';
import searchView from './view/searchView.js';
import ResultsView from "./view/viewResults.js"
import PaginationView from "./view/pageView.js"
import pageView from './view/pageView.js';
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// if (module.hot) {
//   module.hot.accept();
// }

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
    ResultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);
    console.log(model.state.search.results);
    // ResultsView.render(model.state.search.results);
    ResultsView.render(model.resultsPerPage(1));

    PaginationView.render(model.state.search);


  } catch (error) {
    console.log(error);
  }
}

const controlPage = function (goToPage) {
  ResultsView.render(model.resultsPerPage(goToPage));

  PaginationView.render(model.state.search);
}

const init = function () {
  recipeView.addHandler(controlRecipes);
  searchView.addHandler(controlSearchResults);
  PaginationView.addHandler(controlPage);
}
init();

