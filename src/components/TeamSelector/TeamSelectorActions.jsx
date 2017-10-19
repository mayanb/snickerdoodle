import api from '../WaffleconeAPI/api.jsx'
import {
  REQUEST, 
  REQUEST_SUCCESS, 
  REQUEST_FAILURE,
} from '../../Reducers/APIDataReducer'
import { TEAMS } from '../../Reducers/ReducerTypes'


export function getTeam(team_name, callback) {
  
  return function (dispatch) {
    // dispatch an action that we are requesting a product
    dispatch(requestTeam())

    // actually fetch 
    let params = {"team_name": team_name}
    return api.get('/ics/teams/')
      .query(params)
      .end( function (err, res) {
        if (err || !res.ok) {
          dispatch(requestTeamFailure(err))
        } else {
          //let members = formatMemberResponse(res.body)
          dispatch(requestTeamSuccess(res.body))
          callback()
        }
      })
  }
}

function requestTeam() {
  return {
    name: TEAMS,
    type: REQUEST
  }
}

function requestTeamFailure(err) {
  alert('Oh no! Something went wrong\n' + err)
  return {
    name: TEAMS,
    type: REQUEST_FAILURE, 
    error: err
  }
}

function requestTeamSuccess(json) {
  return {
    name: TEAMS,
    type: REQUEST_SUCCESS, 
    data: json
  }
}


