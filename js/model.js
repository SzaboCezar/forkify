import { async } from "regenerator-runtime";

export const state = {
    recipe: {}
}

export const loadRecipe = async function (id) {
    try {
        const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
        const data = await response.json();
        if (!response.ok) throw new Error(`${response.statusText} (${response.status})`)
        let { recipe } = data.data;
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            image: recipe.image_url,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
            servings: recipe.servings,
            sourceURL: recipe.source_url
        }
    } catch (error) {
        console.error(error);
    }
}

