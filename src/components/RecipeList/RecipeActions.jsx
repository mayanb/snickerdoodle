import api from '../WaffleconeAPI/api.jsx'
import * as actions from '../../reducers/APIDataActions'
import { RECIPES } from '../../reducers/ReducerTypes'
import {alphabetizeRecipesByStage} from '../../utilities/arrayutils.jsx'

export function fetchRecipes(q) {
  let request = { 
    url: '/ics/recipes/', 
    query: q,
  }
  return actions.fetch(RECIPES, request, alphabetizeRecipesByStage, res => res.body)
}

export function postCreateRecipe(recipe, ingredients = []) {
  let request = { 
    url: '/ics/recipes/', 
    data: recipe 
  }
  return actions.postCreate(RECIPES, request, alphabetizeRecipesByStage, async (res) => {
    let id = res.body.id
    let resIngredients = await api.post('/ics/ingredients/bulk-create/')
      .type('form-data')
      .send({ recipe: id, ingredients: JSON.stringify(ingredients) })
    res.body.ingredients = resIngredients.body
    return res.body
  })
}

export function postDeleteRecipe(recipe, index) {
  let request = { 
    url: `/ics/recipes/${recipe.id}/`, 
    data: { is_trashed: true } 
  }
  return actions.postDelete(RECIPES, request, index)
}

export function selectRecipe(id) {
  return actions.select(RECIPES, id)
}
