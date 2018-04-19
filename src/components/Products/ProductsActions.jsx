import api from '../WaffleconeAPI/api.jsx'
import * as actions from '../../reducers/BasicActions'
import { PRODUCTS } from '../../reducers/ReducerTypes'
import {alphabetize} from '../../utilities/arrayutils.jsx'

export function fetchProducts(q) {
  return function (dispatch) {
    dispatch(actions.request(PRODUCTS))
    return api.get('/ics/products/')
      .query(q)
      .then(res => dispatch(actions.requestSuccess(PRODUCTS, res.body, alphabetize)))
      .catch(err => dispatch(actions.requestFailure(PRODUCTS, err)))
  }
}

export function pageProducts(direction) {
  return actions.page(PRODUCTS, direction)
}

export function postCreateProduct(json) {
  return function (dispatch) {
    dispatch(actions.requestCreate(PRODUCTS))

    return api.post('/ics/products/')
      .send(json)
      .then((res) => {
	      return dispatch(actions.requestCreateSuccess(PRODUCTS, res.body, alphabetize))
      })
      .catch((err) => dispatch(actions.requestCreateFailure(PRODUCTS, err)))
  }
}


export function postDeleteProduct(p, index, callback) {
  return function (dispatch) {
    dispatch(actions.requestDelete(PRODUCTS, index))
    return api.put(`/ics/products/${p.id}/`)
      .send({ 
          name: p.name,
          code: p.code,
          created_by: p.created_by,
          team_created_by: p.team_created_by,
          is_trashed: true,
        })
	    .then(() => dispatch(actions.requestDeleteSuccess(PRODUCTS, index)))
	    .catch(err => dispatch(actions.requestDeleteFailure(PRODUCTS, index, err)))
  }
}
