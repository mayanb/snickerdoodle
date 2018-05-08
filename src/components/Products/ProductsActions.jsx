import * as actions from '../../reducers/APIDataActions'
import { PRODUCTS, RECIPES } from '../../reducers/ReducerTypes'
import {alphabetize} from '../../utilities/arrayutils.jsx'
import api from '../WaffleconeAPI/api.jsx'
import {
  REQUEST, 
  REQUEST_SUCCESS, 
  REQUEST_FAILURE,
	REQUEST_CREATE,
	REQUEST_CREATE_SUCCESS,
	REQUEST_CREATE_FAILURE,
} from '../../reducers/APIDataReducer'

export function fetchProducts(q) {
  let request = { 
    url: '/ics/products/', 
    query: q,
  }
  return actions.fetch(PRODUCTS, request, alphabetize, res => res.body)
}

export function fetchRecipes() {
  return function (dispatch) {
    // dispatch an action that we are requesting a product
    dispatch(requestRecipes())

    // actually fetch 
    return api.get('/ics/recipes/')
      .then(res => dispatch(requestRecipesSuccess(res.body)))
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
export function pageProducts(direction) {
  return actions.page(PRODUCTS, direction)
}

export function postCreateProduct(json) {
	return function (dispatch) {
		dispatch(requestCreateProduct())
		return api.post('/ics/products/')
			.send(json)
			.then((res) => dispatch(requestCreateProductSuccess(res.body)))
			.catch((err) => dispatch(requestCreateProductFailure(err)))
	}
}

function requestCreateProduct() {
	return {
		type: REQUEST_CREATE,
		name: PRODUCTS
	}
}

function requestCreateProductFailure(err) {
	console.error('Error creating prdouct', err)
	return {
		type: REQUEST_CREATE_FAILURE,
		name: PRODUCTS,
		error: err,
	}
}

function requestCreateProductSuccess(json) {
	return {
		type: REQUEST_CREATE_SUCCESS,
		item: json,
		sort: alphabetize,
		name: PRODUCTS
	}
}

export function postDeleteProduct(product, index) {
  let request = { 
    url: `/ics/products/${product.id}/`, 
    data: { is_trashed: true } 
  }
  return actions.postDelete(PRODUCTS, request, index)
}

export function postEditProduct(product, newData, index) {
  let request = {
    url: `/ics/products/${product.id}/`,
    data: newData
  }
  return actions.postEdit(PRODUCTS, request, index, res => res.body)
}