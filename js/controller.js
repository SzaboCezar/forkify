import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from "./model.js";
import recipeView from "./view/recipeView.js";
const recipeContainer = document.querySelector('.recipe');
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

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
    console.log(error);
  }

}

const events = ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, controlRecipes));