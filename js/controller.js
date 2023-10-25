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

    ResultsView.update(model.resultsPerPage())

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
    // console.log(model.state.search.results);
    // ResultsView.render(model.state.search.results);
    ResultsView.render(model.resultsPerPage());

    PaginationView.render(model.state.search);


  } catch (error) {
    console.log(error);
  }
}

const controlPage = function (goToPage) {
  ResultsView.render(model.resultsPerPage(goToPage));

  PaginationView.render(model.state.search);
}

const controlQuantity = function (newServings) {
  model.updateServings(newServings);
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
}

const controlAddBookmark = function () {

  console.log(model.state.recipe.bookmarked);
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  recipeView.update(model.state.recipe);
}

const init = function () {
  recipeView.addHandler(controlRecipes);
  recipeView.addHandlerUpdateServings(controlQuantity);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandler(controlSearchResults);
  PaginationView.addHandler(controlPage);
}
init();

