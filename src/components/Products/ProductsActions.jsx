import * as actions from '../../reducers/APIDataActions'
import { PRODUCTS } from '../../reducers/ReducerTypes'
import {alphabetize} from '../../utilities/arrayutils.jsx'

export function fetchProducts(q) {
  let request = { 
    url: '/ics/products/', 
    query: q,
  }
  return actions.fetch(PRODUCTS, request, null, res => res.body)
}

export function pageProducts(direction) {
  return actions.page(PRODUCTS, direction)
}

export function postCreateProduct(json) {
	let request = {
		url: '/ics/products/',
		data: json
	}
	return actions.postCreate(PRODUCTS, request, alphabetize, res => res.body)
}

export function postDeleteProduct(product, index) {
  let request = { 
    url: `/ics/products/${product.id}/`, 
    data: { is_trashed: true } 
  }
  return actions.softDelete(PRODUCTS, request, index)
}

export function postEditProduct(product, newData, index) {
  let request = {
    url: `/ics/products/${product.id}/`,
    data: newData
  }
  return actions.patchEdit(PRODUCTS, request, index, res => res.body)
}

export function selectProduct(id) {
	return actions.select(PRODUCTS, id)
}
