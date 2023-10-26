import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from "./model.js";
import recipeView from "./view/recipeView.js";
import { async } from 'regenerator-runtime';
import searchView from './view/searchView.js';
import ResultsView from "./view/viewResults.js"
import BookmarksView from './view/bookmarksView.js';
import PaginationView from "./view/pageView.js";
import addRecipeView from './view/addRecipeView.js';
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

    BookmarksView.update(model.state.bookmarks);

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
  // 1. Add/remove bookmarks
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // 2. Update recipe view
  recipeView.update(model.state.recipe);

  // 3. Render bookmarks
  BookmarksView.render(model.state.bookmarks);

}

const controlBookmarks = function () {
  BookmarksView.render(model.state.bookmarks);
}

const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe);
    // console.log(model.state.recipe);
    recipeView.render(model.state.recipe);

    addRecipeView.renderMessage('Recipe succesfully added!');

    setTimeout(function () {
      addRecipeView.toggleWindow()
    }, 800);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }


}

const init = function () {
  BookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandler(controlRecipes);
  recipeView.addHandlerUpdateServings(controlQuantity);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandler(controlSearchResults);
  PaginationView.addHandler(controlPage);
  addRecipeView.addHandlerUpload(controlAddRecipe);
}
init();