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

export function postCreateRecipe(json) {
  return function (dispatch) {
    dispatch(requestCreateRecipe())
    return api.post('/ics/recipes/')
      .send(json)
      .then((res) => {
	      return dispatch(requestCreateRecipeSuccess(res.body))
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

export function postDeleteRecipe(p, index, callback) {
  return function (dispatch) {
    dispatch(requestDeleteRecipe(index))

    return api.put(`/ics/recipes/${p.id}/`)
      .send({ 
          name: p.name,
          code: p.code,
          created_by: p.created_by,
          team_created_by: p.team_created_by,
          is_trashed: true,
        })
	    .then(() => dispatch(requestDeleteRecipeSuccess(index)))
	    .catch(err => dispatch(requestDeleteRecipeFailure(index, err)))
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
