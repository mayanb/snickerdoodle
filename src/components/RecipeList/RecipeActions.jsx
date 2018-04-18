import api from '../WaffleconeAPI/api.jsx'
import {
  REQUEST, 
  REQUEST_SUCCESS, 
  REQUEST_FAILURE,
  REQUEST_CREATE,
  REQUEST_CREATE_SUCCESS,
  REQUEST_CREATE_FAILURE,
  REQUEST_DELETE,
  REQUEST_DELETE_SUCCESS,
  REQUEST_DELETE_FAILURE,
  PAGE,
  SELECT,
} from '../../reducers/APIDataReducer'
import { RECIPES } from '../../reducers/ReducerTypes'
import {alphabetizeRecipesByStage} from '../../utilities/arrayutils.jsx'


export function fetchRecipes(q) {
  return function (dispatch) {
    // dispatch an action that we are requesting a product
    dispatch(requestRecipes())

    // actually fetch 
    return api.get('/ics/recipes/')
      .query(q)
      .then(res => dispatch(requestRecipesSuccess(res.body.sort(alphabetizeRecipesByStage))))
      .catch(err => dispatch(requestRecipesFailure(err)))
  }
}

function requestRecipes() {
  return {
    name: RECIPES,
    type: REQUEST
  }
}

function requestRecipesFailure(err) {
  console.error('Oh no! Something went wrong\n', err)
  return {
    name: RECIPES,
    type: REQUEST_FAILURE, 
    error: err
  }
}

function requestRecipesSuccess(json) {
  return {
    name: RECIPES,
    type: REQUEST_SUCCESS, 
    data: json
  }
}

export function pageRecipes(direction) {
  return {
    type: PAGE,
    direction: direction,
    name: RECIPES,
  }
}

export function postCreateRecipe(recipe, ingredients = []) {
  return function (dispatch) {
    dispatch(requestCreateRecipe())
    return api.post('/ics/recipes/')
      .send(recipe)
      .then(res => {
        let id = res.body.id
        api.post('/ics/ingredients/bulk-create/')
          .type('form-data')
          .send({ recipe: id, ingredients: JSON.stringify([{process_type: 8, product_type: 44, amount: 1}]) })
          .then(res => dispatch(requestCreateRecipeSuccess(res.body)))
      })
      .catch((err) => dispatch(requestCreateRecipeFailure(err)))
  }
}


function requestCreateRecipe() {
  return {
    type: REQUEST_CREATE, 
    name: RECIPES
  }
}

function requestCreateRecipeFailure(err) {
  console.error('Oh no! Something went wrong!\n' + JSON.stringify(err))
  return {
    type: REQUEST_CREATE_FAILURE,
    name: RECIPES,
    error: err,
  }
}

function requestCreateRecipeSuccess(json) {
  return {
    type: REQUEST_CREATE_SUCCESS,
    item: json,
    sort: alphabetizeRecipesByStage,
    name: RECIPES,
  }
}

export function postDeleteRecipe(recipe, index) {
  return function (dispatch) {
    dispatch(requestDeleteRecipe(index))

    return api.patch(`/ics/recipes/${recipe.id}/`)
      .send({ 
          is_trashed: true,
        })
	    .then(() => dispatch(requestDeleteRecipeSuccess(index)))
	    .catch(err => {
        dispatch(requestDeleteRecipeFailure(index, err))
        console.log(err)
      })
  }
}


function requestDeleteRecipe(index) {
  return {
    type: REQUEST_DELETE,
    // index: index,
    name: RECIPES
  }
}

function requestDeleteRecipeFailure(index, err) {
  return {
    type: REQUEST_DELETE_FAILURE,
    index: index,
    name: RECIPES,
    error: err
  }
}

function requestDeleteRecipeSuccess(field, value, index) {
  return {
    type: REQUEST_DELETE_SUCCESS,
    name: RECIPES,
    index: index,
  }
}

export function selectRecipe(id) {
  return {
    type: SELECT,
    index: id,
    name: RECIPES,
  }
}
